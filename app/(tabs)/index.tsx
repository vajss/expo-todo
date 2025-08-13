import ListItem from '@/components/ui/listItem';
import { useContext } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { ItemsContext } from './todoContext';

export default function TabOneScreen() {
  const { items, deleteItem } = useContext(ItemsContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Items List:</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} onDelete={deleteItem} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items added yet</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#181818ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e9a628ff',
    marginBottom: 16,
    letterSpacing: 1,
  },

  empty: {
    color: '#888',
    fontStyle: 'italic',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
