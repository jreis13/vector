"use client"

import { faCcStripe } from "@fortawesome/free-brands-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../Button"

export default function ReportForm({
  subscriber,
  setSubscriber,
  ecosystemsOptions,
  emailWarning,
  handleChange,
  handleEcosystemChange,
  isChecked,
  setIsChecked,
  handlePurchase,
}) {
  return (
    <div className="mt-20 w-full">
      <h2 className="text-4xl font-bold">Access the Paid Report</h2>
      <p className="m-4">Complete your details to gain access to the report.</p>

      <div className="grid gap-4 grid-cols-2">
        <input
          type="text"
          value={subscriber.firstName}
          placeholder="First Name"
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          value={subscriber.lastName}
          placeholder="Last Name"
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
        />
      </div>
      <input
        type="email"
        value={subscriber.email}
        placeholder="Email"
        onChange={(e) => handleChange("email", e.target.value)}
        className="mt-4 w-full rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
      />
      {emailWarning && (
        <p className="text-red-500 text-sm mt-1">{emailWarning}</p>
      )}
      <div className="mt-4 grid gap-4 grid-cols-2">
        <input
          type="text"
          value={subscriber.companyName}
          placeholder="Company"
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          value={subscriber.position}
          placeholder="Position"
          onChange={(e) => handleChange("position", e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 focus:outline-none"
        />
      </div>

      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          <select
            value={subscriber.persona}
            onChange={(e) => handleChange("persona", e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 outline-none"
          >
            <option value="">Select Persona</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Supplier">Supplier</option>
            <option value="Edifice">Edifice</option>
            <option value="Investor">Investor</option>
            <option value="Government official">Government Official</option>
            <option value="Enthusiast">Enthusiast</option>
            <option value="Other">Other</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none"
          />
        </div>

        <div>
          <select
            value={subscriber.ecosystems[0] || ""}
            onChange={(e) => handleChange("ecosystems", [e.target.value])}
            className="w-full appearance-none rounded-lg border border-gray-600 bg-[#34333d] px-4 py-2 outline-none"
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none"
          />
        </div>
      </div>

      <div className="mt-6 text-lg">
        <p>
          Total Price: <span className="font-semibold">€450</span>
        </p>
        <p className="text-sm text-gray-400">
          Includes life-time access to the current version of the report.
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 mb-4 mt-4">
        <input
          type="checkbox"
          id="reportTerms"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="h-5 w-5 cursor-pointer"
        />
        <label htmlFor="reportTerms" className="text-sm text-gray-300">
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
        onClick={handlePurchase}
        disabled={!isChecked}
        className="mt-6 bg-[#34333d] rounded-lg px-4 py-2 focus:outline-none"
      >
        <span className="flex items-center gap-2">
          Purchase with
          <FontAwesomeIcon
            className="text-3xl text-[#e8e8e8]"
            aria-hidden="true"
            icon={faCcStripe}
          />
        </span>
      </Button>
    </div>
  )
}
