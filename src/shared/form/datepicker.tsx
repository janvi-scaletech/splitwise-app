import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Field, ErrorMessage } from 'formik';
import enGB from 'date-fns/locale/en-GB';
import FieldErrorMessage from './error';
import Button from './button';
//import Button from 'shared/components/form/button';
registerLocale('en-gb', enGB);

interface ITextFieldProps {
	name: string;
	label: string | boolean;
	date?: string;
	hideDateActionsButtons?: boolean;
	placeHolder?: string;
	hideTodayButton?: boolean;
	inline?: boolean;
	onClickOutside?: () => void;
	setFieldValue: (field: string, value: any) => void;
}
const DatePickerInput: React.FC<ITextFieldProps> = (props) => {
	const fieldRender = ({ field }: { field: any }) => {
		const selectDate = (date: Date) => {
			return props.setFieldValue(props.name, date);
		};

		return (
			<>
				<div className='datepicker-input-wrapper'>
					<div className='custom-datepicker'>
						<DatePicker
							todayButton={props.hideTodayButton ? false : 'today'}
							inline={props.inline}
							className='form-control'
							onClickOutside={props.onClickOutside}
							autoComplete='off'
							showMonthYearPicker
							locale='en-gb'
							{...field}
							placeholderText={props.placeHolder || ''}
							selected={field.value ? new Date(field.value) : new Date()}
							onChange={(date) => {
								props.setFieldValue(props.name, date);
							}}
							showMonthDropdown
							showYearDropdown
							dropdownMode='select'
							fixedHeight
						/>
					</div>
					{!props.hideDateActionsButtons && (
						<div className='datepicker-actions ml--20'>
							<Button
								className='width--100'
								onClick={() => {
									const dt = props.date ? new Date(props.date) : new Date();
									selectDate(new Date(dt.setDate(dt.getDate() + 7)));
								}}
								type='button'
							>
								+1
							</Button>
							<Button
								className='width--100'
								onClick={() => {
									const dt = props.date ? new Date(props.date) : new Date();
									selectDate(new Date(dt.setDate(dt.getDate() + 14)));
								}}
								type='button'
							>
								+2
							</Button>
							<Button
								className='width--100'
								onClick={() => {
									const dt = props.date ? new Date(props.date) : new Date();
									selectDate(new Date(dt.setMonth(dt.getMonth() + 1)));
								}}
								type='button'
							>
								+1
							</Button>
							<Button
								className='width--100'
								onClick={() => {
									const dt = props.date ? new Date(props.date) : new Date();
									selectDate(new Date(dt.setFullYear(dt.getFullYear() + 1)));
								}}
								type='button'
							>
								+1
							</Button>
						</div>
					)}
				</div>
				<ErrorMessage name={props.name} component={FieldErrorMessage} />
			</>
		);
	};

	return <Field name={props.name}>{fieldRender}</Field>;
};

export { DatePickerInput };
