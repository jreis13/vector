"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Button from "../Button"
import arrowBack from "/public/icons/arrowBack.svg"
import NodeGraph from "../NodeGraph"

const EcosystemDetails = ({ ecosystem }) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/ecosystems")
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:px-16 lg:py-16"
      style={{ userSelect: "none" }}
    >
      <h1 className="mb-8 text-center text-4xl font-bold">{ecosystem.name}</h1>
      <p className="mb-8 text-center">{ecosystem.summary}</p>
      <div className="mb-8 flex w-full justify-center">
        <NodeGraph ecosystem={ecosystem} />
      </div>
      <div className="flex justify-center">
        <Button onClick={handleBackClick}>
          <Image src={arrowBack} alt="Back" width={24} height={24} />
        </Button>
      </div>
    </div>
  )
}

export default EcosystemDetails
