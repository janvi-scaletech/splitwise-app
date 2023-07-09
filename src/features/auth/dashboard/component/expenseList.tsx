import React from 'react';
import { IValuesProps } from '../interface/dashboard';
import { formatDate } from 'shared/util/utility';
import { useDispatch } from 'react-redux';

const ExpenseList = () => {
	const expensesDataString = localStorage.getItem('expenses');
	const expensesData = expensesDataString ? JSON.parse(expensesDataString) : [];

	return (
		<div>
			<div className='expenses-wrapper mt--30'>
				<h2 className='mb--20'>Expenses List</h2>
				<div className='expenses-list'>
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
										className='expense-details flex justify-content--between align-items--center'
										key={index}
									>
										<div className='width--40 flex align-items--center'>
											<p className='font-size--sm mr--20'>{formatDate(date, 'LL')}</p>
											<div>
												<p className='text--capitalize font-size--lg'>{title}</p>
												<p>
													<span className='font-size--lg mr--5 text--yellow'>${amount}</span>
													<span className='font-size--sm text--grey'>by {paid_person}</span>
												</p>
											</div>
										</div>
										<div className='text--center'>
											<div className='flex flex--column'>
												<p
													className={`mb--5 text--right font-size--sm font--regular ${
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
														className={`no--margin text--right text--grey-800 ${
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
			</div>
		</div>
	);
};

export default ExpenseList;
