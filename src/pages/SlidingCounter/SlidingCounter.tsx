import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Counter
} from './components/Counter';

export const SlidingCounter: React.FC = () => {
    return (
        <View style={styles.container}>
            <Counter />
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})