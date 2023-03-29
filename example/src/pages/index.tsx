import { type NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "~/components/container";
import { Step } from "~/components/step";
import { Panel } from "~/components/panel";
import {
  BillingDetails,
  Payment,
  PaymentInformation,
  Summary,
} from "~/components/panels";

const Home: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const panel = useMemo(() => {
    return (
      <Panel key={`panel-step-${currentStep}`}>
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
            <AnimatePresence mode="wait" initial={false}>
              {panel}
            </AnimatePresence>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex items-center justify-end space-x-2">
            {currentStep > 1 && (
              <button
                className="rounded border px-4 py-1 transition-all active:opacity-50"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            {currentStep < 4 && (
              <button
                className="rounded border bg-green-600 px-4 py-1 text-white transition-all active:opacity-50"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </button>
            )}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
