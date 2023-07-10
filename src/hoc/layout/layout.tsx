import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = (props) => {
	return (
		<div id='wrapper'>
			<div id='page-wrapper' className='width--full'>
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
