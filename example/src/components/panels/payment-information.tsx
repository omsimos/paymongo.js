import { useStore } from "~/lib/store";

export const PaymentInformation = () => {
  const { paymentMethod, setStore } = useStore();

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-xl font-semibold text-gray-600">Sample payment </p>
        <div className="flex items-start">
          <span className="mr-2 mt-1 text-xl">₱</span>
          <p className="text-6xl font-thin tracking-wider">100.00</p>
        </div>
        <p className="text-green-600">Amount to Pay</p>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-green-600">
        Select Payment Method
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <button
          className={`flex items-center overflow-hidden rounded-md border transition-all hover:border-green-600 ${
            paymentMethod === "gcash" ? "border-green-600" : "border-gray-300"
          }`}
          onClick={() => setStore("paymentMethod", "gcash")}
        >
          <img
            src="/assets/gcash.png"
            className="h-20 w-20 border-r border-gray-300"
          />
          <p className="mx-4 font-semibold">GCash</p>
        </button>

        <button
          className={`flex items-center overflow-hidden rounded-md border transition-all hover:border-green-600 ${
            paymentMethod === "grab_pay"
              ? "border-green-600"
              : "border-gray-300"
          }`}
          onClick={() => setStore("paymentMethod", "grab_pay")}
        >
          <img
            src="/assets/grabpay.png"
            className="h-20 w-20 border-r border-gray-300"
          />
          <p className="mx-4 font-semibold">GrabPay</p>
        </button>

        <button
          className={`flex items-center overflow-hidden rounded-md border transition-all hover:border-green-600 ${
            paymentMethod === "paymaya" ? "border-green-600" : "border-gray-300"
          }`}
          onClick={() => setStore("paymentMethod", "paymaya")}
        >
          <img
            src="/assets/maya.svg"
            className="h-20 w-20 border-r border-gray-300 bg-black"
          />
          <p className="mx-4 font-semibold">Maya</p>
        </button>

        <button
          className={`flex items-center overflow-hidden rounded-md border transition-all hover:border-green-600 ${
            paymentMethod === "dob" ? "border-green-600" : "border-gray-300"
          }`}
          onClick={() => setStore("paymentMethod", "dob")}
        >
          <img
            src="/assets/bank.png"
            className="h-20 w-20 border-r border-gray-300"
          />
          <p className="mx-4 font-semibold">BPI Online</p>
        </button>
      </div>
    </div>
  );
};
