const USER_DETAILS = [
	{
		id: 101,
		username: 'You',
		profileImg: ''
	},
	{
		id: 102,
		username: 'Rita',
		profileImg: ''
	},
	{
		id: 103,
		username: 'Kinjal',
		profileImg: ''
	},
	{
		id: 10,
		username: 'Jasmeen',
		profileImg: ''
	}
];

const EXPENSE_DETAILS_INITIAL_VALUES = {
	amount: '',
	date: ''
};

const PAYEES_NAME = ['You', 'Rita', 'Kinjal', 'Jasmeen'];

const USER_OPTIONS = [
	{ label: 'You', value: 1 },
	{ label: 'Rita', value: 2 },
	{ label: 'Kinjal', value: 3 },
	{ label: 'Jasmeen', value: 4 }
];

const EXPENSE_DETAILS = [
	{
		label: 'Enter Description',
		name: 'description',
		type: 'text'
	},
	{
		label: 'Enter Amount',
		name: 'amount',
		type: 'number'
	}
];

export { USER_DETAILS, EXPENSE_DETAILS_INITIAL_VALUES, EXPENSE_DETAILS, USER_OPTIONS, PAYEES_NAME };