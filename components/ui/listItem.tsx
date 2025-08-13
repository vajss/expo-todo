import { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ListItemProps = {
  item: { id: number; text: string };
  index: number;
  onDelete: (item: { id: number; text: string }) => void;
};

export default function ListItem({ item, index, onDelete }: ListItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateXValue = useRef(0);

  translateX.addListener(({ value }) => {
    translateXValue.current = value;
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gesture) => true,
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 5;
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > -100) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50 && gesture.dx > -150) {
          Animated.timing(translateX, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          }).start();
          return;
        }

        if (gesture.dx < -150) {
          Animated.timing(translateX, {
            toValue: -500,
            duration: 200,
            useNativeDriver: true,
          }).start();
          onDelete(item);
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.text}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    color: '#e9a628ff',
    elevation: 2, // for Android shadow
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#6c7b2d1a',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#a08348ff',
  },
  deleteButton: {
    position: 'absolute',
    width: 100,
    right: -100,

    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
