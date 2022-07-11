export default function observeResize(node: Element) {
  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries.at(0)
    if (!entry) return

    const rect = entry.contentRect

    const resizeEvent = new CustomEvent('resize-observed', { detail: rect })
    node.dispatchEvent(resizeEvent)
  })

  resizeObserver.observe(node)

  return {
    destroy() {
      resizeObserver.unobserve(node)
    },
  }
}
