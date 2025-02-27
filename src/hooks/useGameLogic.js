import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const useGameLogic = (EMOJIS) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [initialPreview, setInitialPreview] = useState(true);
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    generateCards();
  }, []);

  useEffect(() => {
    if (gameActive) {
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameActive]);

  useEffect(() => {
    if (matchedCards.size === cards.length && cards.length > 0 && gameActive) {
      clearInterval(timerRef.current);
      setGameActive(false);
      setGameCompleted(true);

      gsap.to(".memory-card", {
        y: "-=10",
        duration: 0.3,
        stagger: 0.05,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [matchedCards, cards, gameActive]);

  const generateCards = () => {
    const shuffled = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    const newCards = shuffled.map((emoji, id) => ({
      id,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
  };

  const handleCardClick = (id) => {
    if (!gameActive || flippedCards.length === 2 || matchedCards.has(id))
      return;

    setFlippedCards((prev) => [...prev, id]);
    setMoves((prev) => prev + 1);

    if (flippedCards.length === 1) {
      const [firstId] = flippedCards;
      if (cards[firstId].emoji === cards[id].emoji) {
        setMatchedCards((prev) => new Set([...prev, firstId, id]));

        setTimeout(() => {
          gsap.to(`.card-${firstId} .card-front, .card-${id} .card-front`, {
            backgroundColor: "#f0f0f0",
            opacity: 0.7,
            duration: 0.3,
          });
        }, 300);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateScore = () => {
    const baseScore = 1000;

    const timePenalty = timer * 2;

    const movesPenalty = moves * 10;

    const finalScore = Math.max(0, baseScore - timePenalty - movesPenalty);

    return Math.round(finalScore);
  };

  return {
    cards,
    flippedCards,
    matchedCards,
    moves,
    gameActive,
    initialPreview,
    timer,
    gameCompleted,
    timerRef,
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
  };
};
