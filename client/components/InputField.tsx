import { StyleSheet, Text, View, TextInput } from 'react-native';

interface inputData {
  id: string;
  title: string;
  value: string;
  handle: (text: string) => void;
}
 
export default (props: inputData) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.title}</Text>
      <TextInput
        id={props.id}
        value={props.value}
        onChangeText={props.handle}
        placeholder={`Ingrese el ${props.title.toLowerCase()}`}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'right'
  },
  input: {
    borderWidth: 1,
    borderColor: '#2a5dc6',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    padding: 10
  },

  label: {
    position: 'relative',
    margin: 5,
    fontWeight: 'bold'
  }
});
