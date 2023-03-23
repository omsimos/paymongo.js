import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PanelProps {
  children: ReactNode;
  animation?: "left" | "right";
}

export const Panel = ({ children, animation = "right" }: PanelProps) => {
  return (
    <motion.div
      initial={{ marginLeft: animation === "right" ? -100 : 100, opacity: 0 }}
      animate={{ marginLeft: 0, opacity: 1 }}
      exit={{ marginLeft: animation === "right" ? 100 : -100, opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      {children}
    </motion.div>
  );
};
