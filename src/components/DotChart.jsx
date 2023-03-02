import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';

const DotChart = ({ data, step }) => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  //d3 chart settings
  const width = '1200';
  const height = '600';
  const center = { x: width / 2, y: height / 2 };
  const cariCenter = [width / 6, width / 2.3, width / 1.5, width / 1.2];
  const migCenter = [width / 5, width / 1.8, width / 1.2];

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

  const svg = d3
    .select(svgRef.current)
    .attr('width', '100%')
    .attr('height', height)
    .attr('text-anchor', 'middle');

  //color
  const myColorMain = d3
    .scaleOrdinal()
    .range([COLOR.GRAY, COLOR.MARGIN, COLOR.MODERATE, COLOR.SEVERE])
    .domain([1, 2, 3, 4]);

  const myCariMain = d3
    .scaleOrdinal()
    .range(['Secure', 'Marginally', 'Moderately', 'Severely'])
    .domain([1, 2, 3, 4]);

  //mouse functions
  const tooltip = d3.select('#tooltip-survey').classed('hidden', true);
  // const line = svg
  //   .selectAll('line')
  //   .join('line')
  //   .style('stroke-width', '2px')
  //   .style('stroke', '#ff6666');

  // line
  //   .attr('x1', event.pageX + 'px')
  //   .attr('y1', event.layerY + 'px')
  //   .attr('x2', event.pageX + 'px')
  //   .attr('y2', event.layerY + '30px');

  //mouseover
  const mouseover = function (event, d) {
    d3.select(this).attr('fill', '#ff6666').attr('r', 3.5);
    console.log(event.layerY, event.pageY);

    tooltip
      .style('left', event.pageX + 'px')
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
  };

  //mouseout
  const mouseout = function (event, d) {
    d3.select(this)
      .attr('fill', (d) => myColorMain(d.cari))
      .attr('r', 2);
    tooltip.classed('hidden', true);
  };

  //bubble settings
  const forceStrength = 0.023;
  const collideStrength = 0.7;
  const velocity = 0.17;
  const padding = 2;
  const charge = (d) => {
    return -Math.pow(d.radius, 1) * forceStrength;
  };

  useEffect(() => {
    let simulation = d3
      .forceSimulation()
      // .velocityDecay(velocity)
      // .force(
      //   'collide',
      //   d3
      //     .forceCollide()
      //     .radius(function (d) {
      //       return d.radius + padding;
      //     })
      //     .strength(collideStrength)
      // )
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(-2))
      .force('collision', d3.forceCollide(5))
      .on('tick', ticked);
    // simulation.stop();

    let bubbles = svg
      .append('g')
      .attr('class', 'bubbles')
      .selectAll('circle')
      .data(data);

    let bubblesE = bubbles
      .enter()
      .append('circle')
      .attr('r', 0)
      .attr('fill', (d) => myColorMain(d.cari))
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);

    bubbles = bubbles.merge(bubblesE);

    bubbles
      .transition()
      .ease(d3.easeBounce)
      .duration(0.5)
      .attr('r', function (d) {
        return d.radius;
      });

    simulation.nodes(data);

    function ticked() {
      bubbles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    }

    if (step == 1) {
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
    } else if (step == 2) {
      const migLabel = svg
        .append('g')
        .attr('class', 'migLabel')
        .selectAll('text')
        .data(migData)
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', (d) => migCenter[+d.index])
        .attr('y', center.y * 1.6)
        .attr('text-anchor', 'middle')
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      const migLabel2 = svg
        .append('g')
        .attr('class', 'migLabel2')
        .selectAll('text')
        .data(migData)
        .enter()
        .append('text')
        .attr('x', (d) => migCenter[+d.index])
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
          .x((d) => migCenter[+d.mig])
      );
      simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
      simulation.alpha(1).restart();
    } else if (step == 3) {
      const surveyLabel = svg
        .append('g')
        .attr('class', 'migLabel')
        .selectAll('text')
        .data(migData)
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', (d) => center.x)
        .attr('y', center.y * 1.6)
        .attr('text-anchor', 'middle')
        .text('total survey people')
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      const surveyLabel2 = svg
        .append('g')
        .attr('class', 'migLabel2')
        .selectAll('text')
        .data(migData)
        .enter()
        .append('text')
        .attr('x', (d) => center.x)
        .attr('y', center.y)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .text('4,498')
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
      simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
      simulation.alpha(1).restart();
    }
  }, [step]);

  return (
    <div className="survey-container">
      <div id="tooltip-survey" className="hidden" ref={tooltipRef}></div>
      <svg className="survey-svg" ref={svgRef}></svg>
    </div>
  );
};

export default DotChart;
