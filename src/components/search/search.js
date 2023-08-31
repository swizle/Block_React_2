import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;
const onSearch = (value) => console.log(value);

function Search2() {
  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
      />
    </Space>
  );
}
export default Search2;
