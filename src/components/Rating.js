import React from "react";
import Star from "./Star";

export default class Rating extends React.Component {
  render() {
    const { rating, onClick } = this.props;
    return (
      <div className="board-row">
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={`${n}-star`}
            value={rating >= n ? "X" : ""}
            onClick={() => onClick(n)}
          />
        ))}
      </div>
    );
  }
}
