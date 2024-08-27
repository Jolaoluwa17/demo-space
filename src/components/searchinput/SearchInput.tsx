import SearchIcon from '../../icons/SearchIcon';
import './searchInput.css';

function SearchInput() {
  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Something"
          className="search_input"
        />
        <div style={{ paddingTop: '4px' }}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
