import React from 'react';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { Input, IFieldConfig } from './inputTypes';
import Button from './button';
import WithTranslateFormErrors from 'hoc/withErrorHandler/withTranslationError';

interface ICustomFormProps {
	schema: Yup.ObjectSchema<any>;
	onSubmit: (values: FormikValues) => void;
	loading: boolean;
	fieldConfig: IFieldConfig[];

	initialValues?: any;
	dataTestId?: string;
	submitBtnText?: string;
	validateOnBlur?: boolean;
	validateOnChange?: boolean;
	title?: string;
	cancelSubmit?: React.ReactEventHandler;
	iBoxContentClassName?: string;
	formClassName?: string;
	inputDivClassName?: string;
	submitBtnClassName?: string;
	cancelBtnClassName?: string;
	btnGroupClassNames?: string;
	error?: string;
	showLabels?: boolean;
	showTitle?: boolean;
	showIcons?: boolean;
	svgClass?: string;
	onSelectFile?: (event: any) => void;
	isMultiFile?: boolean;
}

/**
 * common form to be rendered
 */
const CustomForm: React.FC<ICustomFormProps> = (props) => {
	const validateOnBlur = props.validateOnBlur === undefined ? true : props.validateOnBlur;
	const validateOnChange = props.validateOnChange === undefined ? false : props.validateOnChange;
	const initialValues = { ...(props.initialValues || {}) };

	const {
		cancelBtnClassName,
		submitBtnClassName,
		loading,
		submitBtnText,
		btnGroupClassNames,
		error,
		showLabels,
		inputDivClassName,
		fieldConfig,
		formClassName,
		showTitle,
		title,
		iBoxContentClassName,
		dataTestId,
		schema,
		cancelSubmit,
		onSubmit,
		onSelectFile
	} = props;

	fieldConfig.forEach((config) => {
		if (config.name !== 'status' && !initialValues[config.name]) {
			initialValues[config.name] = '';
		}
	});

	return (
		<div className='custom-form ' data-testid={dataTestId || null}>
			<div className='row'>
				<div className='col-lg-12'>
					<div className='ibox float-e-margins'>
						<div className={`ibox-content ${iBoxContentClassName || ''}`}>
							{!showTitle && (
								<div className='ibox-title d--flex'>
									{!!title && <h6 className='text-align--center' />}
								</div>
							)}
							{!!title && !!showTitle && <h2 className='text-align--center' />}
							<Formik
								initialValues={initialValues}
								validateOnBlur={validateOnBlur}
								validateOnChange={validateOnChange}
								onSubmit={onSubmit}
								validationSchema={schema}
							>
								{({ handleSubmit, setFieldValue, setFieldTouched, errors, touched }) => (
									<WithTranslateFormErrors
										errors={errors}
										touched={touched}
										setFieldTouched={setFieldTouched}
									>
										<form onSubmit={handleSubmit} className={formClassName || ''}>
											<fieldset>
												{fieldConfig.map((config, index) => (
													<div
														key={index}
														className={[inputDivClassName || '', 'form-group'].join('')}
													>
														<Input
															showLabels={showLabels}
															setFieldValue={setFieldValue}
															config={config}
															placeholder={config.placeHolder || config.label}
															type={config.type}
															name={config.name}
															isMultiFile={props.isMultiFile}
															onSelectFile={onSelectFile}
														/>
														{config.svgIcon && (
															<div
																className={
																	config.svgClass || 'input-svg--icon cursor-pointer'
																}
																onClick={config.svgClick}
															>
																{config.svgIcon}
															</div>
														)}
													</div>
												))}

												<div className='row'>
													{!!error && <p className='error text-align--center ' />}
												</div>

												<div
													className={` mb-3 d--flex align-items--center ${
														btnGroupClassNames ?? 'justify-content--center'
													}`}
												>
													<Button
														className={`width-100px ${submitBtnClassName}`}
														loading={loading}
														type='submit'
														btnType='primary'
													>
														{submitBtnText || 'Submit'}
													</Button>
													{cancelSubmit && (
														<Button
															className={`width-100px ${cancelBtnClassName}`}
															onClick={cancelSubmit}
															type='button'
															btnType='danger'
														>
															{'Cancel'}
														</Button>
													)}
												</div>
											</fieldset>
										</form>
									</WithTranslateFormErrors>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CustomForm };
