import express from "express";

import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import db from "../firebase.mjs";

const router = express.Router();

const collection_name = "enrollment";

const getSubject = async () => {
  const querySnapshot = await getDocs(collection(db, "subjects"));
  const students = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return students;
};

const getEnrolledData = async () => {
  const enrollmentSnapshot = await getDocs(collection(db, collection_name));

  const enrollmentData = enrollmentSnapshot.docs.map(async (docSnap) => {
    const data = docSnap.data();

    const subjectSnap = await getDoc(doc(db, "subjects", data.subject_id.id));

    const enrolledStudentsData = await Promise.all(
      data.enrolled_students.map(async (studentRef) => {
        const studentDocSnap = await getDoc(doc(db, "students", studentRef.id));
        const studentData = {
          id: studentDocSnap.id,
          ...studentDocSnap.data(),
        };

        return studentData;
      })
    );

    return {
      id: docSnap.id,
      subject: subjectSnap.data(),
      enrolled_students: enrolledStudentsData,
    };
  });

  const enrolledData = await Promise.all(enrollmentData);

  const filteredEnrolledData = enrolledData
    .filter((data) => data.subject !== undefined)
    .map((data) => {
      const enrolledStudents = data.enrolled_students.filter(
        (student) => student.student_id !== undefined
      );
      return { ...data, enrolled_students: enrolledStudents };
    });

  return filteredEnrolledData;
};

router.get("/", async (req, res) => {
  const enrolledData = await getEnrolledData();
  res.status(200).send(enrolledData);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const enrolledData = await getEnrolledData();
  const subjects = await getSubject();

  const subjectsWithState = subjects.map((subject) => {
    const enrolled = enrolledData.find((enrollment) => {
      const enrolledStudent = enrollment.enrolled_students.find(
        (enrolledStudent) =>
          enrolledStudent.id === id && enrollment.subject.code === subject.code
      );
      return enrolledStudent !== undefined;
    });
    const state = enrolled !== undefined;
    return { ...subject, state };
  });

  res.status(200).send(subjectsWithState);
});

router.post("/", async (req, res) => {
  const { subject_id, student_id } = req.body;

  const enrollmentCollectionRef = collection(db, collection_name);
  const subjectRef = doc(db, "subjects", subject_id);
  const studentRef = doc(db, "students", student_id);

  const q = query(
    enrollmentCollectionRef,
    where("subject_id", "==", subjectRef)
  );

  const enrollmentDocs = await getDocs(q);

  if (enrollmentDocs.empty) {
    const value = {
      subject_id: doc(db, "subjects", subject_id),
      enrolled_students: [doc(db, "students", student_id)],
    };
    await addDoc(collection(db, collection_name), value);
  } else {
    enrollmentDocs.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        enrolled_students: arrayUnion(studentRef),
      });
    });
  }

  res.status(200).send({ id: "OK" });
});

router.put("/", async (req, res) => {
  const { subject_id, student_id } = req.body;

  const enrollmentCollectionRef = collection(db, collection_name);
  const studentRef = doc(db, "students", student_id);
  const subjectRef = doc(db, "subjects", subject_id);

  const q = query(
    enrollmentCollectionRef,
    where("subject_id", "==", subjectRef),
    where("enrolled_students", "array-contains", studentRef)
  );

  const enrollmentDocs = await getDocs(q);

  enrollmentDocs.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      enrolled_students: arrayRemove(studentRef),
    });
  });

  res.status(200).send({ id: "OK" });
});

export default router;
