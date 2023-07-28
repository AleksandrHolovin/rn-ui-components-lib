import React from 'react';
import { N, SQUARE_SIZE } from '../constants';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface ISquareProps {
    index: number;
    progress: Animated.SharedValue<number>;
};
export const Square: React.FC<ISquareProps> = ({
    index,
    progress,
}) => {

    const offsetAngle = (2 * Math.PI) / N;
    const finalAngle = offsetAngle * (N - 1 - index);

    const rotate = useDerivedValue(() => {
        if (progress.value <= 2 * Math.PI) {
            return Math.min(finalAngle, progress.value);
        }

        if (progress.value - 2 * Math.PI < finalAngle) {
            return finalAngle;
        }

        return progress.value;
    }, []);
    const translateY = useDerivedValue(() => {
        if (rotate.value === finalAngle) {
            return withSpring(-N * SQUARE_SIZE);
        }

        if (progress.value > 2 * Math.PI) {
            return withTiming((index - N) * SQUARE_SIZE);
        }

        return withTiming(-index * SQUARE_SIZE);
    }, [])

    const rStyle = useAnimatedStyle(() => {

        return {
            transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value },
            ]
        }
    })

    return (
        <Animated.View key={index} style={[
            {
                height: SQUARE_SIZE,
                aspectRatio: 1,
                backgroundColor: 'white',
                position: 'absolute',

            },
            rStyle,
        ]} />
    )
}