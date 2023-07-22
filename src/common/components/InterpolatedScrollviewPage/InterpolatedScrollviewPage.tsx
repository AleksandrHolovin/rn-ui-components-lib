import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SIZE = width * 0.7;

export const InterpolatedScrollviewPage: React.FC<{
    title: any;
    index: any;
    translateX: any;
}> = ({
    title,
    index,
    translateX
}) => {

        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const rStyle = useAnimatedStyle(() => {
            const scale = interpolate(
                translateX.value,
                inputRange,
                [0, 1, 0],
                Extrapolate.CLAMP
            )
            const borderRadius = interpolate(
                translateX.value,
                inputRange,
                [0, SIZE / 2, 0],
                Extrapolate.CLAMP
            )

            return {
                borderRadius,
                transform: [{ scale }]
            }
        });
        const rTextStyle = useAnimatedStyle(() => {

            const translateY = interpolate(
                translateX.value,
                inputRange,
                [height / 2, 0, -height / 2],
                Extrapolate.CLAMP,
            )
            const opacity = interpolate(
                translateX.value,
                inputRange,
                [-2, 1, -2],
                Extrapolate.CLAMP
            )

            return {
                opacity,
                transform: [
                    { translateY }
                ]
            }
        })

        return (
            <View style={[styles.pageContainer, {
                backgroundColor: `rgba(0,0,255,0.${index + 2})`
            }]}>
                <Animated.View style={[styles.square, rStyle]} />
                <Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
                    <Text style={styles.text}>{title}</Text>
                </Animated.View>
            </View>
        )
    }

const styles = StyleSheet.create({
    pageContainer: {
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,0,255, 0.4)',
    },
    text: {
        fontSize: 70,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: 'white'
    }
})