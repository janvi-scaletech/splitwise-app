import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_MENU } from 'shared/constants/constants';

const Header: FC = () => {
	return (
		<div className='header-wrapper position--absolute '>
			<div className='header-menu-wrapper flex align-items--center'>
				{HEADER_MENU.map(({ title, SvgIcon, className, Url }, index) => {
					return (
						<div className='text--center cursor--pointer' key={index}>
							<Link to={Url}>
								<div className=''>
									<SvgIcon className={`${className}`} />
								</div>
								<p className='font-size--xxs text--light-grey'>{title}</p>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Header;
