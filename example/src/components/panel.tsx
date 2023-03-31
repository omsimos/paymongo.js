import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PanelProps {
  children: ReactNode;
}

export const Panel = ({ children }: PanelProps) => {
  return (
    <motion.div
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeIn",
      }}
    >
      {children}
    </motion.div>
  );
};
