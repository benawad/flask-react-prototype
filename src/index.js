import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Movie from "./components/Movie";
import Rating from "./components/Rating";

const SERVER_URL = "http://localhost:5000";

class NewMovie extends React.Component {
  state = { rating: 1, title: "", movies: [] };

  handleClick = i => {
    this.setState({ rating: i });
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
      <div>
        <label>Title</label>
        <input type="text" onChange={this.handleChange} value={title} />
        <Rating rating={rating} onClick={this.handleClick} />
        <button onClick={this.handleSubmit}>Add Movie</button>
        <Movie movies={movies} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<NewMovie />, document.getElementById("root"));
