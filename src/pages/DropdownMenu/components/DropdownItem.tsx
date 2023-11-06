import React from 'react';
import Color from 'color';
import { useWindowDimensions, View, StyleSheet, Text } from 'react-native';
import { DropdownItemT } from '../types';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IDropdownItemProps extends DropdownItemT {
	index: number;
	itemsCount: number;
	isExpanded: SharedValue<boolean>;
}
export const DropdownItem: React.FC<IDropdownItemProps> = ({
	label,
	iconName,
	index,
	itemsCount,
	isExpanded,
}) => {
	const { width: windowWidth } = useWindowDimensions();
	const dropdownItemHeight = 85;
	const margin = 10;
	const fullDropdownHeight = itemsCount * (dropdownItemHeight + margin);

	const collapsedTop = fullDropdownHeight / 2 - dropdownItemHeight;
	const expandedTop = (dropdownItemHeight + margin) * index;

	const collapsedScale = 1 - index * 0.08;
	const expandedScale = 1;

	const expandedBg = '#1b1b1b';
	const collapsedBg = Color(expandedBg)
		.lighten(index * 0.25)
		.hex();

	const rStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(
				isExpanded.value ? expandedBg : collapsedBg,
			),
			top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
			transform: [
				{
					scale: withSpring(
						isExpanded.value ? expandedScale : collapsedScale,
					),
				},
				{
					translateY: fullDropdownHeight / 2,
				},
			],
		};
	}, []);

	const isHeader = index === 0;

	const rHeaderIconStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: withTiming(isExpanded.value ? '90deg' : '0deg'),
				},
			],
		};
	}, []);
	const rLeftIconOpacity = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0),
		};
	}, [isHeader]);

	return (
		<Animated.View
			onTouchEnd={() => {
				if (isHeader) isExpanded.value = !isExpanded.value;
			}}
			style={[
				{
					zIndex: itemsCount - index,
					position: 'absolute',
					width: windowWidth * 0.95,
					height: dropdownItemHeight,
					borderRadius: 10,
					top: collapsedTop,
				},
				rStyle,
			]}>
			<View style={styles.container}>
				<Animated.View
					style={[
						rLeftIconOpacity,
						styles.iconContainer,
						{
							left: 15,
						},
					]}>
					<AntDesign name={iconName} size={13} color="#d4d4d4" />
				</Animated.View>
				<Text style={styles.label}>{label}</Text>
				<Animated.View
					style={[
						rHeaderIconStyle,
						styles.iconContainer,
						{
							right: 15,
							backgroundColor: 'transparent',
						},
					]}>
					<MaterialIcons
						name={isHeader ? 'arrow-forward-ios' : 'arrow-forward'}
						size={25}
						color="#d4d4d4"
					/>
				</Animated.View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		color: '#d4d4d4',
		textTransform: 'uppercase',
		fontSize: 22,
		letterSpacing: 1.2,
	},
	iconContainer: {
		position: 'absolute',
		width: 45,
		aspectRatio: 1,
		backgroundColor: '#111',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
