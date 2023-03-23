import { type NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "~/components/container";

interface StepProps {
  currentStep: number;
  step: number;
  title: string;
  onClick: () => void;
}

const Step = ({ step, currentStep, title, onClick }: StepProps) => {
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
      className="flex flex-1 items-center gap-2 self-start text-lg"
      onClick={onClick}
    >
      <motion.div
        initial={{
          backgroundColor: "#ffffff",
          color: "#6b7280",
        }}
        animate={{
          backgroundColor: state === "active" ? "#16a34a" : "#ffffff",
          color: state === "active" ? "#ffffff" : "#6b7280",
        }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="rounded-full border p-1"
      >
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
              transition={{ duration: 0.3, ease: "easeIn", delay: 0.15 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </motion.svg>
        ) : (
          <p className="flex h-5 w-5 items-center justify-center text-sm">
            {step}
          </p>
        )}
      </motion.div>

      <h3 className="text-left">{title}</h3>
    </button>
  );
};

const PaymentInformation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      Payment Information
    </motion.div>
  );
};

const BillingDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      Billing Details
    </motion.div>
  );
};

const Summary = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      Summary
    </motion.div>
  );
};

const Payment = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      Payment
    </motion.div>
  );
};

const Home: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const panel = useMemo(() => {
    if (currentStep === 1) {
      return <PaymentInformation key="payment-information-panel" />;
    } else if (currentStep === 2) {
      return <BillingDetails key="billing-details-panel" />;
    } else if (currentStep === 3) {
      return <Summary key="summary-panel" />;
    } else if (currentStep === 4) {
      return <Payment key="payment-panel" />;
    }
  }, [currentStep]);

  return (
    <>
      <Head>
        <title>paymongo.js example</title>
        <meta
          name="description"
          content="Example Next.js application for paymongo.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className="bg-gray-100 py-4">
          <Container>Paymongo.js Example</Container>
        </nav>

        <Container className="my-4">
          <div className="flex items-center">
            <Step
              step={1}
              currentStep={currentStep}
              title="Payment Information"
              onClick={() => setCurrentStep(1)}
            />
            <Step
              step={2}
              currentStep={currentStep}
              title="Billing Details"
              onClick={() => setCurrentStep(2)}
            />
            <Step
              step={3}
              currentStep={currentStep}
              title="Summary"
              onClick={() => setCurrentStep(3)}
            />
            <Step
              step={4}
              currentStep={currentStep}
              title="Payment"
              onClick={() => setCurrentStep(4)}
            />
          </div>

          <div className="mt-4">
            <AnimatePresence mode="sync">{panel}</AnimatePresence>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
