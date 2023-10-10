import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import host from '../../host'

interface subjectState {
  id:	string
  code: string
  name: string,
  state: boolean
}

type ItemProp = {
  item: subjectState
}

export default () => {
  const [studentsData, setStudentsData] = useState<any>()
  const [refreshing, setRefreshing] = useState(false);  
  const router = useRouter()
  const local = useLocalSearchParams();

  const fetchData = async() => {
    axios.get(`http://${host}/enrollment/${local.id}`)
      .then(res => setStudentsData(res.data))
      .catch(error => console.log(error));  
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
  
  const handleDelete = async(subject_id: string) => {
    const data = {
      subject_id: subject_id,
      student_id: local.id
    }

    await axios.put(`http://${host}/enrollment`, data)

    onRefresh()
  }

  const handleAdd = async(subject_id: string) => {
    const data = {
      subject_id: subject_id,
      student_id: local.id
    }

    await axios.post(`http://${host}/enrollment`, data)

    onRefresh()
  }

  const ItemView: React.FC<ItemProp> = ({ item }) => {
    return (
      item.state ? (
        <TouchableOpacity style={stylesItem.containerSelected} onPress={() => handleDelete(item.id)}>
          <Text style={stylesItem.textSelected}>{item.code}</Text>
          <Text style={stylesItem.textSelected}>{item.name}</Text>
        </TouchableOpacity>
      ) : 
      (
        <TouchableOpacity style={stylesItem.container} onPress={() => handleAdd(item.id)}>
          <Text style={stylesItem.text}>{item.code}</Text>
          <Text style={stylesItem.text}>{item.name}</Text>
      </TouchableOpacity>
      )
    );
  };

  return (
    <>
    <Text style={styles.title}>Matricula</Text>
    <SafeAreaView style={stylesList.container}>
      <FlatList
        data={studentsData}
        renderItem={({item}) => <ItemView item={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
    </>
  );
}

const stylesItem = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    paddingLeft: 30,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#4377fe',
    borderWidth: 2,
  },

  containerSelected: {
    flex: 1,
    backgroundColor: '#4377fe',
    borderColor: '#4377fe',
    borderWidth: 2,
    margin: 5,
    paddingLeft: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },

  textSelected: {
    color: 'white',
    fontWeight: 'bold'
  },

  text: {
    color: '#4377fe',
    fontWeight: 'bold'
  }
});

const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e8f0fd',
  }
});

const styles = StyleSheet.create({
  title: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: '#002856',
    color: 'white'
  }
});
