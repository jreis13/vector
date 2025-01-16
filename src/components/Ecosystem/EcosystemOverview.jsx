"use client"

import flattenNodes from "../../common/utils/flattenNodes.js"
import NodeDetails from "../NodeDetails"
import NodeGraph from "../NodeGraph"

export default function EcosystemOverview({ ecosystem }) {
  const flattenedNodes = flattenNodes(ecosystem.nodes)

  return (
    <div>
      <NodeGraph ecosystem={ecosystem} />
      <NodeDetails ecosystem={ecosystem} nodes={flattenedNodes} />
    </div>
  )
}
