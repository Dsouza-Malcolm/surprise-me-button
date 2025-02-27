import PropTypes from "prop-types";

const VictoryScreen = ({
  victoryRef,
  timer,
  moves,
  matchedPairs,
  score,
  formatTime,
  onPlayAgain,
}) => {
  return (
    <div
      ref={victoryRef}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Victory!</h2>
          <p className="text-gray-600 mb-6">You matched all the pairs!</p>

          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-y-4 text-left">
              <div className="text-gray-600">Time:</div>
              <div className="text-right font-medium">{formatTime(timer)}</div>

              <div className="text-gray-600">Moves:</div>
              <div className="text-right font-medium">{moves}</div>

              <div className="text-gray-600">Pairs Found:</div>
              <div className="text-right font-medium">{matchedPairs}</div>

              <div className="text-gray-800 font-bold text-lg pt-2 border-t">
                Final Score:
              </div>
              <div className="text-right font-bold text-2xl text-indigo-600 pt-2 border-t">
                {score}
              </div>
            </div>
          </div>

          <button
            onClick={onPlayAgain}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-bold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

VictoryScreen.propTypes = {
  victoryRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  timer: PropTypes.number.isRequired,
  moves: PropTypes.number.isRequired,
  matchedPairs: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

export default VictoryScreen;
