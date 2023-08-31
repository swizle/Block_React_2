import { React } from 'react';
import { Rate, Image, Tag } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './card.css';

function Card({ film }) {
  return (
    <div className="card">
      <Image className="img" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="poster" />
      <div className="container">
        <h2 className="title">{film.title}</h2>
        <p className="releaseDate">{format(new Date(film.release_date), 'MMMM d, yyyy')}</p>
        <Tag className="tag">Action</Tag>
        <Tag className="tag">Drama</Tag>
        <p className="description">{film.overview}</p>
        <Rate className="rate" count={10} defaultValue={film.vote_average} />
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
