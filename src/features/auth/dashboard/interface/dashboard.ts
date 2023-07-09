export interface IValuesProps {
	[key: string]: string;
}

export interface IUserDetailsProps {
	id: number;
	username: string;
	profileImg: string;
}

export interface IExpenseProps {
	amount: number;
	date: string;
	description: string;
	paid_person: string;
	owes_list: string[];
}
