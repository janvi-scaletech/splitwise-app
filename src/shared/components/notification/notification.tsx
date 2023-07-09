import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
	return <Toaster position='bottom-center' reverseOrder={false} />;
};

type NotificationType = 'success' | 'error';

export const notify = (message: string, type?: NotificationType) => {
	const msg = `${message[0].toUpperCase()}${message.substr(1)}`;
	const options = notificationOptions(type as any);

	if (type === 'success') {
		toast.success(msg, options);
	} else if (type === 'error') {
		toast.success(msg, options);
	} else {
		toast(message, options);
	}
};

const notificationColorMapper: any = {
	success: 'green',
	error: 'red'
};

const notificationOptions = (varient: string) => {
	return {
		id: `${Math.random()}`,
		style: {
			backgroundColor: notificationColorMapper[varient],
			color: 'white',
			fontWeight: 'bold',
			fontSize: '14px'
		},
		iconTheme: {
			primary: '#FFFAEE',
			secondary: notificationColorMapper[varient]
		}
	};
};

export default Notification;
