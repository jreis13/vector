"use client"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import {
  faChevronDown,
  faCircleXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import Button from "../Button"

export default function SubscriptionForm({
  subscribers,
  setSubscribers,
  ecosystemsOptions,
  emailWarnings,
  handleChange,
  handleAddSubscriber,
  handleEcosystemChange,
  handleRemoveSubscriber,
  isChecked,
  setIsChecked,
  containsRestrictedEmail,
  error,
  calculateTotalPrice,
  handleSubscribe,
}) {
  return (
    <div className="mt-20 w-full">
      <h2 className="text-4xl font-bold">Subscribe to Exponential Vector</h2>
      <p className="mt-4">Complete your subscription to access the platform.</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-6 w-full">
        <AnimatePresence>
          {subscribers.map((subscriber, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 px-4"
            >
              <div className="grid gap-4 grid-cols-2">
                <input
                  type="text"
                  value={subscriber.firstName}
                  placeholder="First Name"
                  onChange={(e) =>
                    handleChange(index, "firstName", e.target.value)
                  }
                  className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                />
                <input
                  type="text"
                  value={subscriber.lastName}
                  placeholder="Last Name"
                  onChange={(e) =>
                    handleChange(index, "lastName", e.target.value)
                  }
                  className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                />
              </div>
              <input
                type="email"
                value={subscriber.email}
                placeholder="Email"
                onChange={(e) => handleChange(index, "email", e.target.value)}
                className="mt-4 w-full rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
              />
              {emailWarnings[index] && (
                <p className="text-red-500 text-sm mt-1">
                  {emailWarnings[index]}
                </p>
              )}
              <div className="mt-4 grid gap-4 grid-cols-2">
                <input
                  type="text"
                  value={subscriber.companyName}
                  placeholder="Company"
                  onChange={(e) =>
                    handleChange(index, "companyName", e.target.value)
                  }
                  className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
                />
                <div className="relative w-full">
                  <select
                    value={subscriber.persona}
                    onChange={(e) =>
                      handleChange(index, "persona", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 text[#e8e8e8] outline-none focus:ring-0 focus:border-gray-600 hover:bg-[#34333d] hover:border-gray-600"
                  >
                    <option value="">Select Persona</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Edifice">Edifice</option>
                    <option value="Investor">Investor</option>
                    <option value="Government official">
                      Government Official
                    </option>
                    <option value="Enthusiast">Enthusiast</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text[#e8e8e8] text-sm pointer-events-none"
                  />
                </div>
              </div>
              <div className="mt-4 relative w-full">
                <select
                  value={subscriber.ecosystems[0] || ""}
                  onChange={(e) =>
                    handleChange(index, "ecosystems", [e.target.value])
                  }
                  className="w-full appearance-none rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 text[#e8e8e8] outline-none focus:ring-0 focus:border-gray-600 hover:bg-[#34333d] hover:border-gray-600"
                >
                  <option value="">Select Ecosystem</option>
                  {ecosystemsOptions.map((eco) => (
                    <option key={eco.id} value={eco.id}>
                      {eco.name}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text[#e8e8e8] text-sm pointer-events-none"
                />
              </div>
              <div className="flex items-center justify-end mt-4 space-x-4">
                {subscribers.length > 1 && (
                  <button
                    onClick={() => handleRemoveSubscriber(index)}
                    className="text-red-500"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                )}
                {subscribers.length < 5 && index === subscribers.length - 1 && (
                  <button
                    onClick={handleAddSubscriber}
                    className="text-[#e8e8e8]"
                  >
                    <span className="flex items-center gap-2">
                      Add another user <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="mb-4">
          <div className="flex items-center justify-center gap-4">
            <p className="text-lg">
              Monthly Price:{" "}
              <span className="font-semibold">
                €{(calculateTotalPrice() / 12).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 font-semibold">*</span>
            </p>
            <span className="text-gray-400">|</span>
            <p className="text-lg">
              Total Price:{" "}
              <span className="font-semibold">€{calculateTotalPrice()}</span>
            </p>
          </div>
          <p className="text-sm text-gray-400">
            (Prices displayed don’t include VAT or additional fees.)
          </p>
          <p className="text-sm text-gray-400">
            *Each license requires a minimum commitment of 12 months.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-5 w-5 cursor-pointer"
          />
          <label htmlFor="termsCheckbox" className="text-sm text-gray-300">
            I have read and agree to Exponential Vector&apos;s{" "}
            <a
              href="/files/Privacy_Policy_Exponential_Vector.pdf"
              target="_blank"
              className="underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/files/Terms_and_Conditions_Exponential_Vector.pdf"
              target="_blank"
              className="underline"
            >
              Terms and Conditions
            </a>
            .
          </label>
        </div>

        <Button
          onClick={handleSubscribe}
          disabled={!isChecked || containsRestrictedEmail}
          className="mt-6 bg-[#34333d] rounded-lg px-4 py-2 focus:outline-none"
        >
          <span className="flex items-center gap-2">
            Subscribe with{" "}
            <FontAwesomeIcon className="text-3xl" icon={faCcStripe} />
          </span>
        </Button>
      </div>
    </div>
  )
}
