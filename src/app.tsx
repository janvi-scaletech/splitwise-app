import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { IState } from 'shared/interface/state';
import Layout from 'hoc/layout/layout';
import Dashboard from 'features/auth/dashboard/container/dashboard';
import ExpenseForm from 'features/auth/dashboard/component/expenseForm';
import FriendList from 'features/auth/dashboard/component/friendList';
import GroupDetails from 'features/auth/dashboard/component/groupDetails';
import SettleUp from 'features/auth/dashboard/component/settleUp';

const App: React.FC = () => {
	const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

	return (
		<Layout>
			<Routes>
				<Route path='/group' element={<Dashboard />} />
				<Route path='expense' element={<ExpenseForm />} />
				<Route path='group-details' element={<GroupDetails />} />
				<Route path='friend-list' element={<FriendList />} />
				<Route path='settle-up' element={<SettleUp />} />

				{/*<Route path='/activity' element={<ActivityContainer />} />*/}
				{/*<Route path='/activity/:activityId' element={<Activity />} />*/}
				<Route path='*' element={<Navigate replace to='/group' />} />
			</Routes>
		</Layout>
	);
};

export default App;
