import { React, Component } from 'react';
import { Tabs } from 'antd';

import Search from '../search';
import Card from '../card';

import './app.css';

export default class MovieList extends Component {
  state = {
    films: [],
    loading: true,
  };

  async componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk0YjQyMDYxOWY3YmY1Yzg5ZmJlNDQ5ZjIzMzVmNSIsInN1YiI6IjY0ZWYyMDVhM2E5OTM3MDExY2JkMTEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bx5BgGPER_m3UPUPnQ4s4JMiXv5ejsTGJj46OfdKL7w',
      },
    };

    try {
      const response = await fetch('https://api.themoviedb.org/3/search/movie?query=clown&include_adult=false&language=en-US&page=1', options);
      const data = await response.json();
      const filmsData = data.results.slice(0, 6); // Получаем первые 6 фильмов

      this.setState({ films: filmsData, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { films, loading } = this.state;

    const items = [
      {
        key: '1',
        label: 'Search',
        children: <Search />,
      },
      {
        key: '2',
        label: 'Rated',
        children: 'Content of Tab Pane 2',
      },
    ];

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="movie-container">
        <Tabs
          defaultActiveKey="1"
          centered
          items={items}
        />
        <div className="movie-list">
          {films.map((film) => (
            <Card key={film.id} film={film} />
          ))}
        </div>
      </div>
    );
  }
}
