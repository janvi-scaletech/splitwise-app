import { CSSProperties } from 'react';
import Control from 'react-select/dist/declarations/src/components/Control';

export const reactSelectStyles = {
	option: (base: CSSProperties, state: any) => ({
		...base,
		borderBottom: '1px solid #e7e7e7',
		color: 'black',
		padding: 8,
		fontSize: '12px',
		backgroundColor: state.isSelected ? '#d5d5d5' : state.isFocused ? '#e7e7e7' : '',
		':active': {
			backgroundColor: '#e7e7e7'
		},
		':hover': {
			backgroundColor: '#e7e7e7'
		},
		':focus': {
			backgroundColor: '#e7e7e7',
			outline: 0
		}
	}),
	menu: (base: CSSProperties) => ({
		...base,
		zIndex: 3,
		marginTop: 0,
		width: '289px',
		top: '43%'
	}),
	menuList: (base: CSSProperties) => ({
		...base,
		padding: 0,
		maxHeight: '230px',
		backgroundColor: '#ffffff'
	}),
	clearIndicator: (base: CSSProperties) => ({
		...base,
		cursor: 'pointer'
	}),
	dropdownIndicator: (base: CSSProperties, state: any) => ({
		...base,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
	}),
	indicatorSeparator: () => ({
		width: '0'
	}),
	control: (base: CSSProperties) => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '300px',
		minHeight: '50px',
		padding: '0px',
		backgroundColor: '#ffffff',
		border: '1px solid red'
	}),
	container: () => ({
		width: '300px'
	}),

	singleValue: (base: CSSProperties, state: any) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...base, opacity: opacity, transition: transition, fontSize: '12px' };
	},
	placeholder: (base: CSSProperties) => ({
		...base,
		fontSize: '12px'
	})
};
