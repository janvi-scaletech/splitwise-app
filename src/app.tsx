import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { IState } from 'shared/interface/state';
import Layout from 'hoc/layout/layout';
import Dashboard from 'features/auth/dashboard/container/dashboard';

const App: React.FC = () => {
	const isLogin: boolean = useSelector((state: IState) => state.auth.isLogin);

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				{/*<Route path='/activity' element={<ActivityContainer />} />*/}
				{/*<Route path='/activity/:activityId' element={<Activity />} />*/}
				<Route path='*' element={<Navigate replace to='/' />} />
			</Routes>
		</Layout>
	);
};

export default App;
