import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

export const LIST_ITEM_WIDTH = windowWidth / 4;

interface ICircularCarouselListItemProps {
	index: number;
	contentOffset: Animated.SharedValue<number>;
}
export const CircularCarouselListItem: React.FC<
	ICircularCarouselListItemProps
> = ({ index, contentOffset }) => {
	const rStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 2) * LIST_ITEM_WIDTH,
			(index - 1) * LIST_ITEM_WIDTH,
			index * LIST_ITEM_WIDTH,
			(index + 1) * LIST_ITEM_WIDTH,
			(index + 2) * LIST_ITEM_WIDTH,
		];

		const translateYOutputRange = [
			0,
			-LIST_ITEM_WIDTH / 3,
			-LIST_ITEM_WIDTH / 2,
			-LIST_ITEM_WIDTH / 3,
			0,
		];
		const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];
		const scaleOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

		const translateY = interpolate(
			contentOffset.value,
			inputRange,
			translateYOutputRange,
			Extrapolate.CLAMP,
		);
		const opacity = interpolate(
			contentOffset.value,
			inputRange,
			opacityOutputRange,
			Extrapolate.CLAMP,
		);
		const scale = interpolate(
			contentOffset.value,
			inputRange,
			scaleOutputRange,
			Extrapolate.CLAMP,
		);

		return {
			opacity,
			transform: [
				{ translateY },
				{ translateX: LIST_ITEM_WIDTH / 2 + LIST_ITEM_WIDTH },
				{ scale },
			],
		};
	});

	return (
		<Animated.View
			style={[
				{
					width: LIST_ITEM_WIDTH,
					aspectRatio: 1,
				},
				rStyle,
			]}>
			<View
				style={{
					flex: 1,
					borderRadius: LIST_ITEM_WIDTH / 2,
					margin: 5,
					backgroundColor: 'red',
					borderColor: 'white',
					borderWidth: 1,
				}}
			/>
		</Animated.View>
	);
};
