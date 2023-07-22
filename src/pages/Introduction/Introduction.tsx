import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    withRepeat,
    useAnimatedStyle,
} from 'react-native-reanimated';

const SIZE = 100.0;

export const Introduction = () => {

    const progress = useSharedValue(1)
    const scale = useSharedValue(2)
    const redColor = useSharedValue(0)

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: (progress.value * SIZE) / 2,
            backgroundColor: `rgb(${redColor.value}, 0, 255)`,
            transform: [
                { scale: scale.value },
                { rotate: `${progress.value * 2 * Math.PI}rad` },
            ]
        }
    }, [])

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
        redColor.value = withRepeat(withSpring(255), -1, true)
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.boxStaticStyles,
                    reanimatedStyle,
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    boxStaticStyles: {
        height: SIZE,
        width: SIZE,
    }
})