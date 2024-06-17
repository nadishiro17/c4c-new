import { useState } from 'react';
import { PartnerDetails } from './types';
import './SearchBar.css';

interface SearchBarProps {
  onSearchResults: (results: PartnerDetails[]) => void; // Callback to handle search results
  onClearFilters: () => void; // Callback to clear search filters
}

function SearchBar({ onSearchResults, onClearFilters }: SearchBarProps) {
  const [name, setName] = useState(''); // State for the name filter
  const [isActive, setIsActive] = useState(''); // State for the active status filter

  // Handle form submission to search partners
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (name) query.append('name', name);
    if (isActive) query.append('isActive', isActive);

    // Fetch search results from the backend
    fetch(`http://localhost:4000/search?${query.toString()}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        onSearchResults(data);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  const handleClear = () => {
    setName('');
    setIsActive('');
    onClearFilters();
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-bar-fields">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isActive">Active Status</label>
          <select
            id="isActive"
            name="isActive"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="">Any</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
      <div className="search-bar-buttons">
        <button type="submit">Search</button>
        <button type="button" className="clear-filters-btn" onClick={handleClear}>Clear Filters</button>
      </div>
    </form>
  );
}

export default SearchBar;
