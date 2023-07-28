import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { N } from './constants';
import { Square } from './components/Square';
import { Easing, useSharedValue, withTiming, withRepeat } from 'react-native-reanimated';


export const ClockLoader: React.FC = () => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(4 * Math.PI, {
            duration: 4000,
            easing: Easing.linear
        }), -1)
    }, [])

    return (
        <View style={styles.container}>
            {new Array(N).fill(0).map((_, index: number) => (
                <Square key={index} progress={progress} index={index} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111'
    }
})