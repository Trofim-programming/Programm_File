"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export default function ProjectVisualizer({ activeProject }) {
  const svgRef = useRef()

  useEffect(() => {
    if (activeProject) {
      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove() // Clear previous visualization

      const width = 600
      const height = 400

      const simulation = d3
        .forceSimulation()
        .force(
          "link",
          d3.forceLink().id((d) => d.id),
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))

      const link = svg
        .append("g")
        .selectAll("line")
        .data(activeProject.links)
        .enter()
        .append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(activeProject.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", "#69b3a2")

      simulation.nodes(activeProject.nodes).on("tick", ticked)

      simulation.force("link").links(activeProject.links)

      function ticked() {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y)

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
      }
    }
  }, [activeProject])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Project Visualizer</h2>
      <svg ref={svgRef} width="600" height="400"></svg>
    </div>
  )
}

