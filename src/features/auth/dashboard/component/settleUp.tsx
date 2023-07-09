import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon } from 'shared/components/icons/icons';
import ExpenseList from './expenseList';

const SettleUp: FC = () => {
	return (
		<div className='settle-wrapper sm-container position--relative'>
			<div className='flex '>
				<Link to='/group-details'>
					<CloseIcon className='mr--10' />
				</Link>
				<p className=''>Select a balance to settle</p>
			</div>
			<ExpenseList />
		</div>
	);
};

export default SettleUp;
