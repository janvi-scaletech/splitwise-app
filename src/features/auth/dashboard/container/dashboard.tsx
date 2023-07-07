import { FC, useEffect, useState } from 'react';
import {
	EXPENSE_DETAILS,
	EXPENSE_DETAILS_INITIAL_VALUES,
	USER_DETAILS,
	USER_OPTIONS
} from '../constants/dashboard.constants';
import CustomModal from 'shared/modal/modal';
import '../styles/dashboard.scss';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { expenseValidationSchema } from 'shared/constants/validation-schema';
import { ReactSelect } from 'shared/form/reactSelect';
import { reactSelectStyles } from 'shared/form/reactSelectStyles';

const Dashboard: FC = () => {
	const [name, setName] = useState<any>([]);
	const [isOpenExpense, setIsOpenExpense] = useState(false);
	const [expenseValue, setExpenseValue] = useState([]);

	const onSubmit = (values: FormikValues) => {
		console.log('values', values);
		localStorage.setItem('expense-value', JSON.stringify(values));
	};
	useEffect(() => {
		setName(USER_DETAILS);
		localStorage.setItem('user-details', JSON.stringify(name));
	}, [name]);

	return (
		<div className='dashboard-wrapper'>
			<div className='button-wrapper'>
				<button className='' onClick={() => setIsOpenExpense(!isOpenExpense)}>
					Expense
				</button>
			</div>

			{isOpenExpense && (
				<CustomModal
					className='expense-modal'
					show={true}
					handleClose={() => {
						setIsOpenExpense(!isOpenExpense);
					}}
				>
					<h3 className=''>Add Expense</h3>
					<div>
						<Formik
							initialValues={EXPENSE_DETAILS_INITIAL_VALUES}
							onSubmit={onSubmit}
							validationSchema={expenseValidationSchema}
							validateOnChange
							validateOnBlur
							validateOnMount
						>
							{({ errors, touched, setFieldValue }) => {
								return (
									<Form>
										{EXPENSE_DETAILS.map(({ label, name, type }, index) => {
											return (
												<div
													key={index}
													className='mb--15 flex flex--column position--relative'
												>
													<label className='text--left font-size--browser-default font--semi-bold'>
														{label}
													</label>
													<Field className={` no--bg input-field `} type={type} name={name} />

													<ErrorMessage
														name={name}
														component='p'
														className='error-message text--left font-size--xs font--medium mb--5'
													/>

													{}
												</div>
											);
										})}
										<ReactSelect
											style={{ ...reactSelectStyles }}
											options={USER_OPTIONS}
											isMulti={false}
											isSearchable={false}
											onChange={(selectedOption: any) =>
												setFieldValue('name', selectedOption.label)
											}
											placeholder={'Select USer'}
											closeMenuOnSelect={true}
										/>
										<div className='mt--20'>
											<button>Add</button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
				</CustomModal>
			)}
		</div>
	);
};

export default Dashboard;
