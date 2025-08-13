import { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

type ListItemProps = {
  item: { id: number; text: string };
  index: number;
  onDelete: (item: { id: number; text: string }) => void;
};

export default function ListItem({ item, index, onDelete }: ListItemProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dx < 0) translateX.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
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
  });

  return (
    // <View style={styles.itemContainer} {...panResponder.panHandlers}>
    //   <Text style={styles.item}>{item}</Text>
    // </View>
    <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.text}</Text>
      </View>
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
});
