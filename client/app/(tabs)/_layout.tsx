import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Icon = () => {
  return (
    <Ionicons name="trash-bin-outline" size={32} color="black" />
  )
}
export default () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="students" 
        options={{
          headerTitle: 'Estudiantes',
          headerStyle: { backgroundColor: '#002856'},
          headerTitleStyle: { color: 'white' },
          tabBarLabel: 'Estudiantes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name="subjects"
        options={{
          headerTitle: 'Cursos',
          headerStyle: { backgroundColor: '#002856'},
          headerTitleStyle: { color: 'white' },
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
        />
      <Tabs.Screen 
        name="register"
        options={{
          headerTitle: 'Registro',
          headerStyle: { backgroundColor: '#002856'},
          headerTitleStyle: { color: 'white' },
          tabBarLabel: 'Registro',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}