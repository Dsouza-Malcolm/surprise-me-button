import "./App.css";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SurpriseButton from "./components/SurpriseButton";
import Shape from "./components/Shape";
import CardGame from "./components/CardGame";

const App = () => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showShapes, setShowShapes] = useState(true);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  useGSAP(
    () => {
      if (!showShapes) return;

      gsap.set(".shape", { scale: 0, opacity: 0, display: "none" });
      gsap.set(buttonRef.current, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      if (isClicked) {
        gsap.to(buttonRef.current, {
          top: "80%",
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const centerX = buttonRect.left + buttonRect.width / 2;
            const centerY = buttonRect.top + buttonRect.height / 2;

            const shapes = gsap.utils.toArray(".shape");
            const popoutTimeline = gsap.timeline();

            shapes.forEach((shape, index) => {
              gsap.set(shape, {
                x: centerX,
                y: centerY,
                display: "block",
                opacity: 1,
              });

              popoutTimeline.to(
                shape,
                {
                  x:
                    centerX +
                    (Math.random() * window.innerWidth - window.innerWidth / 2),
                  y: centerY - (Math.random() * 500 + 100),
                  scale: 1,
                  rotation: Math.random() < 0.5 ? 360 : -360,
                  duration: 1.2,
                  ease: "power1.out",
                },
                index * 0.1
              );
            });

            popoutTimeline.eventCallback("onComplete", () => {
              gsap.to([shapes, buttonRef.current], {
                y: window.innerHeight + 1000,
                duration: 2,
                ease: "power2.in",
                overwrite: true,
                onComplete: () => {
                  setGameStarted(true);

                  setShowShapes(false);
                },
              });
            });
          },
        });
      }
    },
    { dependencies: [isClicked], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {showShapes &&
        [...Array(40)].map((_, index) => <Shape key={index} index={index} />)}
      {showShapes && (
        <SurpriseButton ref={buttonRef} onClick={handleButtonClick} />
      )}
      {gameStarted && <CardGame />}
    </div>
  );
};

export default App;
