import './searchInput.css';
import SearchIcon from '@/icons/SearchIcon';

interface Props {
  handleSearch: (searchTerm: string) => void;
  darkmode?: boolean;
}

const SearchInput: React.FC<Props> = ({ handleSearch, darkmode }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div>
      <div className={`searchBar ${darkmode ? 'searchbar_dark' : ''}`}>
        <input
          type="text"
          placeholder="Search Something"
          className="search_input"
          onChange={handleInputChange}
        />
        <div style={{ paddingTop: '4px' }}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
