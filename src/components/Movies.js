import React from "react";
import { Rating, Header, List } from "semantic-ui-react";

export const Movies = ({ movies }) => {
  return (
    <List>
      {movies.map(movie => (
        <List.Item key={movie.title}>
          <Header>{movie.title}</Header>
          <Rating rating={movie.rating} maxRating={5} disabled />
        </List.Item>
      ))}
    </List>
  );
};
