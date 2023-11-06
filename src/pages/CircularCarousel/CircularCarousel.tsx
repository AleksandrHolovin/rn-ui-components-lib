import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
	CircularCarouselListItem,
	LIST_ITEM_WIDTH,
} from './components/CircularCarouselListItem';
import { useSharedValue } from 'react-native-reanimated';

const ITEMS = new Array(15).fill(0);

export const CircularCarousel: React.FC = () => {
	const contentOffset = useSharedValue(0);
	return (
		<View style={styles.container}>
			<FlatList
				data={ITEMS}
				horizontal
				keyExtractor={(_, index: number) => index.toString()}
				renderItem={({ item, index }) => (
					<CircularCarouselListItem
						contentOffset={contentOffset}
						index={index}
					/>
				)}
				scrollEventThrottle={16} // 60 fps -> 16ms (1000ms / 60)
				onScroll={event => {
					contentOffset.value = event.nativeEvent.contentOffset.x;
				}}
				pagingEnabled
				snapToInterval={LIST_ITEM_WIDTH}
				style={{ position: 'absolute', bottom: 0, height: 300 }}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					paddingRight: LIST_ITEM_WIDTH * 3,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});
