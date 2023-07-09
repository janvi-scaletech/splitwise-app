import { FC } from 'react';
import Header from 'hoc/header/header';
import { FRIEND_LIST } from '../constants/dashboard.constants';
import GroupImg from 'assets/images/Friends.webp';

const FriendList: FC = () => {
	return (
		<div className='friend-list-wrapper sm-container position--relative '>
			<h3 className='font-size--22'>Friend list</h3>
			<p className='text--light-grey font-size--xxs mt--10'>Groups</p>
			<div className='friend-list border-radius--sm flex align-items--center'>
				<div className='img-wrapper border-radius--half mr--10'>
					<img src={GroupImg} className='width--full height--full border-radius--half' />
				</div>
				<p className='font-size--sm font--medium'>FRIENDS</p>
			</div>
			<p className='text--light-grey font-size--xxs mt--10'>Friends</p>
			{FRIEND_LIST.map((name) => {
				return (
					<div className='friend-list border-radius--sm flex align-items--center mt--10'>
						<div className='img-wrapper border-radius--half mr--10'>
							<img src={GroupImg} className='width--full height--full border-radius--half' />
						</div>
						<p className='font-size--sm font--medium'>{name}</p>
					</div>
				);
			})}
			<Header />
		</div>
	);
};

export default FriendList;
