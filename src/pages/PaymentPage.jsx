import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { Cardd } from "../components/Cardd";
import { CardContent } from "../components/CardContent";

export default function PaymentPage() {
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mobile"); // "mobile" or "card"
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <>
      <Cardd className="max-w-md mx-auto mt-10  p-6 shadow-lg rounded-2xl">
        <CardContent>
          {/* Header */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">ampomahkeziah@gmail.com</p>
            <p className="text-xl font-bold mt-2">Pay GHS 3,886.07</p>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <p className="font-semibold mb-2">PAY WITH</p>
            <div className="flex gap-4">
              <button
                className={`flex items-center gap-2 font-medium pb-1 ${
                  paymentMethod === "mobile"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setPaymentMethod("mobile")}
                type="button"
              >
                <span>📱</span> Mobile Money
              </button>
              <button
                className={`flex items-center gap-2 font-medium pb-1 ${
                  paymentMethod === "card"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setPaymentMethod("card")}
                type="button"
              >
                💳 Card
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {paymentMethod === "mobile" ? (
              <>
                <div>
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Provider</label>
                  <div className="relative">
                    <select
                      className="w-full border rounded-md px-3 py-2"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      <option value="">Select Provider</option>
                      <option value="mtn">MTN</option>
                      <option value="vodafone">Vodafone</option>
                      <option value="airteltigo">AirtelTigo</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">CVV</label>
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </>
            )}

            <button className="w-full bg-green-600 hover:bg-green-700 rounded-2xl py-2 text-white">
              Confirm
            </button>
            <div className="mt-8">
                <h2> <Lock className="inline-block w-5 h-5 font-bold text-blue-700" /> Secured by <span className="font-bold text-blue-700">Paystack</span></h2>
            </div>
          </div>
        </CardContent>
      </Cardd>
    </>
  );
}