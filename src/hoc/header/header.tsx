import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_MENU } from 'shared/constants/constants';

const Header: FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div className='header-wrapper position--absolute '>
			<div className='header-menu-wrapper flex align-items--center'>
				{HEADER_MENU.map(({ title, SvgIcon, className, Url }, index) => {
					return (
						<Link to={Url}>
							<div
								className='text--center cursor--pointer'
								key={index}
								onClick={() => setActiveIndex(index)}
							>
								<div className=''>
									<SvgIcon className={`${index === activeIndex ? 'purple-icon' : className} `} />
								</div>
								<p
									className={`${
										index === activeIndex ? 'text--purple' : 'text--light-grey'
									} font-size--xxs `}
								>
									{title}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Header;
