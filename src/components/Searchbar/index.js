// Searchbar.js
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';
import styles from './Searchbar.module.scss';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles.searchbar}>
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className={styles.searchField}>
        <FiSearch className={styles.searchIcon} />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
          className={styles.searchInput}
        />
      </div>
    </form>
  );
};

export default Searchbar;
