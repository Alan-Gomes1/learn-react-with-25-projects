import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./styles.css";

export default function StarRating({numOfStar = 5}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(idx: number) {
    setRating(idx);
  }

  function handleMouseEnter(idx: number) {
    setHover(idx);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="star-rating">
      {[...Array(numOfStar)].map((_, idx) => {
        idx += 1;

        return (
          <FaStar
            key={idx}
            className={idx <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(idx)}
            onMouseMove={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave()}
            size={100}
          />
        );
      })}
    </div>
  );
}
