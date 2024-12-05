import './dateFilter.css';
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
  currentMonth: string; // Change this to string
  setCurrentMonth: React.Dispatch<React.SetStateAction<string>>;
  currentYear: number;
  currentMonthIndex: number;
  years: string[];
}

const DateFilter: React.FC<Props> = ({
  isYear,
  setYear,
  currentMonth,
  setCurrentMonth,
  years,
}) => {
  const handleMonthChange = (selected: string) => {
    if (selected === 'All') {
      setCurrentMonth('All');
    } else {
      const monthIndex = monthNames.indexOf(selected); // Convert month name to index
      setCurrentMonth(monthIndex >= 0 ? monthIndex.toString() : 'All');
    }
  };

  const handleYearChange = (selected: string) => {
    setYear(selected);
  };

  return (
    <div className="month_year_filter">
      <div style={{ paddingRight: '10px', width: '100%' }}>
        <CustomSelect
          options={['All', ...monthNames]}
          value={
            currentMonth === 'All' ? 'All' : monthNames[parseInt(currentMonth)]
          }
          onChange={handleMonthChange}
          placeholder="Month"
          minWidth="150px"
        />
      </div>
      <div>
        <CustomSelect
          options={['All', ...years]}
          value={isYear}
          onChange={handleYearChange}
          placeholder="Year"
        />
      </div>
    </div>
  );
};

export default DateFilter;
