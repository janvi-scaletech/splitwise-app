import { FC } from 'react';
import profileImg from 'assets/images/profile.webp';
import Header from 'hoc/header/header';
import GroupImg from 'assets/images/Friends.webp';
import { Link } from 'react-router-dom';

const GroupList: FC = () => {
	return (
		<div className='group-list-wrapper'>
			<div className='flex justify-content--between align-items--center'>
				<div className='circle-wrapper border-radius--half'>
					<img src={profileImg} alt='profile-img' className='width--full height--full border-radius--half' />
				</div>
				<div className=''>
					<p className='font-size--sm '>Welcome ,</p>
					<h3 className='font--semi-bold font-size--xxl text--purple '>Rachel Green</h3>
				</div>
			</div>
			<Link to='/group-details'>
				<div className='list-wrapper flex align-items--center mt--30 cursor--pointer mb--30'>
					<div className='img-wrapper border-radius--sm'>
						<img src={GroupImg} className='width--full height--full border-radius--sm' />
					</div>
					<div className='display-flex-center ml--15'>
						<h3 className='font-size--browser-default font--medium text--black'>FRIENDS</h3>
					</div>
				</div>
			</Link>

			<div className='button-wrapper display-flex-center border-radius--sm '>
				<button className='btn no--bg font-size--sm'>Start a new group</button>
			</div>
		</div>
	);
};

export default GroupList;
