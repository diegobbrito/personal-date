import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DirectionCardButton } from "../Buttons/DirectionCardButton";


function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["bonito", "especial", "expressivo", "legal", "caprichoso", "ideal"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
      <div className="flex gap-4 flex-col">
        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-white text-center font-regular">
          <span>Faça um convite</span>
          <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-semibold" 
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? {
                        y: 0,
                        opacity: 1,
                      }
                    : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
          <span>para alguém</span>
        </h1>
        
      </div>
   
      <div className="flex justify-center items-center mt-6 w-full">
        <DirectionCardButton />
      </div>
     
      <div className="flex flex-row gap-3"></div>
    </div>
  );
}

export default Hero;