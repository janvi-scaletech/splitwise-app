import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

interface IOption {
	readonly label: string;
	readonly value: string;
}

const styles: any = {
	control: () => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '100%',
		maxWidth: '315px',
		border: '2px solid rgba(106, 91, 226, 0.5)',
		borderRadius: '10px',
		padding: '4px',
		color: '$spanish-gray',
		fontSize: '14px',
		fontWeight: '$font-regular'
	})
};

const createOption = (label: string) => ({
	label,
	value: label.toLowerCase().replace(/\W/g, '')
});

export default (props: { defaultOptions: any; onChange: any; defaultValue: any }) => {
	const { defaultOptions, onChange, defaultValue } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState(defaultOptions);
	const [value, setValue] = useState<IOption | null>();

	const handleCreate = (inputValue: string) => {
		setIsLoading(true);
		setTimeout(() => {
			const newOption = createOption(inputValue);
			setIsLoading(false);
			setOptions((prev: any) => [...prev, newOption]);
			setValue(newOption);
		}, 1000);
	};

	return (
		<CreatableSelect
			isClearable
			isDisabled={isLoading}
			isLoading={isLoading}
			onChange={onChange}
			onCreateOption={handleCreate}
			options={options}
			value={value}
			styles={...styles}
			defaultValue={defaultValue}
			placeholder='Please select value ...'
		/>
	);
};
