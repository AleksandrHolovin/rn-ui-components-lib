import React, { useCallback, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground,
    Text,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const DoubleTapAnimate = () => {
    const scale = useSharedValue(0);
    const opactity = useSharedValue(1);

    const doubleTapRef = useRef();

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value }
            ]
        };
    });
    const rTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opactity.value,
        }
    })

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withDelay(500, withSpring(0));
            }
        });
    }, [])
    const onSingleTap = useCallback(() => {
        opactity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opactity.value = withDelay(500, withTiming(1));
            }
        });
    }, [])

    return (
        <View style={styles.container}>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={onSingleTap}
            >
                <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleTapRef}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}
                >
                    <Animated.View>
                        <ImageBackground
                            source={require('../../../assets/images/DoubleTapAnimationImage.jpg')}
                            style={styles.image}
                        >
                            <AnimatedImage
                                source={require('../../../assets/icons/like.png')}
                                style={[
                                    styles.image,
                                    rStyle,
                                    {
                                        shadowOffset: { width: 0, height: 28 },
                                        shadowOpacity: 0.35,
                                        shadowRadius: 35,
                                    },
                                ]}
                                resizeMode="center"
                            />
                        </ImageBackground>
                        <Animated.Text style={[styles.turtles, rTextStyle]}>
                            🐢🐢🐢🐢
                        </Animated.Text>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View >
    );
};

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: SIZE,
        width: SIZE
    },
    turtles: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20
    }
});