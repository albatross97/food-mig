import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../data/dot.csv';

const DotChart = () => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  //d3 chart settings
  const width = '1200';
  const height = '600';
  const center = { x: width / 2, y: height / 2 };
  const cariCenter = [width / 6, width / 2.3, width / 1.5, width / 1.2];
  const migCenter = [width / 5, width / 1.8, width / 1.2];

  //bubble settings
  const forceStrength = 0.025;
  const collideStrength = 0.7;
  const velocity = 0.2;
  const r = 3;
  const padding = 2;

  //label settings
  const cariData = [
    { name: 'Food Secure', index: 0, value: 44 },
    { name: 'Marginally Food Secure', index: 1, value: 46 },
    { name: 'Moderately Insecure', index: 2, value: 9 },
    { name: 'Severely Insecure', index: 3, value: 1 },
  ];
  const migData = [
    { name: 'Don’t Want to Migrate', index: 0, value: 55.5 },
    { name: 'Want to Migrate', index: 1, value: 43 },
    { name: 'Not Sure', index: 2, value: 1.5 },
  ];

  //color
  const COLOR = {
    MARGIN: '#B0D9D5',
    MODERATE: '#F8AD96',
    SEVERE: '#EB5832',
    GRAY: '#e0e0e0',
    TEXT: '#808080',
  };

  useEffect(() => {
    d3.csv(rawdata).then((rawdata) => {
      const data = rawdata.slice(0, 1500).map(function (d) {
        return {
          ...d,
          radius: r,
        };
      });

      const svgEl = d3
        .select(svgRef.current)
        .attr('width', '100%')
        .attr('height', height)
        .attr('text-anchor', 'middle');

      svgEl.selectAll('*').remove();

      const svg = svgEl.attr('viewBox', `0 0 ${width} ${height}`);

      //color
      const myColorMain = d3
        .scaleOrdinal()
        .range([COLOR.GRAY, COLOR.MARGIN, COLOR.MODERATE, COLOR.SEVERE])
        .domain([1, 2, 3, 4]);

      const myCariMain = d3
        .scaleOrdinal()
        .range(['Secure', 'Marginally', 'Moderately', 'Severely'])
        .domain([1, 2, 3, 4]);

      //simulation
      const simulation = d3
        .forceSimulation(data)
        .velocityDecay(velocity)
        .force(
          'collide',
          d3
            .forceCollide()
            .radius(function (d) {
              return d.radius + padding;
            })
            .strength(collideStrength)
        )
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .on('tick', ticked);
      simulation.stop();

      //mouse functions
      const tooltip = d3.select('#tooltip-survey');
      tooltip.classed('hidden', true);

      //mouseover
      const mouseover = function (event, d) {
        d3.select(this).attr('fill', '#ff6666').attr('r', 3.5);

        //add tooltip
        tooltip
          .style('left', event.clientX + 'px')
          .style('top', 0 + 'px')
          .html(
            `<div class="survey-person">${
              d.sex
            }, ${+d.age}</div><div class="survey-detail">Food Insecurity: <span>${myCariMain(
              +d.cari
            )}</span><br/>Family size: <span>${+d.fam_size}</span><br/>Location: <span>${
              d.rural_urban
            }</span></div>`
          )
          .classed('hidden', false);

        //add line
        // svg
        //   .append('line')
        //   .attr('class', 'scattertooltip')
        //   .attr('x1', event.clientX + 'px')
        //   .attr('y1', event.clientY + 'px')
        //   .attr('x2', event.clientX + 'px')
        //   .attr('y2', 0 + 'px')
        //   .attr('stroke-width', 2)
        //   .attr('stroke', '#ff6666');
      };

      //mouseout
      const mouseout = function (event, d) {
        d3.select(this)
          .attr('fill', (d) => myColorMain(d.cari))
          .attr('r', 2);

        //remove tooltip
        tooltip.classed('hidden', true);

        //remove line
        d3.selectAll('.scattertooltip').remove();
      };

      const bubbles = svg
        .append('g')
        .attr('class', 'bubbles')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 0)
        .attr('fill', (d) => myColorMain(d.cari))
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

      bubbles
        .transition()
        .ease(d3.easeBounce)
        .duration(1000)
        .attr('r', function (d) {
          return d.radius;
        });

      function ticked() {
        bubbles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      }

      //start animation
      const cariLabelClass = svg
        .append('g')
        .attr('class', 'cariLabel')
        .selectAll('text')
        .data(cariData)
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', (d) => cariCenter[+d.index])
        .attr('y', center.y * 1.6)
        .attr('text-anchor', 'middle')
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      const cariLabelNum = svg
        .append('g')
        .attr('class', 'cariLabel2')
        .selectAll('text')
        .data(cariData)
        .enter()
        .append('text')
        .attr('x', (d) => cariCenter[+d.index])
        .attr('y', center.y)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .text((d) => d.value + '%')
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      simulation.force(
        'x',
        d3
          .forceX()
          .strength(forceStrength)
          .x((d) => cariCenter[+d.cari - 1])
      );
      simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
      simulation.alpha(1).restart();
    });
  }, []);

  return (
    <div className="survey-container">
      <div id="tooltip-survey" className="hidden" ref={tooltipRef}></div>
      <svg className="survey-svg" ref={svgRef}></svg>
    </div>
  );
};

export default DotChart;
