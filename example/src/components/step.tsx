import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface StepProps {
  currentStep: number;
  step: number;
  title: string;
  onClick: () => void;
}

export const Step = ({ step, currentStep, title, onClick }: StepProps) => {
  const state = useMemo(() => {
    if (step < currentStep) {
      return "done";
    } else if (step === currentStep) {
      return "active";
    } else {
      return "inactive";
    }
  }, [step, currentStep]);

  return (
    <button
      className="flex flex-1 items-center self-start text-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: state === "active" ? "#16a34a" : "#ffffff",
            color: state === "active" ? "#ffffff" : "#6b7280",
          }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="rounded-full border border-gray-400 p-1"
        >
          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.svg
                key="status-payment-information"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </motion.svg>
            ) : (
              <motion.p
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-5 w-5 items-center justify-center text-sm"
              >
                {step}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h3
          initial={false}
          animate={{ color: state === "active" ? "#000000" : "#6b7280" }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-left"
        >
          {title}
        </motion.h3>
      </div>

      <motion.div
        initial={false}
        animate={{
          backgroundColor: state === "active" ? "#16a34a" : "#9ca3af",
        }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="mx-2 h-px flex-1"
      />
    </button>
  );
};
