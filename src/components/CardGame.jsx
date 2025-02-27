// CardGame.jsx - Main component
import gsap from "gsap";
import Card from "./Card";
import StatsPanel from "./StatsPanel";
import VictoryScreen from "./VictoryScreen";
import { useGameLogic } from "../hooks/useGameLogic";
import { useGameAnimations } from "../hooks/useGameAnimations";

const EMOJIS = ["🎮", "🎲", "🎯", "🎨", "🎬", "🎤", "🎧", "🎸"];
const GRID_SIZE = 4;
const CARD_SIZE = 60;
const SPACING = 10;
const TOTAL_LENGTH = (CARD_SIZE + SPACING) * GRID_SIZE;

const CardGame = () => {
  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    gameActive,
    initialPreview,
    timer,
    gameCompleted,
    generateCards,
    handleCardClick,
    formatTime,
    calculateScore,
    setGameActive,
    setInitialPreview,
    setGameCompleted,
    setMatchedCards,
    setFlippedCards,
    setMoves,
    setTimer,
  } = useGameLogic(EMOJIS);

  const { boxRef, gridRef, statsRef, victoryRef } = useGameAnimations({
    CARD_SIZE,
    TOTAL_LENGTH,
    setInitialPreview,
    setGameActive,
    gameActive,
    matchedCards,
    cards,
  });

  const handlePlayAgain = () => {
    setGameCompleted(false);
    setMatchedCards(new Set());
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setInitialPreview(true);

    gsap.to(victoryRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(".memory-card", {
      y: 0,
      duration: 0.3,
    });

    generateCards();

    const replayTl = gsap.timeline();

    gsap.set(gridRef.current, { opacity: 0 });

    gsap.set(boxRef.current, {
      width: CARD_SIZE,
      height: CARD_SIZE,
      x: window.innerWidth / 2 - CARD_SIZE / 2,
      y: window.innerHeight + 100,
      opacity: 0,
    });

    replayTl.to(boxRef.current, {
      y: window.innerHeight / 2 - CARD_SIZE / 2,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    });

    replayTl.to(boxRef.current, {
      width: TOTAL_LENGTH,
      height: TOTAL_LENGTH,
      x: window.innerWidth / 2 - TOTAL_LENGTH / 2,
      y: window.innerHeight / 2 - TOTAL_LENGTH / 2,
      duration: 0.8,
      ease: "power2.inOut",
    });

    replayTl.to(gridRef.current, {
      opacity: 1,
      duration: 0.5,
    });

    replayTl.call(() => {
      gsap.to(".memory-card", {
        rotationY: 180,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.05,
      });
    });

    replayTl.to(
      boxRef.current,
      {
        width: CARD_SIZE,
        height: CARD_SIZE,
        x: window.innerWidth / 2 - CARD_SIZE / 2,
        y: window.innerHeight / 2 - CARD_SIZE / 2,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.5"
    );

    replayTl.to(boxRef.current, {
      opacity: 0,
      duration: 1,
      y: window.innerHeight + 100,
    });

    replayTl.to({}, { duration: 1 });

    replayTl.call(() => {
      gsap.to(".memory-card", {
        rotationY: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.05,
        onComplete: () => {
          setInitialPreview(false);
          setGameActive(true);
        },
      });
    });
  };

  return (
    <>
      <div
        ref={boxRef}
        className="fixed shadow-glow"
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 30px 10px rgba(255,255,255,0.7)",
          borderRadius: "8px",
          zIndex: 100,
          pointerEvents: "none",
        }}
      />

      <StatsPanel
        statsRef={statsRef}
        timer={timer}
        moves={moves}
        matchedPairs={matchedCards.size / 2}
        totalPairs={EMOJIS.length}
        formatTime={formatTime}
      />

      {gameCompleted && (
        <VictoryScreen
          victoryRef={victoryRef}
          timer={timer}
          moves={moves}
          matchedPairs={matchedCards.size / 2}
          score={calculateScore()}
          formatTime={formatTime}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <div
        ref={gridRef}
        className="grid grid-cols-4 gap-2.5 select-none"
        style={{ width: `${(CARD_SIZE + SPACING) * GRID_SIZE}px` }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            cardSize={CARD_SIZE}
            isFlipped={
              flippedCards.includes(card.id) ||
              matchedCards.has(card.id) ||
              initialPreview
            }
            isMatched={matchedCards.has(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </>
  );
};

export default CardGame;
