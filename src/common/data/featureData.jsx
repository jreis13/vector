import customizeIcon from "/public/icons/customizeIcon.svg"
import dataIcon from "/public/icons/dataIcon.svg"
import goalsIcon from "/public/icons/goalsIcon.svg"
import interactiveIcon from "/public/icons/interactiveIcon.svg"
import predictiveIcon from "/public/icons/predictiveIcon.svg"
import textIcon from "/public/icons/textIcon.svg"
import trashIcon from "/public/icons/trashIcon.svg"
import offeringIcon from "/public/icons/workIcon.svg"

export const questionFeatures = [
  {
    name: "Are you tired of text-intensive insights?",
    image: textIcon,
  },
  {
    name: "Are you tired of recycled gibberish?",
    image: trashIcon,
  },
  {
    name: "Do you think quality research should be accessible and customizable to your needs?",
    image: customizeIcon,
  },
]

export const evtolFeatures = [
  {
    name: "Support your Market Strategies With Data",
    description:
      "Uncover actionable insights on market demand, regulatory landscapes, and competitor positioning to craft a winning strategy.",
    image: dataIcon,
  },
  {
    name: "Predictive Analytics for Market Readiness",
    description:
      " Utilize advanced forecasting tools to identify key opportunities, mitigate risks, and align your go-to-market approach with industry trends.",
    image: predictiveIcon,
  },
  {
    name: "Interactive Platform for Agile Execution",
    description:
      " Our intuitive platform simplifies data visualization, enabling you to adapt quickly to market dynamics, optimize strategies, and ensure seamless execution.",
    image: interactiveIcon,
  },
]

export const offeringFeatures = [
  {
    description: (
      <div>
        <p>
          We tailor our research to{" "}
          <span className="font-semibold">
            {" "}
            support disruptive business ecosystems
          </span>
          , providing
          <span className="font-semibold">
            {" "}
            visibility and actionable insights
          </span>{" "}
          to key stakeholders.
        </p>
      </div>
    ),
  },
  {
    description: (
      <div>
        <p>
          Designed to{" "}
          <span className="font-semibold">
            save countless hours of research
          </span>
          , our platform makes complex information
          <span className="font-semibold"> clear and easily digestible</span> by
          prioritizing
          <span className="font-semibold">
            {" "}
            interactive visual insights over lengthy text
          </span>
          . This approach helps stakeholders
          <span className="font-semibold">
            {" "}
            quickly understand their role, gain key insights, and navigate the
            industry with ease
          </span>
          .
        </p>
      </div>
    ),
  },
  {
    description: (
      <div>
        <p>
          Our <span className="font-semibold">platform</span> provides{" "}
          <span className="font-semibold">
            detailed company intelligence, market-ready country reports, and
            competitive benchmarking
          </span>
          . For our AAM market ecosystem, we track{" "}
          <span className="font-semibold">
            eVTOL manufacturers, active investors, infrastructure projects, and
            regulatory developments
          </span>
          , offering a{" "}
          <span className="font-semibold">
            clear roadmap for strategic decision-making
          </span>
          .
        </p>
      </div>
    ),
  },
  {
    description: (
      <div>
        <p>
          <span className="font-semibold">
            Are you ready to transform your decision-making
          </span>
          ?
          <br />
          Get in touch today.
        </p>
      </div>
    ),
  },
  {
    sectionImage: offeringIcon,
  },
]

export const customersFeatures = [
  {
    name: "Innovation Enthusiasts",
    description:
      "Whatever your role in society, if you are excited about what’s coming next, and want to be part of it, you will surely enjoy our research.",
  },
  {
    name: "Investors",
    description:
      "Investors seeking to quickly grasp market dynamics and stakeholder influence rely on clarity. Since time is valuable, we prioritize clear visuals over lengthy text.",
  },
  {
    name: "Start-ups, Scaleups, and Enterprises",
    description:
      "Our products offer an excellent way for you to analyze competitors and enhance your understanding of market trends and industry dynamics.",
  },
  {
    name: "Organizations and Government Officials",
    description:
      "Our products offer an excellent way for you to analyze competitors and enhance your understanding of market trends and industry dynamics.",
  },
]

export const goalsFeatures = [
  {
    description:
      "As we grow and scale, we want to expand coverage over all disruptive business ecosystems and ensure that we can provide a platform capable of generating relevant insights and actions for our users. Your feedback is critical for our growth and we hope that you will help us shape our product to fulfill your needs.",
  },
  {
    sectionImage: goalsIcon,
  },
]
