import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { ReactSelect } from 'shared/form/reactSelect';
import { reactSelectStyles } from 'shared/form/reactSelectStyles';
import { expenseValidationSchema } from 'shared/constants/validation-schema';
import { LeftArrow } from 'shared/components/icons/icons';
import { notify } from 'shared/components/notification/notification';
import {
	EXPENSE_DETAILS,
	EXPENSE_DETAILS_INITIAL_VALUES,
	PAYEES_NAME,
	USER_OPTIONS
} from '../constants/dashboard.constants';

const ExpenseForm: FC = () => {
	const navigate = useNavigate();
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleFormSubmit = (values: FormikValues) => {
		const currentDate = new Date();
		values.date = currentDate.toISOString();

		const expensesValue = localStorage.getItem('expenses');
		const expensesData = expensesValue ? JSON.parse(expensesValue) : [];
		expensesData.push(values);

		localStorage.setItem('expenses', JSON.stringify(expensesData));

		notify('Expense added successfully', 'success');
		navigate('/expense-details');
	};

	const handleCheckValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		let updatedValues: string[] = [];
		const prevSelectedValues = selectedValues;
		if (event.target.checked) {
			updatedValues = [...prevSelectedValues, value];
		} else {
			updatedValues = prevSelectedValues.filter((selectedValue) => selectedValue !== value);
		}
		setSelectedValues(updatedValues);
		return updatedValues;
	};
	return (
		<div className='expense-form-wrapper sm-container position--relative'>
			<div className='flex align-items--center '>
				<Link to='/group-details'>
					<LeftArrow className='mr--20 mt--5 left-arrow-icon' />
				</Link>
				<h3 className='font-size--lg font--semi-bold '>Add Expense</h3>
			</div>
			<Formik
				initialValues={EXPENSE_DETAILS_INITIAL_VALUES}
				onSubmit={handleFormSubmit}
				validationSchema={expenseValidationSchema}
				validateOnChange
				validateOnBlur
				validateOnMount
			>
				{({ handleSubmit, setFieldValue }) => {
					return (
						<Form onSubmit={handleSubmit}>
							{EXPENSE_DETAILS.map(({ label, name, type }, index) => {
								return (
									<div key={index} className='mb--15 mt--20 flex flex--column position--relative'>
										<label className='text--left font-size--sm font--medium text--purple'>
											{label}
										</label>
										<Field
											className={`no--bg input-field font-size--sm `}
											type={type}
											name={name}
										/>

										<ErrorMessage
											name={name}
											component='p'
											className='error-message text--left  font--medium mb--5'
										/>
									</div>
								);
							})}

							<p className='font-size--sm font--medium text--purple'>Who paid</p>
							<ReactSelect
								style={{ ...reactSelectStyles }}
								options={USER_OPTIONS}
								isMulti={false}
								isSearchable={false}
								onChange={(selectedOption: any) => setFieldValue('paid_person', selectedOption.label)}
								placeholder={'Select person who paid'}
								closeMenuOnSelect={true}
							/>

							<div className='mt--25'>
								<p className='font-size--sm font--medium text--purple'>
									How many people part of expense?
								</p>
								<div className='flex flex--wrap justify-content--between'>
									{PAYEES_NAME.map((values, index) => {
										return (
											<div className='mt--15 width--30' key={index}>
												<label
													htmlFor={`people${index}`}
													className='check-wrapper flex width--full font-size--sm  font--regular line-height--20'
												>
													<input
														type='checkbox'
														id={`people${index}`}
														name='people_name'
														value={values}
														onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
															const updatedData = handleCheckValue(event);
															setFieldValue('owes_list', updatedData);
														}}
													/>

													<span className='checkmarks' />
													<p className='ml--25 font-size--sm text--grey'>{values}</p>
												</label>
											</div>
										);
									})}
								</div>
							</div>

							<button className='add-btn font-size--sm border-radius--sm cursor--pointer display-flex-center m--0-auto'>
								Add
							</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default ExpenseForm;
