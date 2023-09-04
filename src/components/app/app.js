/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Tabs, Spin, Pagination } from 'antd';
import { debounce } from 'lodash';

import Search from '../search';
import Card from '../card';

import './app.css';

export default class MovieList extends Component {
  state = {
    genres: [],
    films: [],
    loading: true,
    queryText: '',
    currentPage: 1,
    totalResults: 0,
    guestId: '',
  };

  componentDidMount() {
    this.fetchGuest();
    this.fetchGenres();
  }

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

  handleTabChange = (activeKey) => {
    if (activeKey === '2') {
      this.fetchRating();
    }
  };

  // eslint-disable-next-line react/sort-comp, class-methods-use-this
  fetchMethod = async (url) => {
    const authKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk0YjQyMDYxOWY3YmY1Yzg5ZmJlNDQ5ZjIzMzVmNSIsInN1YiI6IjY0ZWYyMDVhM2E5OTM3MDExY2JkMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bx5BgGPER_m3UPUPnQ4s4JMiXv5ejsTGJj46OfdKL7w';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error);
      return null;
    }
  };

  guestRate = async (value, filmId) => {
    const { guestId } = this.state;
    const authKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk0YjQyMDYxOWY3YmY1Yzg5ZmJlNDQ5ZjIzMzVmNSIsInN1YiI6IjY0ZWYyMDVhM2E5OTM3MDExY2JkMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bx5BgGPER_m3UPUPnQ4s4JMiXv5ejsTGJj46OfdKL7w';
    const authUrl = `https://api.themoviedb.org/3/movie/${filmId}/rating?guest_session_id=${guestId}`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${authKey}`,
      },
      body: `{"value":${value}}`,
    };

    try {
      const response = await fetch(authUrl, options);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  fetchGuest = async () => {
    const data = await this.fetchMethod('https://api.themoviedb.org/3/authentication/guest_session/new');

    this.setState({
      guestId: data.guest_session_id,
    });
  };

  fetchGenres = async () => {
    const data = await this.fetchMethod('https://api.themoviedb.org/3/genre/movie/list?language=en');

    this.setState({
      genres: data.genres,
    });
  };

  fetchMovies = async () => {
    const { queryText, currentPage } = this.state;
    const data = await this.fetchMethod(`https://api.themoviedb.org/3/search/movie?query=${queryText}&include_adult=false&language=en-US&page=${currentPage}`);

    try {
      const filmsData = data.results.slice(0, 100);
      let filmsTotal = data.total_results;

      if (filmsTotal === 0) {
        alert('К сожалению, фильмов с таким названием нет!');
      }

      if (filmsTotal >= 100) {
        filmsTotal = 100;
      }

      this.setState({
        films: filmsData,
        loading: false,
        totalResults: filmsTotal,
      });
    } catch (error) {
      alert(error);
      this.setState({ loading: false });
    }
  };

  fetchRating = async () => {
    const { guestId } = this.state;
    const data = await this.fetchMethod(`https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`);

    try {
      if (data.total_results === 0) {
        alert('К сожалению, вы еще не оценивали фильмы!');
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
  };

  render() {
    const {
      films, loading, currentPage, totalResults, genres,
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
        <Tabs defaultActiveKey="1" centered items={tabs} onChange={this.handleTabChange} />

        <div className="movie-list">
          {loading ? (
            <Spin />
          ) : (
            <>
              {films.map((film) => (
                <Card key={film.id} film={film} guestRate={this.guestRate} genres={genres} />
              ))}
            </>
          )}
        </div>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalResults}
          pageSize={20}
          showSizeChanger={false}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
