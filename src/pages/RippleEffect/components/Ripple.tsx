import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, runOnJS, useAnimatedStyle, useSharedValue, withTiming, useAnimatedRef, measure } from 'react-native-reanimated';

interface IRippleProps extends ViewProps {
    onTap?: () => void;
};
export const Ripple: React.FC<IRippleProps> = ({
    style,
    onTap,
    children
}) => {
    const centerX = useSharedValue(0);
    const centerY = useSharedValue(0);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    const aRef = useAnimatedRef<View>();
    const width = useSharedValue(0);
    const height = useSharedValue(0);

    const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: (tapEvent) => {
            const layout = measure(aRef);
            width.value = layout?.width || 0;
            height.value = layout?.height || 0;

            centerX.value = tapEvent.x;
            centerY.value = tapEvent.y;

            opacity.value = 1;
            scale.value = 0;
            scale.value = withTiming(1, { duration: 1000 });

        },
        onActive: () => {
            onTap && runOnJS(onTap)()
        },
        onFinish: () => {
            opacity.value = withTiming(0);
        }
    });

    const rStyle = useAnimatedStyle(() => {
        const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2)

        const translateX = centerX.value - circleRadius;
        const translateY = centerY.value - circleRadius;
        return {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            backgroundColor: 'rgba(0,0,0, 0.2)',
            position: 'absolute',
            opacity: opacity.value,
            top: 0,
            left: 0,
            transform: [
                { translateX },
                { translateY },
                { scale: scale.value },
            ]
        }
    })

    return (
        <View ref={aRef} style={style}>
            <TapGestureHandler onGestureEvent={tapGestureEvent}>
                <Animated.View style={[style, { overflow: 'hidden' }]}>
                    <View>{children}</View>
                    <Animated.View style={rStyle} />
                </Animated.View>
            </TapGestureHandler>
        </View>
    )
};

const styles = StyleSheet.create({})