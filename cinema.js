import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const seatTypes = {
  REGULAR: '#59CBE8',
  VIP: '#2D0C57',
  NOT_AVAILABLE: '#C4C4C4',
  SELECTED: '#F5A623',
};

const seatData = new Array(10).fill().map((_, row) =>
  new Array(20).fill().map((_, col) => ({
    row,
    col,
    type: Math.random() > 0.8 ? 'NOT_AVAILABLE' : row === 9 ? 'VIP' : 'REGULAR',
  })),
);

export default function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handleSeatPress = seat => {
    if (seat.type === 'NOT_AVAILABLE') return;

    const key = `${seat.row}-${seat.col}`;
    setSelectedSeats(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  };

  const zoom = delta => {
    scale.value = withTiming(Math.max(1, Math.min(3, scale.value + delta)), {
      duration: 200,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ScrollView>
          <Animated.View style={[styles.seatContainer, animatedStyle]}>
            {seatData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((seat, colIndex) => {
                  const key = `${seat.row}-${seat.col}`;
                  const isSelected = selectedSeats.includes(key);
                  const bgColor = isSelected
                    ? seatTypes.SELECTED
                    : seatTypes[seat.type];
                  return (
                    <Pressable
                      key={colIndex}
                      onPress={() => handleSeatPress(seat)}
                      style={[styles.seat, {backgroundColor: bgColor}]}
                    />
                  );
                })}
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </ScrollView>

      <View style={styles.controls}>
        <Pressable onPress={() => zoom(0.2)} style={styles.zoomButton}>
          <Text style={styles.zoomText}>+</Text>
        </Pressable>
        <Pressable onPress={() => zoom(-0.2)} style={styles.zoomButton}>
          <Text style={styles.zoomText}>-</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  seat: {
    width: 20,
    height: 20,
    margin: 3,
    borderRadius: 3,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  zoomButton: {
    backgroundColor: '#ddd',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
