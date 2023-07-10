import React from 'react';
import Select from 'react-select';

import { reactSelectStyles } from './reactSelectStyles';

const initStyles = {
	control: () => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '95%',
		minHeight: '38px  ',
		border: '2px solid #7b72ff',
		padding: '0px',
		color: 'black',
		borderRadius: '10px'
	})
};

const ReactSelect: React.FC<any> = (props) => {
	const {
		placeholder,
		menuPlacement,
		value,
		onChange,
		isOptionDisabled,
		onInputChange,
		options,
		components,
		getOptionLabel,
		getOptionValue,
		isClearable,
		closeMenuOnSelect,
		isSearchable,
		isMulti,
		isDisabled,
		styles,
		defaultValue
	} = props;
	return (
		<Select
			defaultValue={defaultValue}
			placeholder={placeholder || ''}
			menuPlacement={menuPlacement || 'auto'}
			value={value}
			onChange={onChange}
			isOptionDisabled={(options) => (isOptionDisabled ? isOptionDisabled(options) : false)}
			onInputChange={onInputChange}
			options={options}
			components={components || {}}
			getOptionLabel={getOptionLabel}
			getOptionValue={getOptionValue}
			isClearable={isClearable ? true : false}
			styles={{ ...reactSelectStyles, ...(styles || initStyles) }}
			closeMenuOnSelect={closeMenuOnSelect ? true : false}
			isSearchable={isSearchable ? true : false}
			isMulti={isMulti ? true : false}
			isDisabled={isDisabled}
		/>
	);
};

export { ReactSelect };
