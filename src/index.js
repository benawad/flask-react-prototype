import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Form, Input, Rating } from "semantic-ui-react";
import { Movies } from "./components/Movies";

const NewMovie = () => {
  const [rating, setRating] = React.useState(1);
  const [title, setTitle] = React.useState("");
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch("/movies").then(response =>
      response.json().then(data => {
        setMovies(movies => [...movies, ...data.movies]);
      })
    );
  }, []);

  return (
    <Container style={{ marginTop: 40 }}>
      <Form>
        <Form.Field>
          <Input
            placeholder="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </Form.Field>
        <Form.Field>
          <Rating
            icon="star"
            rating={rating}
            maxRating={5}
            onRate={(_, data) => setRating(data.rating)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={async () => {
              const movie = { title, rating };
              const response = await fetch(`/add_movie`, {
                method: "POST",
                body: JSON.stringify(movie),
                headers: {
                  "Content-Type": "application/json"
                }
              });
              if (response.status === 201) {
                setMovies(movies => [...movies, movie]);
              }
              setTitle("");
              setRating(1);
            }}
          >
            Add Movie
          </Button>
        </Form.Field>
      </Form>
      <Movies movies={movies} />
    </Container>
  );
};

ReactDOM.render(<NewMovie />, document.getElementById("root"));
