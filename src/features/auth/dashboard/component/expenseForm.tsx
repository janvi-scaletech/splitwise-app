import { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { ReactSelect } from 'shared/form/reactSelect';
import { reactSelectStyles } from 'shared/form/reactSelectStyles';
import { expenseValidationSchema } from 'shared/constants/validation-schema';
import { notify } from 'shared/components/notification/notification';
import {
	EXPENSE_DETAILS,
	EXPENSE_DETAILS_INITIAL_VALUES,
	PAYEES_NAME,
	USER_DETAILS,
	USER_OPTIONS
} from '../constants/dashboard.constants';
import { useDispatch } from 'react-redux';

interface IExpenseProps {
	setIsOpenExpense: (value: boolean) => void;
}
const ExpenseForm: FC<IExpenseProps> = ({ setIsOpenExpense }) => {
	const dispatch = useDispatch();

	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [expenseData, setExpenseData] = useState<any>();

	const handleFormSubmit = (values: FormikValues) => {
		setExpenseData(values);

		const currentDate = new Date();
		values.date = currentDate.toISOString();
		const expensesValue = localStorage.getItem('expenses');
		const expensesData = expensesValue ? JSON.parse(expensesValue) : [];

		expensesData.push(values);

		localStorage.setItem('expenses', JSON.stringify(expensesData));

		notify('Expense added successfully', 'success');
		setIsOpenExpense(false);
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
		<div>
			<Formik
				initialValues={EXPENSE_DETAILS_INITIAL_VALUES}
				onSubmit={handleFormSubmit}
				validationSchema={expenseValidationSchema}
				validateOnChange
				validateOnBlur
				validateOnMount
			>
				{({ handleSubmit, errors, touched, setFieldValue }) => {
					return (
						<Form onSubmit={handleSubmit}>
							{EXPENSE_DETAILS.map(({ label, name, type }, index) => {
								return (
									<div key={index} className='mb--15 flex flex--column position--relative'>
										<label className='text--left font-size--browser-default font--semi-bold'>
											{label}
										</label>
										<Field className={` no--bg input-field `} type={type} name={name} />

										<ErrorMessage
											name={name}
											component='p'
											className='error-message text--left font-size--xs font--medium mb--5'
										/>
									</div>
								);
							})}
							<ReactSelect
								style={{ ...reactSelectStyles }}
								options={USER_OPTIONS}
								isMulti={false}
								isSearchable={false}
								onChange={(selectedOption: any) => setFieldValue('paid_person', selectedOption.label)}
								placeholder={'Select USer'}
								closeMenuOnSelect={true}
							/>

							<div className='mt--40'>
								<p className='text--grey-200 font-size--xxl font--regular line-height--20'>
									How many people part of expense?
								</p>
								<div className='flex flex--wrap justify-content--between'>
									{PAYEES_NAME.map((values, index) => {
										return (
											<div className='mt--15 width--30' key={index}>
												<label
													htmlFor={`people${index}`}
													className='check-wrapper flex width--full font-size--browser-default font--regular line-height--20'
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
														// checked={
														// 	( && payees.includes(username)) || false
														// }
													/>

													<span className='checkmarks' />
													<p className='ml--25'>{values}</p>
												</label>
											</div>
										);
									})}
								</div>
							</div>

							<div className='mt--20'>
								<button>Add</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default ExpenseForm;
