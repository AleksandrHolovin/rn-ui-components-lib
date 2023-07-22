import React, { useCallback } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {
    width,
    height
} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const CurcularProgressBar: React.FC = () => {

    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
    }));

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`;
    });

    const onPress = useCallback(() => {
        progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
    }, [])

    return (
        <>
            <View style={styles.container}>
                <ReText style={styles.progressText} text={progressText} />
                <Svg style={{ position: "absolute" }}>
                    <Circle
                        cx={width / 2}
                        cy={height / 2}
                        r={R}
                        stroke={BACKGROUND_STROKE_COLOR}
                        strokeWidth={30}
                        fill="none"
                    />
                    <AnimatedCircle
                        cx={width / 2}
                        cy={height / 2}
                        r={R}
                        stroke={STROKE_COLOR}
                        strokeWidth={15}
                        fill="none"
                        strokeDasharray={CIRCLE_LENGTH}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                    />
                </Svg>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>
                    Run
                </Text>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    progressText: {
        fontSize: 80,
        color: "rgba(255,255,255,0.7)"
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 80,
        width: width * 0.7,
        height: 60,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        borderRadius: 25,
        left: width * 0.15,
        right: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 2.0
    }
});