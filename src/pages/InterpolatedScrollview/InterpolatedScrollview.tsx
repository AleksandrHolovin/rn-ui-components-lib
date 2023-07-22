import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { InterpolatedScrollviewPage } from '../../common/components';

const WORDS = ['What s', 'up', 'mobile', 'devs', '?']

export const InterpolatedScrollview = () => {

    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        translateX.value = event.contentOffset.x;
    })

    return (
        <Animated.ScrollView
            pagingEnabled
            onScroll={scrollHandler}
            horizontal
            scrollEventThrottle={16}
            style={styles.container}>
            {WORDS.map((item, index) => <InterpolatedScrollviewPage
                key={index}
                title={item}
                index={index}
                translateX={translateX}
            />)}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})