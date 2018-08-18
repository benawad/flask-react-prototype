import React from "react";
import ReactDOM from "react-dom";
import { Input, Rating, Form, Button, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import Movie from "./components/Movie";

const SERVER_URL = "http://localhost:5000";

class NewMovie extends React.Component {
  state = { rating: 1, title: "", movies: [] };

  handleClick = (_, { rating }) => {
    this.setState({ rating });
  };

  handleSubmit = async () => {
    const movie = { title: this.state.title, rating: this.state.rating };
    const response = await fetch(`${SERVER_URL}/add_movie`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 201) {
      this.setState({ movies: [...this.state.movies, movie] });
    }
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  async componentDidMount() {
    const response = await fetch(`${SERVER_URL}/movies`);
    const data = await response.json();
    this.setState({ movies: [...this.state.movies, ...data.movies] });
  }

  render() {
    const { title, rating, movies } = this.state;
    return (
      <Container>
        <Form>
          <Form.Field>
            <Input
              placeholder="title"
              onChange={this.handleChange}
              value={title}
            />
          </Form.Field>
          <Form.Field>
            <Rating
              icon="star"
              rating={rating}
              maxRating={5}
              onRate={this.handleClick}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={this.handleSubmit}>Add Movie</Button>
          </Form.Field>
        </Form>
        <Movie movies={movies} />
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(<NewMovie />, document.getElementById("root"));
