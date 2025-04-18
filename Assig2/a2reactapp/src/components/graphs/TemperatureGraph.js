import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function TemperatureGraph({ data, width = 800, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup margins
    const margin = { top: 30, right: 80, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Extract years and values for the main line (country temperature)
    const years = data.map(d => d.theCountryTempData.year);
    const values = data.map(d => d.theCountryTempData.value);
    const regionalAvg = data.map(d => d.regionalAvg);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(years), d3.max(years)])
      .range([0, innerWidth]);

    // Find min and max values including regional data
    const allValues = [
      ...values,
      ...regionalAvg.filter(val => val !== null)
    ];
    
    const yScale = d3.scaleLinear()
      .domain([d3.min(allValues) - 0.5, d3.max(allValues) + 0.5])
      .range([innerHeight, 0]);

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .tickFormat(d3.format("d")) // Format as integer years
        .ticks(Math.min(data.length, 10))) // Adjust number of ticks based on data points
      .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .style("text-anchor", "middle")
      .text("Year");

    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .style("text-anchor", "middle")
      .text("Temperature (°C)");

    // Create line generator for country data
    const line = d3.line()
      .x((d, i) => xScale(years[i]))
      .y((d, i) => yScale(values[i]))
      .curve(d3.curveMonotoneX); // Smoothed curve

    // Create line generator for regional average
    const lineRegionalAvg = d3.line()
      .defined((d, i) => regionalAvg[i] !== null)
      .x((d, i) => xScale(years[i]))
      .y((d, i) => yScale(regionalAvg[i]))
      .curve(d3.curveMonotoneX);

    // Add country temperature line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ff6384")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add regional average line if it has data
    if (regionalAvg.some(val => val !== null)) {
      svg.append("path")
        .datum(data.filter((d, i) => regionalAvg[i] !== null))
        .attr("fill", "none")
        .attr("stroke", "#36a2eb")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("d", lineRegionalAvg);
    }

    // Add dots for each data point
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => xScale(years[i]))
      .attr("cy", (d, i) => yScale(values[i]))
      .attr("r", 5)
      .attr("fill", "#ff6384");

    // Add dots for regional average
    svg.selectAll(".dot-regional")
      .data(data.filter((d, i) => regionalAvg[i] !== null))
      .enter()
      .append("circle")
      .attr("class", "dot-regional")
      .attr("cx", (d, i) => xScale(years[i]))
      .attr("cy", (d, i) => yScale(regionalAvg[i]))
      .attr("r", 4)
      .attr("fill", "#36a2eb");

    // Add graph title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Temperature Change Over Time");
      
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${innerWidth + 10}, 0)`);
      
    // Country legend item
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#ff6384");
      
    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("Country Temperature")
      .style("font-size", "12px");
      
    // Regional average legend item
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#36a2eb");
      
    legend.append("text")
      .attr("x", 20)
      .attr("y", 37)
      .text("Regional Average")
      .style("font-size", "12px");

  }, [data, width, height]);

  return (
    <div className="graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default TemperatureGraph;