import { type NextPage } from "next";
import Head from "next/head";
import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "~/components/container";
import { Step } from "~/components/step";
import { Panel } from "~/components/panel";

const PaymentInformation = () => {
  return <div>Payment Information</div>;
};

const BillingDetails = () => {
  return <div>Billing Details</div>;
};

const Summary = () => {
  return <div>Summary</div>;
};

const Payment = () => {
  return <div>Payment</div>;
};

const usePrevValue = <T,>(value: T) => {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Home: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const prevValue = usePrevValue(currentStep);
  const animation = prevValue > currentStep ? "right" : "left";

  const panel = useMemo(() => {
    return (
      <Panel animation={animation} key={`panel-step-${currentStep}`}>
        {currentStep === 1 ? (
          <PaymentInformation key="payment-information-panel" />
        ) : currentStep === 2 ? (
          <BillingDetails key="billing-details-panel" />
        ) : currentStep === 3 ? (
          <Summary key="summary-panel" />
        ) : currentStep === 4 ? (
          <Payment key="payment-panel" />
        ) : null}
      </Panel>
    );
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
            <AnimatePresence mode="wait">{panel}</AnimatePresence>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
