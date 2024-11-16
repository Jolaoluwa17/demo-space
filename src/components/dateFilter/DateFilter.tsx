import LeftArrowIcon from '@/icons/LeftArrowIcon';
import './dateFilter.css';
import RightArrowIcon from '@/icons/RightArrowIcon';
import CustomSelect from '../customselect/CustomSelect';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Props {
  isYear: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  currentMonthIndex: number;
  years: string[];
}

const DateFilter: React.FC<Props> = ({
  isYear,
  setYear,
  currentMonth,
  setCurrentMonth,
  currentYear,
  currentMonthIndex,
  years,
}) => {
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setYear((prevYear) => (parseInt(prevYear) - 1).toString());
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (parseInt(isYear) === currentYear && prev === currentMonthIndex) {
        return prev;
      }
      if (prev === 11) {
        setYear((prevYear) => (parseInt(prevYear) + 1).toString());
        return 0;
      }
      return prev + 1;
    });
  };
  return (
    <div className="month_year_filter">
      <div className="left_month_controls" onClick={handlePreviousMonth}>
        <LeftArrowIcon />
      </div>
      <div className="right_month_controls" onClick={handleNextMonth}>
        <RightArrowIcon />
      </div>
      <div className="month_indicator">{monthNames[currentMonth]}</div>
      <CustomSelect
        options={years}
        value={isYear}
        onChange={setYear}
        placeholder="Year"
      />
    </div>
  );
};

export default DateFilter;
