import React, { ChangeEventHandler, ReactElement } from 'react';
import AsyncSelect from 'react-select/async';
import { Field, ErrorMessage, FieldProps, FormikValues } from 'formik';
import Collapsible from 'react-collapsible';

import FieldErrorMessage from './error';
import { reactSelectStyles } from './reactSelectStyles';
import { camelCaseToFirstUpperLetter } from 'shared/util/utility';
import { ReactSelect } from './reactSelect';

export interface IDropDownAndCheckboxOptions {
	id?: string | number;
	label: string;
	value: string | number;
}

export interface IFieldConfig {
	type: 'text' | 'textarea' | 'email' | 'password' | 'number' | 'dropdown' | 'checkbox' | 'file';
	label: string;
	name: string;
	mode?: string;
	isCollapsible?: boolean;
	className?: string;
	placeHolder?: string;
	hideDefaultOption?: boolean;
	otherOptions?: {
		dropDownOptions?: IDropDownAndCheckboxOptions[];
		checkboxOptions?: IDropDownAndCheckboxOptions[];
		isMultiSelect?: boolean;
		note?: string;
		suggestion?: string;
		sampleFile?: {
			label?: JSX.Element;
			link: string;
		};
	};
	svgIcon?: ReactElement<SVGElement>;
	checkbox?: string;
	svgClass?: string;
	svgClick?: () => void;
	isMultiFile?: boolean;
	onSelectFile?: (event: any) => void;
}
interface ITextFieldProps {
	name: string;
	mode?: string;
	rows?: number;
	placeholder: string;
	config: IFieldConfig;
	setFieldValue: (field: string, value: any) => void;

	disabled?: boolean;
	disableWheel?: boolean;
	readOnly?: boolean;
	type?: 'text' | 'textarea' | 'email' | 'password' | 'number' | 'checkbox' | 'dropdown' | 'file';
	className?: string;
	autoComplete?: string;
	showLabels?: boolean;
	isMultiFile?: boolean;
	supportedType?: string;
	isClearable?: boolean;
	onSelectFile?: (event: any) => void;
}

const RenderInput: React.FC<ITextFieldProps & { field: any }> = (props) => {
	const { showLabels, config, name, rows, className, placeholder, disabled, readOnly, autoComplete, field, type } =
		props;
	switch (props.type) {
		// render text input in case of text, textarea, email, password and number
		case 'textarea':
			return (
				<>
					{showLabels && config.label && (
						<label className='ignore-text-capitalize mb--10'>
							{camelCaseToFirstUpperLetter(config.label)}
						</label>
					)}
					<textarea
						{...props.field}
						value={getValue(field.value)}
						id={name}
						rows={rows}
						onChange={(e) => props.setFieldValue(e.target.name, e.target.value)}
						className={`${config.className || ''} form-control`}
						placeholder={placeholder}
						disabled={disabled ? true : false}
						readOnly={readOnly}
						autoComplete={`${autoComplete || 'off'}`}
					/>

					<ErrorMessage name={config.name} component={FieldErrorMessage} />
					{getNote((config.otherOptions || {}).note)}
				</>
			);
		case 'text':
		case 'email':
		case 'password':
			return (
				<>
					{showLabels && config.label && (
						<label className='ignore-text-capitalize mb--10'>
							{camelCaseToFirstUpperLetter(config.label)}
						</label>
					)}
					<input
						{...props.field}
						value={getValue(field.value)}
						id={name}
						type={type}
						onWheelCapture={(e) => props.disableWheel && e.currentTarget.blur()}
						className={`${config.className || ''} form-control`}
						placeholder={placeholder}
						disabled={disabled ? true : false}
						readOnly={readOnly}
						autoComplete={`${autoComplete || 'off'}`}
					/>
					<ErrorMessage name={config.name} component={FieldErrorMessage} />
					{getNote((config.otherOptions || {}).note)}
				</>
			);
		case 'number':
			return (
				<>
					{showLabels && config.label && (
						<label className='ignore-text-capitalize mb--10'>
							<br />
						</label>
					)}
					<input
						{...props.field}
						value={getValue(field.value)}
						id={name}
						onChange={(e) => props.setFieldValue(e.target.name, parseInt(e.target.value))}
						type={type}
						onWheelCapture={(e) => props.disableWheel && e.currentTarget.blur()}
						className={`${className || ''} form-control`}
						placeholder={placeholder}
						disabled={disabled ? true : false}
						readOnly={readOnly}
						autoComplete={`${autoComplete || 'off'}`}
					/>
					<ErrorMessage name={config.name} component={FieldErrorMessage} />
					{getNote((config.otherOptions || {}).note)}
				</>
			);
		case 'checkbox':
			return (
				<div className='form-group align-items--baseline'>
					{config.label && (
						<>
							{config.isCollapsible ? (
								<Collapsible
									easing='ease-in-out'
									transitionTime={250}
									trigger={getCollapsiblePanelHeader(config.label, false, props)}
									triggerWhenOpen={getCollapsiblePanelHeader(config.label, true, props)}
								>
									{getCheckBoxFields(props)}
								</Collapsible>
							) : (
								<label className='ignore-text-capitalize col-xs-4 col-sm-2 control-label' />
							)}
						</>
					)}
					{!props.config.isCollapsible && getCheckBoxFields(props)}
				</div>
			);

		// render dorpdown when dropdown type is provided
		case 'dropdown': {
			return (
				<div className='row'>
					{showLabels && config.label && <label className='ignore-text-capitalize col-sm-12 control-label' />}

					<div className='col-sm-12'>
						<ReactSelect
							placeholder={props.placeholder}
							styles={{ ...reactSelectStyles }}
							value={field.value}
							isClearable={props.isClearable}
							name={config.name}
							options={geDropDownOptions(config)}
							onChange={(selectedOption: Record<string, any>) =>
								props.setFieldValue(config.name, selectedOption || '')
							}
							closeMenuOnSelect={true}
							classNamePrefix='select'
							disabled={props.disabled || props.readOnly}
							isMulti={false}
							className={`form-field no--padding cursor-pointer ${className}`}
							isSearchable={false}
						/>
						<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
					</div>
				</div>
			);
		}
		case 'file':
			return (
				<>
					{showLabels && config.label && (
						<>
							<label className='ignore-text-capitalize mb--10'>
								{(config.otherOptions || {}).sampleFile && (
									<span>
										(&nbsp;
										<a href={((config.otherOptions || {}).sampleFile || {}).link} download>
											((config.otherOptions || {}).sampleFile || {}).label
										</a>
										&nbsp;)
									</span>
								)}
							</label>
							<br />
						</>
					)}
					<input
						{...props.field}
						id={name}
						type={type}
						value={field.value}
						className={`${config.className || ''} form-control hide`}
						multiple={props.isMultiFile}
						onChange={props.onSelectFile}
					/>
					<label htmlFor={name} className={` btn btn-info ${config.className}`} />
					{!!props.supportedType && <p className='mb--0' />}
					<ErrorMessage name={config.name} component={FieldErrorMessage} />
					{getNote((config.otherOptions || {}).note)}
				</>
			);
		default:
			return <></>;
	}
};

/**
 * common input field component
 * renders input based on the field configuration
 * @param props { field, form: { touched, errors }, ...props }
 */
const Input: React.FC<ITextFieldProps> = (props) => {
	const fieldRender = ({ field }: { field: any }) => {
		return <RenderInput {...props} field={field} />;
	};

	return <Field name={props.name}>{fieldRender}</Field>;
};

const RenderAsyncSelect = (props: any) => {
	return (
		<>
			{props.config.label && <label className='ignore-text-capitalize mb--10' />}
			<AsyncSelect
				{...props.field}
				placeholder={props.placeholder || ''}
				value={props.value}
				onChange={props.onChange}
				onInputChange={props.onInputChange}
				defaultOptions={props.defaultOptions}
				noOptionsMessage={props.noOptionsMessage}
				loadOptions={props.loadOptions}
				options={props.options}
				getOptionLabel={props.getOptionLabel}
				getOptionValue={props.getOptionValue}
				isClearable={props.isClearable ? true : false}
				isDisabled={props.disabled ? true : false}
				styles={reactSelectStyles}
				closeMenuOnSelect={props.closeMenuOnSelect ? true : false}
				isSearchable={props.isSearchable ? true : false}
			/>
		</>
	);
};

const Asyncselect: React.FC<FieldProps<FormikValues> & any> = (props) => {
	const fieldRender = ({ field }: { field: any }) => {
		return <RenderAsyncSelect {...props} field={field} />;
	};
	return <Field name={props.name}>{fieldRender}</Field>;
};

/**
 * getCheckboxValue - returns check box value, after changing value with change event of html input element
 * @param field - field returned by formik
 * @param evt - html input change event, linked with checkbox input
 */
const getCheckboxValue = (field: any, evt: React.ChangeEvent<HTMLInputElement>) => {
	// if field value is empty, or null initially, assign it as empty array of strings
	if (!field.value) {
		field.value = [];
	}
	const index = field.value.indexOf(evt.target.value.toString());
	// if event gives `checked` = true, push target value to field value
	if (evt.target.checked) {
		field.value.push(evt.target.value.toString());
	} else if (index !== -1) {
		// else remove target value from field value
		field.value.splice(index, 1);
	}
	// return value
	return field.value;
};

const geDropDownOptions = (config: IFieldConfig) => {
	return (config.otherOptions || {}).dropDownOptions || [];
};

const geCheckboxOptions = (config: IFieldConfig) => {
	return (config.otherOptions || {}).checkboxOptions || [];
};
const getValue = (value?: string | number) => {
	if (value === undefined || value === null) {
		return '';
	}
	return value;
};
const getNote = (note: string | undefined | null) => {
	if (note === undefined || note === null) {
		return '';
	}
	return <div className='field-note' />;
};

const getCheckBoxFields = (props: ITextFieldProps & { field: any }) => {
	return (
		<>
			<div className='pl--10 col-xs-12 col-sm-12 col-md-12 col-lg-12'>
				{geCheckboxOptions(props.config).map((option) => {
					const { value, label } = option;
					const setCheckboxvalue: ChangeEventHandler<HTMLInputElement> = (evt) => {
						props.setFieldValue(props.config.name, getCheckboxValue(props.field, evt));
					};
					const isChecked = (props.field.value || [])
						.map((key: string) => (key || '').toString())
						.includes(value.toString());
					return (
						<div className='checkbox-content col-lg-3 col-md-4 col-sm-6 col-xs-12' key={value}>
							<label className='ignore-text-capitalize checkbox-label'>
								<input
									placeholder={label}
									checked={isChecked}
									onChange={setCheckboxvalue}
									type='checkbox'
									name={label}
									value={value}
								/>
							</label>
						</div>
					);
				})}
			</div>
			<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
			{getNote((props.config.otherOptions || {}).note)}
		</>
	);
};

const getCollapsiblePanelHeader = (title: string, isOpen: boolean, props: ITextFieldProps & { field: any }) => {
	const isChecked = props.field.value.length === geCheckboxOptions(props.config).length;
	const setCheckboxvalue = (event: any) => {
		if (isChecked || isOpen) {
			event.preventDefault();
			event.stopPropagation();
		}
		if (!isChecked) {
			const checkedValue = geCheckboxOptions(props.config).map((checkBox: any) => checkBox.value.toString());
			props.setFieldValue(props.config.name, checkedValue);
		} else {
			props.setFieldValue(props.config.name, []);
		}
	};
	return (
		<div className='collapsible-custom-header pl--10'>
			<div className='checkbox-content' onClick={(e) => setCheckboxvalue(e)}>
				<label className='ignore-text-capitalize col-lg-10 col-md-10 col-xs-10 col-sm-10 control-label checkbox-label'>
					<input checked={isChecked} onChange={() => 0} type='checkbox' name={title} />
					<span className='checkmark' />
				</label>
			</div>
			<button>
				<i className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`} />
			</button>
		</div>
	);
};

export { Input, Asyncselect };
