import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function AirQualityGraph({ data, width = 800, height = 400 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup margins
    const margin = { top: 40, right: 80, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Extract years and metrics for the lines
    const years = data.map(d => d.year);
    const pm10Avg = data.map(d => d.countryPM10Avg);
    const pm25Avg = data.map(d => d.countryPM25Avg);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(years)
      .range([0, innerWidth])
      .padding(0.3);

    // Find max value for y scale
    const maxValue = d3.max([
      d3.max(pm10Avg),
      d3.max(pm25Avg)
    ]) * 1.2; // Add 20% padding on top

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
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
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "middle");

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
      .text("Concentration (µg/m³)");

    // Add bars for PM10
    svg.selectAll(".bar-pm10")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-pm10")
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.countryPM10Avg))
      .attr("width", xScale.bandwidth() / 2 - 2)
      .attr("height", d => innerHeight - yScale(d.countryPM10Avg))
      .attr("fill", "#ff6384");

    // Add bars for PM25
    svg.selectAll(".bar-pm25")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-pm25")
      .attr("x", d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.countryPM25Avg))
      .attr("width", xScale.bandwidth() / 2 - 2)
      .attr("height", d => innerHeight - yScale(d.countryPM25Avg))
      .attr("fill", "#36a2eb");

    // Add values on top of bars for PM10
    svg.selectAll(".value-pm10")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-pm10")
      .attr("x", d => xScale(d.year) + xScale.bandwidth() / 4)
      .attr("y", d => yScale(d.countryPM10Avg) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(d => d.countryPM10Avg.toFixed(1));

    // Add values on top of bars for PM25
    svg.selectAll(".value-pm25")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-pm25")
      .attr("x", d => xScale(d.year) + 3 * xScale.bandwidth() / 4)
      .attr("y", d => yScale(d.countryPM25Avg) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(d => d.countryPM25Avg.toFixed(1));

    // Add graph title
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Air Quality Metrics by Year");

    // Add horizontal threshold lines for WHO guidelines
    // WHO PM10 guideline (20 µg/m³)
    if (maxValue > 20) {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(20))
        .attr("x2", innerWidth)
        .attr("y2", yScale(20))
        .attr("stroke", "#ff9f40")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5");

      svg.append("text")
        .attr("x", 5)
        .attr("y", yScale(20) - 5)
        .attr("text-anchor", "start")
        .style("font-size", "10px")
        .style("fill", "#ff9f40")
        .text("WHO PM10 Guideline");
    }

    // WHO PM2.5 guideline (10 µg/m³)
    if (maxValue > 10) {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(10))
        .attr("x2", innerWidth)
        .attr("y2", yScale(10))
        .attr("stroke", "#4bc0c0")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5");

      svg.append("text")
        .attr("x", 5)
        .attr("y", yScale(10) - 5)
        .attr("text-anchor", "start")
        .style("font-size", "10px")
        .style("fill", "#4bc0c0")
        .text("WHO PM2.5 Guideline");
    }

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${innerWidth + 10}, 0)`);

    // PM10 legend item
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#ff6384");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("PM10 Average")
      .style("font-size", "12px");

    // PM2.5 legend item
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#36a2eb");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 37)
      .text("PM2.5 Average")
      .style("font-size", "12px");

  }, [data, width, height]);

  return (
    <div className="graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default AirQualityGraph;