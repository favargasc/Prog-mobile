import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface btnData {
  title: string;
  bg_color: string;
  b_color: string;
  handle: () => void;
}
 
export default (props: btnData) => {
  const styles = StyleSheet.create({
    btn: {
      borderWidth: 1,
      borderColor: props.b_color,
      width: 300,
      height: 55,
      borderRadius: 10,
      marginTop: 20,
      padding: 15,
      textAlign: 'center',
      backgroundColor: props.bg_color
    },

    text: {
      color: props.b_color,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });  

  return (
    <TouchableOpacity style={styles.btn} onPress={props.handle}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}
