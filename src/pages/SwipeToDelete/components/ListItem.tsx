import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { ITask } from '../types';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .3;

interface IListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    task: ITask;
    onDismiss: (item: ITask) => void;
};
export const ListItem: React.FC<IListItemProps> = ({
    task,
    onDismiss,
    simultaneousHandlers,
}) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const marginVertical = useSharedValue(10);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        runOnJS(onDismiss)(task)
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        }
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            }
        ]
    }));
    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
        return { opacity }
    });
    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value
        }
    });


    return (
        <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <FontAwesome5
                    name="trash-alt"
                    size={LIST_ITEM_HEIGHT * 0.4}
                    color="red"
                />
            </Animated.View>
            <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
                <Animated.View style={[styles.task, rStyle]}>
                    <Text>
                        {task.title}
                    </Text>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    task: {
        width: '90%',
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: 'white',
        shadowOpacity: 0.08,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowRadius: 10,
        elevation: 5,
    },
    taskContainer: {
        width: '100%',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 16,
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});