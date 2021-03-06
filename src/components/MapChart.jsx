import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../data/mig_rate.csv';

// CANVAS SETUP
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// RENDERING SETTING
const NT = ['GTM', 'HND', 'SLV'];
const RED = { REGULAR: '#f8ad96', SELECT: '#eb5832' };
const GRAY = { REGULAR: '#f0f0f0', SELECT: '#bcbcbc' };

const MapChart = () => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  useEffect(() => {
    Promise.all([
      d3.json(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      ),
      d3.csv(rawdata),
    ]).then(([data, migdata]) => {
      // Svg
      const svg = d3
        .select(svgRef.current)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g');
      svg.selectAll('*').remove();

      // Projection
      const S = WIDTH > 600 ? HEIGHT / 0.4 : HEIGHT / 0.7;
      const W = WIDTH > 600 ? WIDTH / 0.75 : WIDTH / 0.55;
      const H = WIDTH > 600 ? HEIGHT / 1.7 : HEIGHT / 1.5;
      const projection = d3
        .geoNaturalEarth1()
        .scale(S / Math.PI)
        .translate([W, H]);

      // MOUSE EVENT
      const tooltip = d3.select('#tooltip-map');

      const mouseover = function (event, d) {
        tooltip.classed('hidden', false);

        d3.select(this).attr('fill', (d) =>
          NT.includes(d.id) ? RED.SELECT : GRAY.SELECT
        );
      };

      const mousemove = function (event, d) {
        let rate = migdata.find((e) => e['Alpha-3 code'] == d.id).rate;

        tooltip
          .html(
            d.properties.name == 'USA'
              ? `<p>Among all migrants to the <span class="big">${d.properties.name}</span>, <span class="big">${rate}% </span>are from <span>El Salvador, Guatemala, and Honduras</span>.</p>`
              : `<p>Around <span class="big">${rate}%</span> of the population of <span class="big">${d.properties.name}</span> are migrants to the US by 2020.<p>`
          )
          .style('left', () => {
            let tooltipW = tooltipRef.current.clientWidth;
            if (event.clientX < tooltipW && WIDTH - event.clientX > tooltipW)
              return `${event.clientX}px`;
            return `${event.clientX - tooltipW}px`;
          })
          .style('top', () => {
            let tooltipH = tooltipRef.current.clientHeight;

            if (HEIGHT - event.clientY < tooltipH)
              return `${event.clientY - tooltipH}px`;
            return `${event.clientY}px`;
          });
      };

      const mouseout = function (event, d) {
        tooltip.classed('hidden', true);

        d3.select(this).attr('fill', (d) =>
          NT.includes(d.id) ? RED.REGULAR : GRAY.REGULAR
        );
      };

      // ENTER
      // DATA JOIN
      svg
        .selectAll('path')
        .data(data.features)
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
    });
  }, []);

  return (
    <div className="map-container">
      <div id="tooltip-map" className="hidden" ref={tooltipRef}></div>
      <svg className="map-svg" ref={svgRef}></svg>
    </div>
  );
};

export default MapChart;
