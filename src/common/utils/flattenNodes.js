export default function flattenNodes(nodes, parentTitle = null) {
  const flatNodes = []

  nodes.forEach((node) => {
    flatNodes.push({
      name: node.name,
      title: node.title || parentTitle,
      data: node.data || "No description available.",
    })

    if (node.subnodes && node.subnodes.length > 0) {
      flatNodes.push(...flattenNodes(node.subnodes, node.title))
    }
  })

  return flatNodes
}
