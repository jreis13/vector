"use client"

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useState } from "react"

export default function NodeDetails({ nodeGroup }) {
  const [breadcrumbs, setBreadcrumbs] = useState([nodeGroup])

  const currentNode = breadcrumbs[breadcrumbs.length - 1]
  const getSubnodes = (node) => node.subnodes || node.nodes || []

  const handleNodeClick = (node) => {
    setBreadcrumbs((prev) => [...prev, node])
  }

  const handleBreadcrumbClick = (breadcrumbIndex) => {
    setBreadcrumbs((prev) => prev.slice(0, breadcrumbIndex + 1))
  }

  return (
    <div className="mt-16 px-16">
      <div className="flex items-center mb-4 text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <motion.span
            key={breadcrumb.name}
            className={`cursor-pointer ${
              index === breadcrumbs.length - 1
                ? "font-bold text-lg"
                : "text-gray-400"
            }`}
            onClick={() => handleBreadcrumbClick(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {breadcrumb.name}
            {index < breadcrumbs.length - 1 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="mx-2 text-gray-400"
              />
            )}
          </motion.span>
        ))}
      </div>

      <motion.div
        key={currentNode.name}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <p className="text-gray-400 mt-2">{currentNode.data}</p>
      </motion.div>

      <div className="w-full grid gap-4 mt-8">
        {getSubnodes(currentNode).map((subnode) => (
          <motion.div
            key={subnode.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center py-4 px-6 cursor-pointer"
            onClick={() => handleNodeClick(subnode)}
          >
            <span className="font-bold">{subnode.name}</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
