import React, { FC } from 'react';
import { formatDate } from 'shared/util/utility';

interface IViewProps {
	isViewExpense: number;
	handleClose: () => void;
}

const ViewExpense: FC<IViewProps> = ({ isViewExpense }) => {
	const expensesDataString = localStorage.getItem('expenses');
	const expensesData = expensesDataString ? JSON.parse(expensesDataString) : [];

	const { description, amount, date, paid_person, owes_list } = expensesData[isViewExpense];
	const splitAmount = +amount / owes_list.length;

	return (
		<div className='view-expense-details'>
			<h3 className='text--left mb--10 font-size--browser-default'>Expense Details</h3>
			<div className='flex justify-content--between align-items--center'>
				<div className='mb--10'>
					<p className='text--capitalize font-size--sm'>{description}</p>
					<p className='font-size--sm font--semi-bold text--primary'>${amount}</p>
					<p className='font-size--xxs text--grey'>
						Added by {paid_person} on {formatDate(date)}
					</p>
				</div>
			</div>
			<div>
				<p className='font-size--sm font--semi-bold mb--10'>
					{paid_person} paid <span className='font-size--sm font--semi-bold text--primary'>₹{amount}</span>
				</p>

				{owes_list &&
					owes_list.map((name: string, index: number) => {
						return (
							<div className='font-size--sm ml--10 mb--5 flex justify-content--between' key={index}>
								<div className='flex'>
									<p className='font-size--sm mr--5'>{name} owes </p>
									<p className='text--success font-size--sm font--medium text--primary'>
										₹{splitAmount.toFixed(2)}
									</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ViewExpense;
