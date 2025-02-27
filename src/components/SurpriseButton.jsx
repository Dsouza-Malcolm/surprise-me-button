import PropTypes from "prop-types";
import { forwardRef } from "react";

const SurpriseButton = forwardRef(function SurpriseBtn({ onClick }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      id="surprise-btn"
      className="text-white text-2xl rounded-lg px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600"
    >
      Surprise me!
    </button>
  );
});

SurpriseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SurpriseButton;
