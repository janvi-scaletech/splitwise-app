export interface IAuthState {
	isLogin: boolean;
	userData: IUserData;
	expenseData: IExpenseData;
}

export interface ILoginResponse {
	data: IUserData;
	token: string;
}

export interface IUserData {
	id: string;
	email: string;
	role: string;
	status: string;
	avatar: string | null;
	name: string;
	token: string;
}

export interface IExpenseData {
	amount: number;
	date: Date;
	description: string;
	owes_list: string[];
	paid_person: string;
}
