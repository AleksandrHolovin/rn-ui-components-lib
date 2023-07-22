import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { ColorPickerRow } from './components';

const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white'
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const SCREEN_WIDTH = Dimensions.get('window').width

const PICKER_WIDTH = SCREEN_WIDTH * 0.9;

export const ColorPicker = () => {
    return (
        <>
            <ColorPickerRow
                colors={COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
                maxWidth={PICKER_WIDTH}
            />
        </>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        backgroundColor: '#fff'
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
    }
})