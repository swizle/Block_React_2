/* eslint-disable camelcase */
import { React } from 'react';
import { Rate, Image, Tag } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './card.css';

function Card({ film }) {
  const {
    poster_path,
    title,
    release_date,
    overview,
    vote_average,
  } = film;

  return (
    <div className="card">
      <Image className="img" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="Doesn't have a poster(" />
      <div className="container">
        <h2 className="title">{title}</h2>
        <p className="releaseDate">{format(new Date(release_date), 'MMMM d, yyyy')}</p>
        <Tag className="tag">Action</Tag>
        <Tag className="tag">Drama</Tag>
        <p className="description">{overview}</p>
        <Rate className="rate" count={10} defaultValue={vote_average} />
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
  }).isRequired,
};

export default Card;
