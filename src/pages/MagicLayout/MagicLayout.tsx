import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798DE';

interface Item {
	id: number;
}

export const MagicLayout: React.FC = () => {
	const initialMode = useRef<boolean>(true);

	useEffect(() => {
		initialMode.current = false;
	}, []);

	const [items, setItems] = useState<Item[]>(
		new Array(5).fill(0).map((_, index) => ({ id: index })),
	);

	const onAdd = useCallback(() => {
		setItems(currentItems => {
			const nextItemId =
				(currentItems[currentItems.length - 1]?.id ?? 0) + 1;

			return [...currentItems, { id: nextItemId }];
		});
	}, []);
	const onDelete = useCallback((itemId: number) => {
		setItems(currentItems => {
			return currentItems.filter((item: Item) => item.id !== itemId);
		});
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
				<Text style={{ color: 'white', fontSize: 40 }}>+</Text>
			</TouchableOpacity>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingVertical: 50 }}>
				{items.map((item: Item, index: number) => {
					return (
						<Animated.View
							onTouchEnd={() => onDelete(item.id)}
							style={styles.listItem}
							entering={
								initialMode ? FadeIn.delay(100 * index) : FadeIn
							}
							exiting={FadeOut}
							layout={Layout.delay(200)}
							key={item.id}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	listItem: {
		height: 100,
		backgroundColor: LIST_ITEM_COLOR,
		width: '90%',
		marginVertical: 10,
		borderRadius: 20,
		alignSelf: 'center',
		elevation: 5,
		shadowOpacity: 0.15,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowRadius: 10,
		shadowColor: 'black',
	},
	floatingButton: {
		width: 80,
		aspectRatio: 1,
		backgroundColor: 'black',
		borderRadius: 40,
		position: 'absolute',
		bottom: 50,
		right: 30,
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
