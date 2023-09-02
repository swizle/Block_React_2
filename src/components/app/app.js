import React, { Component } from 'react';
import { Tabs, Spin, Pagination } from 'antd';
import { debounce } from 'lodash';

import Search from '../search';
import Card from '../card';

import './app.css';

export default class MovieList extends Component {
  state = {
    films: [],
    loading: true,
    queryText: '',
    currentPage: 1,
    totalResults: 0,
  };

  handleSearchFilm = (text) => {
    if (text.trim() === '') {
      alert('Введите название фильма!');
      return;
    }
    this.setState({ queryText: text.trim(), loading: true, currentPage: 1 }, () => {
      this.fetchMovies();
    });
  };

  handleDebounceSearchFilm = debounce((e) => {
    const text = e.target.value;
    this.handleSearchFilm(text);
  }, 1000);

  handlePageChange = (page) => {
    this.setState({ loading: true, currentPage: page }, () => {
      this.fetchMovies();
    });
  };

  async fetchMovies() {
    const { queryText, currentPage } = this.state;
    const apiKey = '9c94b420619f7bf5c89fbe449f2335f5';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${queryText}&include_adult=false&language=en-US&page=${currentPage}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (data.total_results === 0) {
        alert('К сожалению, фильмов с таким названием нет!');
      }

      this.setState({
        films: data.results,
        loading: false,
        totalResults: data.total_results,
      });
    } catch (error) {
      alert(error);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      films, loading, currentPage, totalResults,
    } = this.state;

    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: <Search
          onSearchFilm={this.handleSearchFilm}
          onChangeText={this.handleDebounceSearchFilm}
        />,
      },
      {
        key: '2',
        label: 'Rated',
        children: 'Content of Tab Pane 2',
      },
    ];

    return (
      <div className="movie-container">
        <Tabs defaultActiveKey="1" centered items={tabs} />

        <div className="movie-list">
          {loading ? (
            <Spin />
          ) : (
            <>
              {films.map((film) => (
                <Card key={film.id} film={film} />
              ))}
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={totalResults}
                pageSize={20}
                onChange={this.handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
