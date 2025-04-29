import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ImTextColor } from "react-icons/im";

export default function Preloader() {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoded, setIsLoded] = useState(false);

  const text = 'Noto'
  const letterColors = ['#DDA94B', '#A4193D', '#07553B', '#02343F']

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoded(false);
    });

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200);

    return () => clearTimeout(timer);
  });
  return (
    showLoader && (
      <div className={`preloader-wrap ${isLoded === true ? "loaded" : ""}`}>
        <h1
          className="header-title text-center text-5xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
        >
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.2 }}
            >
              <span style={{ color: letterColors[index] }}>
                {letter}
              </span>
            </motion.span>
          ))}
        </h1>
      </div>
    )
  );
}