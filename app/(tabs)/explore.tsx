import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ItemsContext } from './todoContext';

export default function TabTwoScreen() {
  const { addItem } = useContext(ItemsContext);
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim().length > 0) {
      addItem(inputText.trim());
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#e9a628ff', marginBottom: 10 }}>
        Add items:{' '}
      </Text>
      <TextInput
        style={{
          width: 300,
          height: 50,
          fontSize: 20,
          borderColor: '#e9a628ff',
          borderWidth: 1,
          color: '#e9a628ff',
          paddingHorizontal: 10,
        }}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type item here"
        placeholderTextColor="#e9a62899"
      />
      <Pressable
        onPress={handleAdd}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
      >
        <Text style={styles.buttonText}>Addd</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818ff',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#e9a628ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818ff',
  },
});
