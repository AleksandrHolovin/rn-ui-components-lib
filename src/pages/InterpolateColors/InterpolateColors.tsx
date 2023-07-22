import React, { useState } from 'react';
import {
    StyleSheet,
    Switch,
    Dimensions,
} from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';

const COLORS = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8',
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E',
    },
};
const SWITCH_TRACK_COLOR = {
    true: 'rgba(255, 0, 255, 0.2)',
    false: 'rgba(0,0,0,0.1)',
}


export const InterpolateColors = ({

}) => {
    const [theme, setTheme] = useState('light');

    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0);
    }, [theme]);

    const animatedWrapperStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [COLORS.light.background, COLORS.dark.background],
        )
        return { backgroundColor, }
    });
    const animatedCircleStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [COLORS.light.circle, COLORS.dark.circle],
        )
        return { backgroundColor, }
    });
    const animatedTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            [COLORS.light.text, COLORS.dark.text],
        )
        return { color, }
    });

    return (
        <Animated.View style={[styles.container, animatedWrapperStyles]}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>
                {theme} Theme
            </Animated.Text>
            <Animated.View style={[styles.circle, animatedCircleStyles]}>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={(toggled) => {
                        setTheme(toggled ? 'dark' : 'light')
                    }}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor="violet"
                />
            </Animated.View>
        </Animated.View>
    );
};

const SIZE = Dimensions.get('window').width * 0.7

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE / 2,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 8,
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 70,
        fontWeight: '700',
        letterSpacing: 14,
        marginBottom: 35,
        textAlign: 'center'
    },
})