import { useState } from "react";
import "./Card.css";

function Card({ card }) {
  function randomCords() {
    this.x = Math.random() * 25;
    this.y = Math.random() * 25;
    this.angle = Math.random() * 360 - 180;
  }

  const [pos, setPos] = useState(new randomCords());
  const style = {
    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.angle}deg)`,
  };
  return <img className="Card" style={style} src={card.images.png} />;
}

export default Card;
