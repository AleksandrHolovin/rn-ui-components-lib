import React from 'react';
import { DropdownItemT } from '../types';
import { DropdownItem } from './DropdownItem';
import { useSharedValue } from 'react-native-reanimated';

interface IDropdownProps {
	header: DropdownItemT;
	options: DropdownItemT[];
}
export const Dropdown: React.FC<IDropdownProps> = ({ header, options }) => {
	const dropdownItems = [header, ...options];
	const isExpanded = useSharedValue(false);
	return (
		<>
			{dropdownItems.map((item: DropdownItemT, index: number) => (
				<DropdownItem
					key={index}
					label={item.label}
					iconName={item.iconName}
					index={index}
					itemsCount={dropdownItems.length}
					isExpanded={isExpanded}
				/>
			))}
		</>
	);
};
