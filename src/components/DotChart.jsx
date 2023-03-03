import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const DotChart = ({ nodes, step }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  //d3 chart settings
  const width = 1000;
  const height = 600;
  const center = { x: width / 2, y: height * 0.4 };
  const migCenter = [width * 0.2, width * 0.6, width * 0.9];
  const cariCenter = [width * 0.12, width * 0.45, width * 0.7, width * 0.9];
  const COLOR = {
    MARGIN: '#B0D9D5',
    MODERATE: '#F8AD96',
    SEVERE: '#EB5832',
    GRAY: '#e0e0e0',
    TEXT: '#808080',
  };
  const myColorMain = d3
    .scaleOrdinal()
    .range([COLOR.GRAY, COLOR.MARGIN, COLOR.MODERATE, COLOR.SEVERE])
    .domain([1, 2, 3, 4]);
  const myCariMain = d3
    .scaleOrdinal()
    .range(['Secure', 'Marginally', 'Moderately', 'Severely'])
    .domain([1, 2, 3, 4]);

  //data
  const data = nodes.map((d) => {
    return {
      ...d,
      radius: 3,
      x: 0.2 * width + Math.random() * 0.6 * width,
      y: 0.2 * height + Math.random() * 0.6 * height,
    };
  });
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

  //svg

  const svg = d3
    .select(svgRef.current)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMid');

  // tooltip
  const tooltip = d3.select('#tooltip-survey').classed('hidden', true);
  const mouseover = function (event, d) {
    d3.select(this).attr('fill', '#ff6666').attr('r', 5);
    // console.log(d.x, event.layerX, event.pageX);

    tooltip
      .style('left', event.layerX + 15 + 'px')
      .style('top', '0px')
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

    svg
      .append('line')
      .attr('class', 'surveyline')
      .attr('x1', d.x + 'px')
      .attr('y1', d.y + 'px')
      .attr('x2', d.x + 'px')
      .attr('y2', '-30px')
      .attr('stroke-width', '2px')
      .attr('stroke', COLOR.SEVERE);
  };
  const mouseout = function (event, d) {
    d3.select(this)
      .attr('fill', (d) => myColorMain(d.cari))
      .attr('r', 2);

    tooltip.classed('hidden', true);

    svg.selectAll('line').remove();
  };

  //bubble settings
  const forceStrength = 0.023;
  const delay = 0.5;
  const chargeStrength = -1;
  const collideStrength = 0.7;

  useEffect(() => {
    svg.selectAll('*').remove();

    let bubbles = svg
      .selectAll('.bubble')
      .data(data, (d) => d)
      .enter()
      .append('circle')
      .attr('r', 0)
      .attr('fill', (d) => myColorMain(d.cari))
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);

    bubbles.transition().attr('r', (d) => d.radius);

    let simulation = d3
      .forceSimulation()
      .velocityDecay(delay)
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d) => d.radius * 1.8)
          .strength(collideStrength)
      )
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      //   .force('charge', d3.forceManyBody().strength(chargeStrength))
      .on('tick', () => {
        bubbles
          .attr('cx', (d) => {
            return d.x;
          })
          .attr('cy', (d) => {
            return d.y;
          });
      })
      .nodes(data)
      .stop();

    // animation
    if (step == 1) {
      simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
      simulation.alpha(3).restart();

      const surveyLabel = svg
        .append('g')
        .attr('class', 'migLabel')
        .selectAll('text')
        .data([1])
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', center.x)
        .attr('y', center.y * 1.8)
        .attr('text-anchor', 'middle')
        .text('total survey people')
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .style('opacity', 1);

      svg
        .append('g')
        .attr('class', 'migLabel2')
        .selectAll('text')
        .data([1])
        .enter()
        .append('text')
        .attr('x', center.x)
        .attr('y', center.y)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .text('4,498')
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .style('opacity', 1);
    } else if (step == 2) {
      simulation.force(
        'x',
        d3
          .forceX()
          .strength(forceStrength)
          .x((d) => migCenter[+d.mig])
      );
      simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
      simulation.alpha(3).restart();

      const migLabel = svg
        .append('g')
        .attr('class', 'migLabel')
        .selectAll('text')
        .data(migData)
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', (d) => migCenter[+d.index])
        .attr('y', center.y * 1.7)
        .attr('text-anchor', 'middle')
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('opacity', 1);

      svg
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
    } else if (step == 3) {
      simulation.force(
        'x',
        d3
          .forceX()
          .strength(forceStrength)
          .x((d) => cariCenter[+d.cari - 1])
      );

      simulation.alpha(3).restart();

      const cariLabel = svg
        .append('g')
        .attr('class', 'cariLabel')
        .selectAll('text')
        .data(cariData)
        .enter()
        .append('text')
        .style('fill', COLOR.TEXT)
        .attr('x', (d) => cariCenter[+d.index])
        .attr('y', center.y * 1.7)
        .attr('text-anchor', 'middle')
        .text((d) => d.name)
        .style('opacity', 0)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('opacity', 1);

      svg
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
    }
  }, [step, data]);

  return (
    <div className="survey-container" id="survey-container">
      <div id="tooltip-survey" className="hidden" ref={tooltipRef}></div>
      <svg className="survey-svg" ref={svgRef}></svg>
    </div>
  );
};

export default DotChart;
