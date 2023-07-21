import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon, CorrectIcon } from 'shared/components/icons/icons';
import { IValuesProps } from '../interface/dashboard';
import { formatDate } from 'shared/util/utility';
import CustomModal from 'shared/modal/modal';

const SettleUp: FC = () => {
	const expensesDataString = localStorage.getItem('expenses');
	const expensesData = expensesDataString ? JSON.parse(expensesDataString) : [];
	const [isSettleUp, setISSettleUp] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);

	return (
		<div className='settle-wrapper sm-container position--relative'>
			<div className='flex '>
				<Link to='/expense-details'>
					<CloseIcon className='mr--10' />
				</Link>
				<p className=''>Select a balance to settle</p>
			</div>
			<div className='expenses-list mt--20'>
				{expensesData &&
					expensesData.map(({ title, amount, paid_person, date, owes_list }: IValuesProps, index: number) => {
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
								className='expense-details cursor--pointer mt--10 flex justify-content--between align-items--center'
								key={index}
								onClick={() => setISSettleUp(!isSettleUp)}
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
													paid_person === 'You' ? 'text--success-600' : 'text--red-600'
												}`}
											>
												${Math.round(Number(totalAmount))}
											</h6>
										)}
									</div>
								</div>
							</div>
						);
					})}

				{isSettleUp && (
					<CustomModal show={true} handleClose={() => setISSettleUp(false)}>
						<div className='settle-up-wrapper '>
							<p className='text--purple font-size--lg'>Do you want to settle up ??</p>
							<button
								className='yes-btn  no--bg mt--20 m--0-auto display-flex-center'
								onClick={() => {
									localStorage.removeItem('expenses'), setISSettleUp(false), setPopupOpen(true);
								}}
							>
								Yes
							</button>
						</div>
					</CustomModal>
				)}

				{popupOpen && (
					<div className='flex flex--column align-items--center '>
						<p className='font-size--lg font--semi-bold'>You are all settled up</p>
						<CorrectIcon className='correct-icon mt--30' />
					</div>
				)}
			</div>
		</div>
	);
};

export default SettleUp;
