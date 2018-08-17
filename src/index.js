import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var $ = require('jquery');

function Star(props) {
  return (
    <button className="square" onClick={props.onClick}> 
      {props.value}
    </button>
  );
}

class Movie extends React.Component {
  listMovies() { 
    return (
      this.props.movies.map((movie) => { return (
      <li>
      <span>{movie.title}</span>
      <Rating rating={movie.rating} />
      </li> );
    })
  );
  }
  render() {
    return (
      <ul>
        {this.listMovies()}
      </ul>
    )
  }
}

class Rating extends React.Component {
  render() {
    return (
      <div className="board-row">
        <Star value={this.props.rating >= 1 ? 'X' : ''} onClick={() => this.props.onClick(1)} />
        <Star value={this.props.rating >= 2 ? 'X' : ''} onClick={() => this.props.onClick(2)} />
        <Star value={this.props.rating >= 3 ? 'X' : ''} onClick={() => this.props.onClick(3)} />
        <Star value={this.props.rating >= 4 ? 'X' : ''} onClick={() => this.props.onClick(4)} />
        <Star value={this.props.rating == 5 ? 'X' : ''} onClick={() => this.props.onClick(5)} />
      </div>
    )
  }
}

class NewMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating : 1, title: '', movies: []}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(i) {
    this.setState({rating : i});
  }
  handleSubmit() {
    const movie = {title : this.state.title, rating : this.state.rating};
    $.ajax({
      type: 'POST',
      url: '/add_movie', 
      data : JSON.stringify(movie),
      contentType: 'application/json',
    }).then((data, textStatus, jqXHR) => {
      if (jqXHR.status === 201) {
        const movies = this.state.movies.slice().concat(movie);
        this.setState({movies: movies});
      }
    });
  }
  handleChange(e) {
    this.setState({ title: e.target.value });
  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/movies',
    }).then((data) => {
      const movies = this.state.movies.slice().concat(data.movies)
      this.setState({movies: movies})
    })
  }
  render () {
    return (
      <div>
        <label>Title</label>
        <input type="text" onChange={this.handleChange} value={this.state.title} />
        <Rating rating={this.state.rating} onClick={(i) => this.handleClick(i)} />
        <button onClick={this.handleSubmit}>Add Movie</button>
        <Movie movies={this.state.movies}/>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <NewMovie />,
  document.getElementById('root')
);