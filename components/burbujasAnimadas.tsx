import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const generateRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

const generateRandomColor = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Bubble = ({ size, color, left, delay }) => {
  const bubbleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBubble = () => {
      Animated.loop(
        Animated.timing(bubbleAnimation, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
          delay: delay,
        })
      ).start();
    };

    animateBubble();

    return () => bubbleAnimation.setValue(0);
  }, [bubbleAnimation, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        left: `${left}%`,
        bottom: -20,
        opacity: 0.8,
        transform: [
          {
            translateY: bubbleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -900],
            }),
          },
        ],
      }}
    />
  );
};

const Bubbles = () => {
  const bubbles = Array.from({ length: 20 }, (_, index) => {
    const size = generateRandomNumber(10, 20);
    const color = generateRandomColor();
    const left = generateRandomNumber(0, 100);
    const delay = generateRandomNumber(0, 2000);
    
    return <Bubble key={index} size={size} color={color} left={left} delay={delay} />;
  });

  return <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{bubbles}</View>;
};

export default Bubbles;
