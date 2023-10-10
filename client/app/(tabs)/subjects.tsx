import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import axios from 'axios';
import { useRouter } from 'expo-router';
import host from '../../host'

interface subject {
  id:	string
  name: string
  code: string
}

type ItemProp = {
  item: subject
}

export default () => {
  const [studentsData, setStudentsData] = useState<any>()
  const [refreshing, setRefreshing] = useState(false);  
  const router = useRouter()

  const fetchData = async() => {
    axios.get(`http://${host}/subjects`)
      .then(res => setStudentsData(res.data))
      .catch(error => console.log(error));  
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleDelete = async(id: string) => {
    await axios.delete(`http://${host}/subjects/${id}`)
    .catch(error => console.error(error))
    .finally(() => onRefresh())
  }

  const onRefresh = async() => {
    setRefreshing(true);
  
    await fetchData()

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const AddMenu = () => {
    return (
      <>
        <Pressable style={addMenuStyle.container}  onPress={() => router.push("/adds/addsubject")}>
          <Ionicons name="person-add-outline" size={32} color="white" />
        </Pressable>
      </>
    )
  }
  
  const ItemView: React.FC<ItemProp> = ({ item }) => {
    const rightAction = () => {
      return (
        <>
          <Pressable style={stylesOptions.delete_btn} onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash-bin-outline" size={32} color="black" />
            <Text style={stylesOptions.text}>Eliminar</Text>
          </Pressable>
          
          <Pressable style={stylesOptions.modify_btn} onPress={() => router.push(`/edits/editsubject/${item.id}`)}>
            <Ionicons name="create-outline" size={32} color="black" />
            <Text style={stylesOptions.text}>Modificar</Text>
          </Pressable>
        </>
      )
    }

    return (
      <Swipeable renderRightActions={rightAction}>
        <View style={stylesItem.container}>
          <Text style={stylesItem.text}>{item.code}</Text>
          <Text style={stylesItem.text}>{item.name}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <>
    <AddMenu/>
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
    marginTop: 10,
    backgroundColor: '#e8f0fd',
  }
});

const stylesOptions = StyleSheet.create({
  modify_btn: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginVertical: 5,
    backgroundColor: '#21aae1',
    textAlign: 'center'
  },

  enrolled_btn: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginVertical: 5,
    backgroundColor: '#00a896',
    textAlign: 'center'
  },

  delete_btn: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginVertical: 5,
    backgroundColor: '#ff3b2f',
  },

  text: {
    fontWeight: 'bold'
  },
});

const addMenuStyle = StyleSheet.create({
  container: {
    paddingHorizontal:12,
    paddingTop: 10,
    backgroundColor: '#ff3881',
    height: 60,
    width: 60, 
    position: 'absolute',
    zIndex: 1,
    top: 585,
    right: 20,
    borderRadius: 50,
  }

})