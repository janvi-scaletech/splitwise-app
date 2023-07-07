import { Component } from 'react';
import { DateRange, Range } from 'react-date-range';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import Button from './button';
// import { formatDate } from 'formatDate';

interface IDateRangeProps {
	showTitle?: boolean;
	startDate: moment.Moment;
	endDate: moment.Moment;
	handleSubmit: (range: { [key: string]: moment.Moment }) => void;
}

interface IUState {
	tempStartDate: moment.Moment; // tempStartDate and tempEndDate are used to preserve custom date selection
	tempEndDate: moment.Moment;
	showCalender: boolean;
	selectedLabel: string;
	allowDateSelection: boolean;
}

// const formatDateDisplay = (date: moment.Moment) => formatDate(date, 'YYYY-MMM-DD');
// const maxDate = moment();
/**
 * defined static ranges date
 */
const defineds = {
	startOfWeek: moment().startOf('week'),
	endOfWeek: moment().endOf('week'),
	startOfLastWeek: moment().startOf('week').add(-1, 'w'),
	endOfLastWeek: moment().endOf('week').add(-1, 'w'),
	startOfToday: moment().startOf('day'),
	endOfToday: moment().endOf('day'),
	startOfYesterday: moment().startOf('day').add(-1, 'd'),
	endOfYesterday: moment().endOf('day').add(-1, 'd'),
	startOfMonth: moment().startOf('month'),
	endOfMonth: moment().endOf('month'),
	startOfLastMonth: moment().startOf('month').add(-1, 'M').startOf('month'),
	endOfLastMonth: moment().endOf('month').add(-1, 'M').endOf('month')
};

/**
 * preDefined static date selection ranges label
 */
const staticRanges = ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth', 'custom'];

/**
 * DateRangePicker - date range component
 */
class DateRangePicker extends Component<IDateRangeProps> {
	state: IUState = {
		tempStartDate: defineds.startOfToday,
		tempEndDate: defineds.endOfToday,
		showCalender: false,
		selectedLabel: 'today',
		allowDateSelection: false
	};

	componentDidMount() {
		const dateRange = {
			start_date: this.props.startDate || defineds.startOfToday,
			end_date: this.props.endDate || defineds.endOfToday
		};
		this.props.handleSubmit(dateRange);
	}

	render() {
		const { showCalender, selectedLabel, allowDateSelection } = this.state;
		return (
			<div className='date-selection-wrapper d--flex'>
				{this.props.showTitle && <label className='date-label'>DateRange: </label>}
				{/* <label className='date-range-label' onClick={() => this.onShowCalender(showCalender)}>
					{formatDateDisplay(this.props.startDate)} <b>--</b> {formatDateDisplay(this.props.endDate)}
					<i className='fa fa-caret-down' />
				</label> */}
				<div className={`date-preview-wrapper ${!showCalender ? 'd--none' : ''}`}>
					<div className='static-ranges'>
						<ul>
							{staticRanges.map((label, index) => (
								<li
									key={index}
									className={selectedLabel === label ? 'active' : ''}
									onClick={() => this.onStaticRange(label)}
								/>
							))}
						</ul>
					</div>
					{allowDateSelection && (
						<>
							<DateRange
								onChange={(range: Range) => this.handleSelect(range)}
								// maxDate={maxDate}
								// calendars={1}
								// theme={{
								// 	DaySelected: {
								// 		background: '#1ab394'
								// 	},
								// 	DayInRange: {
								// 		background: '#1ab394',
								// 		color: '#ffffff'
								// 	},
								// 	DayHover: {
								// 		background: '#1ab394',
								// 		color: '#ffffff'
								// 	},
								// 	DayActive: {
								// 		background: '#1ab394',
								// 		color: '#ffffff'
								// 	}
								// }}
							/>
							<div className='date-range-footer'>
								<div className='mt--3 mb--3 date-range-actions d--flex align-items--center justify-content--center'>
									<Button
										btnType='danger'
										onClick={() => this.onShowCalender(showCalender)}
										type='button'
										className='mr--2'
									>
										{'cancel'}
									</Button>
									<Button onClick={() => this.onSubmit()} btnType='primary'>
										{'submit'}
									</Button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}

	/**
	 * onShowCalender - manage hide/show of date picker
	 * @param showCalender - cuurent state of date picker
	 */
	onShowCalender = (showCalender: boolean) => {
		this.setState({
			showCalender: !showCalender
		});
	};

	/**
	 * onStaticRange - set pre defined range selection
	 * @param label - cuurent selected label
	 */
	onStaticRange = (label: string) => {
		if (label === this.state.selectedLabel) {
			this.setState({
				showCalender: false
			});
			return;
		}

		let startDate = moment();
		let endDate = moment();

		if (label === 'custom') {
			this.setState({
				tempStartDate: startDate,
				tempEndDate: endDate,
				selectedLabel: label,
				allowDateSelection: true
			});
			return;
		}

		switch (label) {
			case 'today':
				startDate = defineds.startOfToday;
				endDate = defineds.endOfToday;
				break;
			case 'yesterday':
				startDate = defineds.startOfYesterday;
				endDate = defineds.endOfYesterday;
				break;
			case 'thisWeek':
				startDate = defineds.startOfWeek;
				endDate = defineds.endOfWeek;
				break;
			case 'lastWeek':
				startDate = defineds.startOfLastWeek;
				endDate = defineds.endOfLastWeek;
				break;
			case 'thisMonth':
				startDate = defineds.startOfMonth;
				endDate = defineds.endOfMonth;
				break;
			case 'lastMonth':
				startDate = defineds.startOfLastMonth;
				endDate = defineds.endOfLastMonth;
				break;
			default:
				startDate = moment();
				endDate = moment();
				break;
		}
		this.setState(
			{
				selectedLabel: label,
				allowDateSelection: false,
				showCalender: false
			},
			() => {
				const dateRange = {
					start_date: startDate,
					end_date: endDate
				};
				this.props.handleSubmit(dateRange);
			}
		);
	};

	/**
	 * handleSelect - set date range selection
	 * @param range - selected date range
	 */
	handleSelect = (range: Range) => {
		this.setState({
			tempStartDate: range.startDate,
			tempEndDate: range.endDate
		});
	};

	/**
	 * onSubmit - display selected date
	 */
	onSubmit = () => {
		this.setState(
			{
				showCalender: false
			},
			() => {
				if (
					isEqual(this.props.startDate, this.state.tempStartDate) &&
					isEqual(this.props.endDate, this.state.tempEndDate)
				)
					return;
				const dateRange = {
					start_date: this.state.tempStartDate,
					end_date: this.state.tempEndDate
				};
				this.props.handleSubmit(dateRange);
			}
		);
	};
}

export default DateRangePicker;
