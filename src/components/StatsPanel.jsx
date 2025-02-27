import PropTypes from "prop-types";

const StatsPanel = ({
  statsRef,
  timer,
  moves,
  matchedPairs,
  totalPairs,
  formatTime,
}) => {
  return (
    <div
      ref={statsRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-lg shadow-lg px-6 py-3 flex items-center space-x-8 z-50"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center">
        <span className="text-gray-400 mr-2">Time:</span>
        <span className="text-xl font-bold">{formatTime(timer)}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-400 mr-2">Moves:</span>
        <span className="text-xl font-bold">{moves}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-400 mr-2">Pairs:</span>
        <span className="text-xl font-bold">
          {matchedPairs} / {totalPairs}
        </span>
      </div>
    </div>
  );
};

StatsPanel.propTypes = {
  statsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  timer: PropTypes.number.isRequired,
  moves: PropTypes.number.isRequired,
  matchedPairs: PropTypes.number.isRequired,
  totalPairs: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired,
};

export default StatsPanel;
