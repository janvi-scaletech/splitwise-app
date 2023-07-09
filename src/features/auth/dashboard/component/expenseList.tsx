import React, { useEffect, useState } from 'react';
import { IValuesProps } from '../interface/dashboard';
import { formatDate } from 'shared/util/utility';
import { useDispatch, useSelector } from 'react-redux';
import GroupImg from 'assets/images/Friends.webp';
import { AddIcon, LeftArrow } from 'shared/components/icons/icons';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
	const expensesDataString = localStorage.getItem('expenses');
	const expensesData = expensesDataString ? JSON.parse(expensesDataString) : [];

	const [totalOwe, setTotalOwe] = useState<number>(0);
	const [totalBorrow, setTotalBorrow] = useState<number>(0);
	const expenseData = JSON.parse(localStorage.getItem('expenses') || '[]') as any[];

	const getTotalExpenseForYou = () => {
		let totalOwe = 0;
		let totalBorrow = 0;

		expenseData.forEach((data: any) => {
			const { amount, owes_list, paid_person } = data;

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
			<div className=''>
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
				</div>
				<div className='expenses-list mt--30'>
					{expensesData &&
						expensesData.map(
							({ title, amount, paid_person, date, owes_list }: IValuesProps, index: number) => {
								let totalAmount;

								if (owes_list?.includes('You')) {
									if (paid_person === 'You') {
										const splitAmount = +amount / owes_list.length;
										totalAmount = +amount - +splitAmount;
									} else {
										totalAmount = +amount / owes_list.length;
									}
								} else if (paid_person === 'You') {
									totalAmount = amount;
								}

								return (
									<div
										className='expense-details mt--10 flex justify-content--between align-items--center'
										key={index}
									>
										<div className='width--60 flex align-items--center'>
											<p className='font-size--xxs mr--20'>{formatDate(date, 'LL')}</p>
											<div>
												<p className='text--capitalize font-size--xxs'>{title}</p>
												<p>
													<span className='font-size--xs mr--5 font--medium'>${amount}</span>
													<span className='font-size--xs text--purple'>by {paid_person}</span>
												</p>
											</div>
										</div>
										<div className='text--center'>
											<div className='flex flex--column'>
												<p
													className={`mb--5 text--right font-size--xxs font--regular ${
														paid_person === 'You'
															? 'text--success-600'
															: paid_person !== 'You' && !owes_list.includes('You')
															? 'text--black'
															: 'text--red-600'
													}`}
												>
													{paid_person === 'You'
														? 'you lent'
														: paid_person !== 'You' && !owes_list.includes('You')
														? 'not involved'
														: 'you borrowed'}
												</p>
												{!(paid_person !== 'You' && !owes_list.includes('You')) && (
													<h6
														className={`no--margin text--right font-size--sm ${
															paid_person === 'You'
																? 'text--success-600'
																: 'text--red-600'
														}`}
													>
														${Math.round(Number(totalAmount))}
													</h6>
												)}
											</div>
										</div>
									</div>
								);
							}
						)}
				</div>

				<Link to='/expense'>
					<div className='expense-btn-wrapper border-radius--sm flex align-items--center position--absolute'>
						<AddIcon />
						<button className='add-expense-btn no--bg text--white '>Add Expense</button>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ExpenseList;
