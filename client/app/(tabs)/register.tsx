import React, { useState, useEffect } from 'react';
import { SafeAreaView, SectionList, Text, View, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import host from '../../host'

interface Enrollment {
  subject: {
    code: string;
    name: string;
  };
  enrolled_students: {
    phone_number: string;
    full_name: string;
    student_id: string;
    email: string;
  }[];
}

interface Item {
  student_id: string,
  full_name: string;
}

interface Section {
  title: string;
  data: Item[];
}

export default () => {
  const [enrollmentData, setEnrollmentData] = useState<Enrollment[]>([]);
  const [refreshing, setRefreshing] = useState(false);  

  const fetchData = async() => {
    axios.get<Enrollment[]>(`http://${host}/enrollment`)
    .then(response => {
      setEnrollmentData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchData()
  }, []);

  const onRefresh = async() => {
    setRefreshing(true);
  
    await fetchData()

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const sections: Section[] = enrollmentData
  .filter((enrollment) => enrollment.enrolled_students.length !== 0)
  .map((enrollment) => ({
    title: enrollment.subject.name,
    data: enrollment.enrolled_students.map((student) => ({
      student_id: student.student_id,
      full_name: student.full_name,
    })),
  }));

  const renderItem = ({ item }: { item: Item }) => (
    <View style={stylesItem.container}>
      <Text style={stylesItem.text}>{item.full_name}</Text>
    </View>
  );

  const renderHeader = ({ section: { title } }: { section: Section }) => (
    <View style={stylesHeader.container}>
      <Text style={stylesHeader.text}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.student_id}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

const stylesItem = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    paddingLeft: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },

  text: {
    color: '#4377fe',
    fontWeight: 'bold'
  }
});

const stylesHeader = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4377fe',
    margin: 5,
    paddingLeft: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },

  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});