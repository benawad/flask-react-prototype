import React from "react";
import { Rating, Header, List } from "semantic-ui-react";

export default class Movie extends React.Component {
  render() {
    const { movies } = this.props;
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
  }
}
