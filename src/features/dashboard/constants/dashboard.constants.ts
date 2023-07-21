const USER_DETAILS = [
	{
		id: 101,
		username: 'You',
		profileImg: ''
	},
	{
		id: 102,
		username: 'Joey',
		profileImg: ''
	},
	{
		id: 103,
		username: 'Ross',
		profileImg: ''
	},
	{
		id: 104,
		username: 'Monica',
		profileImg: ''
	},
	{
		id: 105,
		username: 'Phoebe',
		profileImg: ''
	},
	{
		id: 106,
		username: 'Chandler',
		profileImg: ''
	}
];

const EXPENSE_DETAILS_INITIAL_VALUES = {
	amount: '',
	date: ''
};

const PAYEES_NAME = ['You', 'Joey', 'Monica', 'Ross', 'Phoebe', 'Chandler'];
const FRIEND_LIST = ['Joey', 'Monica', 'Ross', 'Phoebe', 'Chandler'];

const USER_OPTIONS = [
	{ label: 'You', value: 1 },
	{ label: 'Joey', value: 2 },
	{ label: 'Monica', value: 3 },
	{ label: 'Ross', value: 4 },
	{ label: 'Phoebe', value: 5 },
	{ label: 'Chandler', value: 6 }
];

const EXPENSE_DETAILS = [
	{
		label: 'Enter a description',
		name: 'description',
		type: 'text'
	},
	{
		label: 'Enter a Amount',
		name: 'amount',
		type: 'number'
	}
];

export { USER_DETAILS, EXPENSE_DETAILS_INITIAL_VALUES, EXPENSE_DETAILS, USER_OPTIONS, PAYEES_NAME, FRIEND_LIST };
