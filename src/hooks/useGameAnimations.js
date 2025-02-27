import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useGameAnimations = ({
  CARD_SIZE,
  TOTAL_LENGTH,
  setInitialPreview,
  setGameActive,
  gameActive,
  matchedCards,
  cards,
}) => {
  const boxRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const victoryRef = useRef(null);

  useEffect(() => {
    if (gameActive) {
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [gameActive]);

  useEffect(() => {
    if (matchedCards.size === cards.length && cards.length > 0 && gameActive) {
      gsap.fromTo(
        victoryRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }
  }, [matchedCards, cards, gameActive]);

  useGSAP(
    () => {
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(statsRef.current, { opacity: 0, y: -20 });
      gsap.set(victoryRef.current, { opacity: 0 });

      gsap.set(boxRef.current, {
        width: CARD_SIZE,
        height: CARD_SIZE,
        x: window.innerWidth / 2 - CARD_SIZE / 2,
        y: window.innerHeight + 100,
        opacity: 0,
      });

      gsap.set(gridRef.current, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline();

      tl.to(boxRef.current, {
        y: window.innerHeight / 2 - CARD_SIZE / 2,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });

      tl.to(boxRef.current, {
        width: TOTAL_LENGTH,
        height: TOTAL_LENGTH,
        x: window.innerWidth / 2 - TOTAL_LENGTH / 2,
        y: window.innerHeight / 2 - TOTAL_LENGTH / 2,
        duration: 0.8,
        ease: "power2.inOut",
      });

      tl.to(gridRef.current, {
        opacity: 1,
        duration: 0.5,
      });

      tl.call(() => {
        gsap.to(".memory-card", {
          rotationY: 180,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: 0.05,
        });
      });

      tl.to(
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

      tl.to(boxRef.current, {
        opacity: 0,
        duration: 1,
        y: window.innerHeight + 100,
      });

      tl.to({}, { duration: 1 });

      tl.call(() => {
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
    },
    {
      scope: gridRef,
    }
  );

  return { boxRef, gridRef, statsRef, victoryRef };
};
