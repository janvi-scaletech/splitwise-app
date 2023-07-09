import { FC, useEffect, useState } from 'react';
import Header from 'hoc/header/header';
import { USER_DETAILS } from '../constants/dashboard.constants';
import { IUserDetailsProps } from '../interface/dashboard';
import GroupList from '../component/groupList';

const Dashboard: FC = () => {
	const [name, setName] = useState<IUserDetailsProps[]>([]);

	useEffect(() => {
		setName(USER_DETAILS);
		localStorage.setItem('user-details', JSON.stringify(name));
	});

	return (
		<div className='dashboard-wrapper sm-container position--relative '>
			<GroupList />
			<Header />
		</div>
	);
};

export default Dashboard;
