import express from "express";

import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import db from "../firebase.mjs";

const router = express.Router();
const collection_name = "students";

router.get("/", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, collection_name));
  const students = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).send(students);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const querySnapshot = await getDoc(doc(db, collection_name, id));
  const student = querySnapshot.data();

  res.status(200).send(student);
});

router.post("/", async (req, res) => {
  const data = req.body;

  const docRef = await addDoc(collection(db, collection_name), data);

  res.status(200).send({ id: docRef.id });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const docRef = await updateDoc(doc(db, collection_name, id), data);

  res.status(200).send({ id: id });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const docRef = await deleteDoc(doc(db, collection_name, id));

  res.status(200).send({ id: id });
});

export default router;
