import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../data/mig_rate.csv';

// RENDERING SETTING
const NT = ['GTM', 'HND', 'SLV'];
const RED = { REGULAR: '#f8ad96', SELECT: '#eb5832' };
const GRAY = { REGULAR: '#f0f0f0', SELECT: '#bcbcbc' };

const MapChart = () => {
  // svg
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const svg = d3
    .select(svgRef.current)
    .attr('viewBox', '0 0 900 500')
    .attr('preserveAspectRatio', 'xMinYMin meet');
  const tooltip = d3.select(tooltipRef.current);

  // load data
  const [data, setData] = useState([]);
  const [migData, setMigData] = useState([]);
  useEffect(() => {
    Promise.all([
      d3.json(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      ),
      d3.csv(rawdata),
    ]).then(([data, migData]) => {
      setData(data.features);
      setMigData(migData);
    });
  }, []);

  // Projection
  const projection = d3.geoMercator().scale(500).translate([1400, 320]);

  // animation
  useEffect(() => {
    svg.selectAll('*').remove();

    // MOUSE EVENT
    const mouseover = function (event, d) {
      let rate = migData.find((e) => e['Alpha-3 code'] == d.id).rate;
      tooltip
        .html(
          d.properties.name == 'USA'
            ? `<p>Among all migrants to the <span>${d.properties.name}</span>, <span>${rate}% </span>are from <span>El Salvador, Guatemala, and Honduras</span>.</p>`
            : `<p>Around <span>${rate}%</span> of the population of <span>${d.properties.name}</span> are migrants to the US by 2020.<p>`
        )
        .classed('hidden', false);

      d3.select(this)
        .transition()
        .duration(300)
        .attr('fill', (d) => (NT.includes(d.id) ? RED.SELECT : GRAY.SELECT));
    };

    const mousemove = function (event, d) {
      tooltip
        .style('left', () => {
          let tooltipW = tooltipRef.current.clientWidth;
          return `${event.pageX - tooltipW}px`;
        })
        .style('top', () => `${event.pageY}px`);
    };

    const mouseout = function (event, d) {
      tooltip.classed('hidden', true);

      d3.select(this)
        .transition()
        .duration(300)
        .attr('fill', (d) => (NT.includes(d.id) ? RED.REGULAR : GRAY.REGULAR));
    };

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', GRAY.REGULAR)
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .attr('class', 'Country')
      .attr('d', d3.geoPath().projection(projection))
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('mousemove', mousemove)
      .transition()
      .duration(1000)
      .attr('fill', (d) => (NT.includes(d.id) ? RED.REGULAR : GRAY.REGULAR));
  }, [data, migData]);

  return (
    <div className="map-container">
      <div id="tooltip-map" className="hidden" ref={tooltipRef}></div>
      <svg className="map-svg" ref={svgRef}></svg>
    </div>
  );
};

export default MapChart;
