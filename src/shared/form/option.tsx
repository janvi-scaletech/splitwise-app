import React from 'react';

interface IProps {
	name: string;
	value: string | number;
}
const Option: React.FC<IProps> = (props) => {
	return <option value={props.value}>{props.name}</option>;
};
export default Option;
