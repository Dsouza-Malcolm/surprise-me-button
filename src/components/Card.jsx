import PropTypes from "prop-types";

const Card = ({ card, cardSize, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`memory-card flex items-center justify-center text-2xl cursor-pointer card-${card.id}`}
      onClick={onClick}
      style={{
        width: `${cardSize}px`,
        height: `${cardSize}px`,
        background: "#333",
        borderRadius: "8px",
        transformStyle: "preserve-3d",
        transition: "transform 0.6s",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center backface-hidden"
        style={{
          backgroundColor: "#333",
          borderRadius: "8px",
          backfaceVisibility: "hidden",
        }}
      ></div>
      <div
        className="absolute inset-0 flex items-center justify-center backface-hidden card-front"
        style={{
          backgroundColor: isMatched ? "#ddd" : "white",
          opacity: isMatched ? 0.5 : 1,
          borderRadius: "8px",
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        {card.emoji}
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  cardSize: PropTypes.number.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
