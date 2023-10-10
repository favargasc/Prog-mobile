import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../../components/InputField';
import FormBtn from '../../../components/FormBtn';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios'
import host from '../../../host'

export default function App() {
  const [data, setData] = useState({
    code: "",
    name: ""
  })
  
  const router = useRouter()
  const local = useLocalSearchParams();

  useEffect(() => {

    axios.get(`http://${host}/subjects/${local.id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, []);


  const handleSubmit = async() => {
    await axios.put(`http://${host}/subjects/${local.id}`, data)
    router.back()
  }

  const handleInputChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modificar cursos</Text>

      <InputField
        id="code"
        title="Código del curso"
        value={data.code}
        handle={(text) => handleInputChange("code", text)}
      />

      <InputField
        id="name"
        title="Nombre del curso"
        value={data.name}
        handle={(text) => handleInputChange("name", text)}
      />

      <FormBtn 
        title='Modificar' 
        handle={handleSubmit} 
        bg_color='#3f95de' 
        b_color='white' 
      />
      
      <FormBtn 
        title='Cancelar' 
        handle={() => router.push('/(tabs)/subjects')} 
        bg_color='white' 
        b_color='#3f95de'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#2a5dc6',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10
  },

  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 40,
  }
});

