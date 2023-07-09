import { FC, useEffect, useState } from 'react';
import CustomModal from 'shared/modal/modal';
import ExpenseForm from '../component/expenseForm';
import { USER_DETAILS } from '../constants/dashboard.constants';
import '../styles/dashboard.scss';
import ExpenseList from '../component/expenseList';

const Dashboard: FC = () => {
	const [name, setName] = useState<any>([]);
	const [isOpenExpense, setIsOpenExpense] = useState(false);

	const [totalOwe, setTotalOwe] = useState<number>(0);
	const [totalBorrow, setTotalBorrow] = useState<number>(0);
	const expenseData = JSON.parse(localStorage.getItem('expenses') || '[]') as any[];

	const getTotalExpenseForYou = () => {
		let totalOwe = 0;
		let totalBorrow = 0;

		expenseData.forEach((data: any) => {
			const { amount, owes_list, paid_person } = data;

			if (owes_list?.includes('You')) {
				if (paid_person === 'You') {
					const splitAmount = +amount / owes_list.length;
					console.log('splitAmount', splitAmount);
					totalOwe += +amount - splitAmount;
					console.log('11--------totalOwe', totalOwe);
				} else {
					const splitAmount = +amount / owes_list.length;
					totalBorrow += splitAmount;
					console.log('22------totalBorrow', totalBorrow);
				}
			} else if (paid_person === 'You') {
				totalOwe += +amount;
				console.log('33------totalOwe', totalOwe);
			}
		});

		setTotalOwe(Math.round(totalOwe));
		setTotalBorrow(Math.round(totalBorrow));
	};

	useEffect(() => {
		getTotalExpenseForYou();
	});

	useEffect(() => {
		setName(USER_DETAILS);
		localStorage.setItem('user-details', JSON.stringify(name));
	});

	return (
		<div className='dashboard-wrapper'>
			<div className='button-wrapper'>
				<button className='' onClick={() => setIsOpenExpense(!isOpenExpense)}>
					Expense
				</button>
			</div>

			{expenseData?.length > 0 && totalOwe && (
				<>
					<p
						className={`font-size--sm font--regular line-height--20 mt--15  ${
							totalOwe < 0 && 'text--red-600'
						}`}
					>
						You owe ${Math.abs(totalOwe)} overall
					</p>
				</>
			)}

			{expenseData?.length > 0 && totalBorrow && (
				<>
					<p
						className={`font-size--sm font--regular line-height--20 mt--15  ${
							totalBorrow > 0 && 'text--red-600'
						}`}
					>
						You borrowed ${Math.abs(totalBorrow)} overall
					</p>
				</>
			)}

			<ExpenseList />

			{isOpenExpense && (
				<CustomModal
					className='expense-modal'
					show={true}
					handleClose={() => {
						setIsOpenExpense(!isOpenExpense);
					}}
				>
					<h3 className=''>Add Expense</h3>
					<ExpenseForm setIsOpenExpense={setIsOpenExpense} />
				</CustomModal>
			)}
		</div>
	);
};

export default Dashboard;
