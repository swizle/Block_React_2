import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

function Search2({ onSearchFilm, onChangeText }) {
  return (
    <div>
      <Search
        placeholder="input search text..."
        onSearch={(value) => onSearchFilm(value)}
        onChange={(value) => onChangeText(value)}
      />
    </div>
  );
}

Search2.propTypes = {
  onSearchFilm: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

export default Search2;
