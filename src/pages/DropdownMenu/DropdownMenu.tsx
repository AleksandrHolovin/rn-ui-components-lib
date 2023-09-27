import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from './components/Dropdown';

const options = [
    { label: 'Charts', iconName: 'barschart' },
    { label: 'Book', iconName: 'book' },
    { label: 'Calendar', iconName: 'calendar' },
    { label: 'Camera', iconName: 'camera' },
];
const header = {
    label: 'Header',
    iconName: 'ellipsis1',
}

export const DropdownMenu: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Dropdown header={header} options={options} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
