import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { IState } from 'shared/interface/state';
import Layout from 'hoc/layout/layout';
import Dashboard from 'features/dashboard/container/dashboard';
import ExpenseForm from 'features/dashboard/component/expenseForm';
import ExpenseDetails from 'features/dashboard/component/expenseDetails';
import FriendList from 'features/dashboard/component/friendList';
import SettleUp from 'features/dashboard/component/settleUp';

const App: React.FC = () => {
	const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

	return (
		<Layout>
			<Routes>
				<Route path='/group' element={<Dashboard />} />
				<Route path='expense' element={<ExpenseForm />} />
				<Route path='expense-details' element={<ExpenseDetails />} />
				<Route path='friend-list' element={<FriendList />} />
				<Route path='settle-up' element={<SettleUp />} />

				<Route path='*' element={<Navigate replace to='/group' />} />
			</Routes>
		</Layout>
	);
};

export default App;
