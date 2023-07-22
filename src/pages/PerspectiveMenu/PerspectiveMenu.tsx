import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const THRESHOLD = SCREEN_WIDTH / 3;

const BACKGROUND_COLOR = '#1e1e23';

export const PerspectiveMenu: React.FC = () => {

    const translateX = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {
        x: number
    }>({
        onStart: (_, context) => {
            context.x = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: () => {
            if (translateX.value <= THRESHOLD) {
                translateX.value = withTiming(0);
            } else {
                translateX.value = withTiming(SCREEN_WIDTH / 2);
            }
        }
    });

    const onPress = useCallback(() => {
        if (translateX.value > 0) {
            translateX.value = withTiming(0);
        } else {
            translateX.value = withTiming(SCREEN_WIDTH / 2);
        }
    }, [])

    const rStyle = useAnimatedStyle(() => {

        const rotate = interpolate(
            translateX.value,
            [0, SCREEN_WIDTH / 2],
            [0, 3],
            Extrapolate.CLAMP
        )
        const borderRadius = interpolate(
            translateX.value,
            [0, SCREEN_WIDTH / 2],
            [0, 15],
            Extrapolate.CLAMP
        )

        return {
            borderRadius,
            transform: [
                { perspective: 100 },
                { translateX: translateX.value },
                { rotateY: `-${rotate}deg` }
            ]
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[{ backgroundColor: 'white', flex: 1 }, rStyle]}>
                    <Feather
                        name="menu"
                        size={32}
                        color={BACKGROUND_COLOR}
                        style={{ margin: 15 }}
                        onPress={onPress}
                    />
                </Animated.View>
            </PanGestureHandler>
            <StatusBar style='inverted' />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    }
})