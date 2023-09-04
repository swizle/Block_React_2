/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import { React } from 'react';
import { Rate, Image, Tag } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './card.css';

function Card({ film, guestRate, genres }) {
  const {
    poster_path,
    title,
    release_date,
    overview,
    vote_average,
    id,
    genre_ids,
  } = film;

  const getCircleColor = () => {
    if (vote_average >= 0 && vote_average < 3) {
      return '#E90000';
    } if (vote_average >= 3 && vote_average < 5) {
      return '#E97E00';
    } if (vote_average >= 5 && vote_average < 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  const getGenreName = (genre_id) => {
    const genre = genres.find((item) => item.id === genre_id);
    return genre ? genre.name : 'Unknown';
  };

  return (
    <div className="card">
      <Image className="img" src={`https://image.tmdb.org/t/p/original${poster_path || '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'}`} alt="Doesn't have a poster(" />
      <div className="container">
        <div className="title-container">
          <h2 className="title">{title}</h2>
          <div className="rating-circle" style={{ borderColor: getCircleColor() }}>
            {vote_average.toFixed(1)}
          </div>
        </div>
        <p className="releaseDate">{format(new Date(release_date || '01'), 'MMMM d, yyyy')}</p>
        {genre_ids.map((genre_id) => (
          <Tag className="tag" key={genre_id}>
            {getGenreName(genre_id)}
          </Tag>
        ))}
        <p className="description">{overview.substring(0, 200) || 'This movie doent have a description.'}</p>
        <Rate className="rate" count={10} onChange={(value) => guestRate(value, id)} />
      </div>
    </div>
  );
}

Card.propTypes = {
  film: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    id: PropTypes.number,
    genre_ids: PropTypes.any,
  }).isRequired,
  guestRate: PropTypes.func.isRequired,
  genres: PropTypes.any.isRequired,
};

export default Card;
