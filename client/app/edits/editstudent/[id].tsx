import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../../components/InputField';
import FormBtn from '../../../components/FormBtn';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios'
import host from '../../../host'

export default function App() {
  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    student_id: ""
  })
  
  const router = useRouter()
  const local = useLocalSearchParams();

  useEffect(() => {

    axios.get(`http://${host}/students/${local.id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, []);


  const handleSubmit = async() => {
    await axios.put(`http://${host}/students/${local.id}`, data)
    router.push('/(tabs)/students')
  }

  const handleInputChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modificar estudiante</Text>

      <InputField
        id="full_name"
        title="Nombre completo"
        value={data.full_name}
        handle={(text) => handleInputChange("full_name", text)}
      />

      <InputField
        id="email"
        title="Correo electrónico"
        value={data.email}
        handle={(text) => handleInputChange("email", text)}
      />

      <InputField
        id="phone_number"
        title='Número de teléfono'
        value={data.phone_number}
        handle={(text) => handleInputChange("phone_number", text)}
      />
      
      <InputField
        id="student_id"
        title='Carné'
        value={data.student_id}
        handle={(text) => handleInputChange("student_id", text)}
      />

      <FormBtn 
        title='Modificar' 
        handle={handleSubmit} 
        bg_color='#3f95de' 
        b_color='white' 
      />
      
      <FormBtn 
        title='Cancelar' 
        handle={() => router.push('/(tabs)/students')} 
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

