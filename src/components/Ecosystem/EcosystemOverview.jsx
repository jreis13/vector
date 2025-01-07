"use client"

import { useState } from "react"
import flattenNodes from "../../common/utils/flattenNodes.js"
import NodeDetails from "../NodeDetails"
import NodeGraph from "../NodeGraph"
import Note from "../Note.jsx"

export default function EcosystemOverview({ ecosystem }) {
  const flattenedNodes = flattenNodes(ecosystem.nodes)
  const [showNote, setshowNote] = useState(true)

  return (
    <div>
      {showNote && (
        <div className="flex justify-center mb-4">
          <Note onDismiss={() => setshowNote(false)}>
            Nodes are interactive. Click on a node to zoom in and show details.
          </Note>
        </div>
      )}

      <NodeGraph ecosystem={ecosystem} />
      <NodeDetails ecosystem={ecosystem} nodes={flattenedNodes} />
    </div>
  )
}
