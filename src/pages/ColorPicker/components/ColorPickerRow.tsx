import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const SCREEN_WIDTH = Dimensions.get('window').width

const PICKER_WIDTH = SCREEN_WIDTH * 0.9;

const COLOR_CIRCLE_SIZE = SCREEN_WIDTH * 0.8;

interface IColorPickerRowProps {
    colors: string[];
    start: any;
    end: any;
    style: any;
    maxWidth: any;
};
export const ColorPickerRow: React.FC<IColorPickerRowProps> = ({
    colors,
    start,
    end,
    style,
    maxWidth,
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1)

    const adjustTranslateX: any = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), maxWidth - PICKER_SIZE)
    })

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, context: any) => {
            context.x = adjustTranslateX.value;
            translateY.value = withSpring(-PICKER_SIZE);
            scale.value = withSpring(1.2)
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: () => {
            translateY.value = withSpring(0);
            scale.value = withSpring(1)
        }
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: adjustTranslateX.value },
                { translateY: translateY.value },
                { scale: scale.value }
            ]
        }
    })

    const rInternalPickerStyle = useAnimatedStyle(() => {

        const inputRange = colors.map((_: string, index: number) => (index / colors.length) * maxWidth)

        const backgroundColor = interpolateColor(
            adjustTranslateX.value,
            inputRange,
            colors
        )

        return {
            backgroundColor
        }
    })

    return (
        <>
            <View style={styles.topContainer}>
                <Animated.View style={[styles.colorCircle, rInternalPickerStyle]} />
            </View>
            <View style={styles.bottomContainer}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={{ justifyContent: 'center' }}>
                        <LinearGradient
                            colors={colors}
                            start={start}
                            end={end}
                            style={style} />
                        <Animated.View style={[styles.picker, rStyle]}>
                            <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </>

    )
}

const PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = PICKER_SIZE / 2;

const styles = StyleSheet.create({
    picker: {
        position: 'absolute',
        backgroundColor: 'white',
        width: PICKER_SIZE,
        height: PICKER_SIZE,
        borderRadius: PICKER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    internalPicker: {
        position: 'absolute',
        backgroundColor: 'red',
        width: INTERNAL_PICKER_SIZE,
        height: INTERNAL_PICKER_SIZE,
        borderRadius: INTERNAL_PICKER_SIZE / 2,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    topContainer: {
        flex: 3,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center'
    },
    gradient: {
        height: 40,
        width: PICKER_WIDTH,
        borderRadius: 20,
    },
    colorCircle: {
        height: COLOR_CIRCLE_SIZE,
        width: COLOR_CIRCLE_SIZE,
        borderRadius: COLOR_CIRCLE_SIZE / 2,
    }
})