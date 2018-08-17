import React from "react";
import Rating from "./Rating";

export default class Movie extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <ul>
        {movies.map(movie => (
          <li key={movie.title}>
            <span>{movie.title}</span>
            <Rating rating={movie.rating} onClick={() => {}} />
          </li>
        ))}
      </ul>
    );
  }
}
