import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SIZE = 75.0;
const CIRCLE_RADIUS = SIZE * 2;

export const PanGestureBasics = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const PanGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context: any) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        }
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value
                },
            ]
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.circleStyle}>
                <PanGestureHandler onGestureEvent={PanGestureEvent}>
                    <Animated.View style={[styles.square, rStyle]} />
                </PanGestureHandler>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0, 0,  255, 0.5)',
        borderRadius: 20
    },
    circleStyle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 5,
        borderColor: 'rgba(0, 0,  255, 0.5)',
    }
})