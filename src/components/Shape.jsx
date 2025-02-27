import { Circle, Square, Triangle } from "lucide-react";
import PropTypes from "prop-types";

const COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A6",
  "#FFC733",
  "#8D33FF",
];
const SHAPES = [Circle, Square, Triangle];

const Shape = ({ index }) => {
  const size = Math.floor(Math.random() * 80 + 20);
  const isOutline = Math.random() > 0.8;
  const ShapeComponent = SHAPES[index % SHAPES.length];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  return (
    <div className="shape absolute w-16 h-16">
      <ShapeComponent
        size={size}
        color={color}
        strokeWidth={isOutline ? 3 : 0}
        fill={isOutline ? "none" : color}
      />
    </div>
  );
};

Shape.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Shape;
