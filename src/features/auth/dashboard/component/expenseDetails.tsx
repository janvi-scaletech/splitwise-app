import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddIcon, LeftArrow } from 'shared/components/icons/icons';
import { IExpenseProps } from '../interface/dashboard';
import ExpenseList from './expenseList';

const ExpenseDetails: FC = () => {
	const [totalOwe, setTotalOwe] = useState(0);
	const [totalBorrow, setTotalBorrow] = useState(0);
	const expenseData = JSON.parse(localStorage.getItem('expenses') || '[]');

	const getTotalExpenseForYou = () => {
		let totalOwe = 0;
		let totalBorrow = 0;

		expenseData.forEach(({ amount, owes_list, paid_person }: IExpenseProps) => {
			if (owes_list?.includes('You')) {
				if (paid_person === 'You') {
					const splitAmount = +amount / owes_list.length;
					totalOwe += +amount - splitAmount;
				} else {
					const splitAmount = +amount / owes_list.length;
					totalBorrow += splitAmount;
				}
			} else if (paid_person === 'You') {
				totalOwe += +amount;
			}
		});

		setTotalOwe(Math.round(totalOwe));
		setTotalBorrow(Math.round(totalBorrow));
	};

	useEffect(() => {
		getTotalExpenseForYou();
	});

	return (
		<div className='expenses-wrapper sm-container position--relative '>
			<div>
				<div className='owe-list-wrapper border-radius--lg text--white'>
					<div className='flex align-items--center'>
						<Link to='/'>
							<LeftArrow className='left-arrow mr--10' height='15px' width='15px' />
						</Link>
						<p className='font-size--lg font--semi-bold '>FRIENDS</p>
					</div>

					{expenseData?.length > 0 && totalOwe && (
						<h3 className='font-size--browser-default mt--20'>
							People Owe You <span className='text--green ml--5'>${Math.abs(totalOwe)}</span>
						</h3>
					)}
					{expenseData?.length > 0 && totalBorrow && (
						<p className='font-size--xs '>
							You owe people
							<span className='text--green font--medium ml--5'>${Math.abs(totalBorrow)}</span>
						</p>
					)}
				</div>
				<Link to='/settle-up'>
					<div className='settle-btn-wrapper border-radius--sm flex justify-content--center  align-items--center mt--10'>
						<button className='no--bg settle-up'>Settle up</button>
					</div>
				</Link>
			</div>
			<ExpenseList />

			<Link to='/expense'>
				<div className='expense-btn-wrapper border-radius--sm flex align-items--center position--absolute'>
					<AddIcon />
					<button className='add-expense-btn no--bg text--white '>Add Expense</button>
				</div>
			</Link>
		</div>
	);
};

export default ExpenseDetails;
