import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function EmissionGraph({ data, width = 800, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup margins
    const margin = { top: 40, right: 100, bottom: 60, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Group data by element
    const elementGroups = d3.group(data, d => d.element);
    const elements = Array.from(elementGroups.keys());
    
    // Extract years (unique and sorted)
    const years = [...new Set(data.map(d => d.year))].sort();

    // Create scales
    const xScale = d3.scaleBand()
      .domain(years)
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.totalValue) * 1.1])
      .range([innerHeight, 0]);

    // Create a color scale for elements
    const colorScale = d3.scaleOrdinal()
      .domain(elements)
      .range(['#36a2eb', '#ff6384', '#4bc0c0', '#ffcd56', '#9966ff']);

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .style("text-anchor", "middle")
      .text("Year");

    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -80)
      .style("text-anchor", "middle")
      .text("Emission Value");

    // Group by element and year to calculate bar positions
    const nestedData = Array.from(
      d3.rollup(
        data,
        v => ({ totalValue: d3.sum(v, d => d.totalValue) }),
        d => d.year,
        d => d.element
      ),
      ([year, elements]) => ({
        year,
        elements: Array.from(elements, ([element, { totalValue }]) => ({
          element,
          totalValue
        }))
      })
    );

    // Create grouped bars
    const yearGroups = svg.selectAll(".year-group")
      .data(nestedData)
      .enter()
      .append("g")
      .attr("class", "year-group")
      .attr("transform", d => `translate(${xScale(d.year)},0)`);

    // Calculate width of sub-bars
    const elementWidth = xScale.bandwidth() / elements.length;

    // Add bars for each element within each year
    yearGroups.selectAll("rect")
      .data(d => d.elements)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * elementWidth)
      .attr("y", d => yScale(d.totalValue))
      .attr("width", elementWidth)
      .attr("height", d => innerHeight - yScale(d.totalValue))
      .attr("fill", d => colorScale(d.element));

    // Add values on top of bars
    yearGroups.selectAll(".bar-value")
      .data(d => d.elements)
      .enter()
      .append("text")
      .attr("class", "bar-value")
      .attr("x", (d, i) => i * elementWidth + elementWidth / 2)
      .attr("y", d => yScale(d.totalValue) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(d => d.totalValue.toFixed(1));

    // Add graph title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Emission Data by Year and Element");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${innerWidth + 10}, 0)`);

    elements.forEach((element, i) => {
      legend.append("rect")
        .attr("x", 0)
        .attr("y", i * 25)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(element));

      legend.append("text")
        .attr("x", 25)
        .attr("y", i * 25 + 12)
        .text(element)
        .style("font-size", "12px");
    });

  }, [data, width, height]);

  return (
    <div className="graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default EmissionGraph;