import React, { useCallback, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ITask } from './types';
import { ListItem } from './components';
import { ScrollView } from 'react-native-gesture-handler';

const TITLES: string[] = [
    'Record the something ✡',
    'Record the something ✡',
    'Record the something ✡',
    'Record the something ✡',
];

const TASKS: ITask[] = TITLES.map((title: string, index: number) => ({ title, index }));
const BACKGROUND_COLOR = '#FAFBFF';

export const SwipeToDelete = () => {
    const scrollRef = useRef(null);

    const [tasks, setTasks] = useState<ITask[]>(TASKS);

    const onDismiss = useCallback((task: ITask) => {
        setTasks((prevState: ITask[]) => prevState.filter((item: ITask) => item.index !== task.index));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>
                Title
            </Text>
            <ScrollView style={{ flex: 1 }}>
                {tasks.map((item: ITask) => (
                    <ListItem
                        task={item}
                        key={item.index}
                        onDismiss={onDismiss}
                        simultaneousHandlers={scrollRef}
                    />
                ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
    title: {
        fontSize: 60,
        marginVertical: 20,
        paddingLeft: '5%'
    }
})