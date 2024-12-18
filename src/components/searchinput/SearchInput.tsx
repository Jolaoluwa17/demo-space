import './searchInput.css';
import SearchIcon from '@/icons/SearchIcon';

interface Props {
  handleSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<Props> = ({ handleSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div>
      <div className="searchBar">
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
