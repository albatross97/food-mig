import * as d3 from 'd3';
import { useRef, useState, useEffect } from 'react';
import fooddata from '../data/food-global.csv';

const MARGIN = { TOP: 10, BOTTOM: 30, LEFT: 50, RIGHT: 40 };
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 420 - MARGIN.TOP - MARGIN.BOTTOM;

const COUNTRIES = [
  'Honduras',
  'El Salvador',
  'Guatemala',
  'United States of America',
];
const CIRCLE = { REGULAR: 3, SELECT: 5 };
const LINE = { REGULAR: 1, SELECT: 3 };
const COLOR = {
  MODERATE_S: '#6bbaad',
  SEVERE_S: '#eb5832',
  MODERATE_R: '#DFEBE8',
  SEVERE_R: '#EBD7D0',
  GRAY: '#e0e0e0',
  TEXT: '#808080',
};

const FoodChart = ({ step }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const tooltipRef = useRef(null);
  const [data, setData] = useState([]);
  const tooltip = d3.select(tooltipRef.current).classed('hidden', true);
  const svg = d3
    .select(svgRef.current)
    .attr(
      'viewBox',
      `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
        HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
      }`
    )
    .attr('preserveAspectRatio', 'xMinYMin meet');

  const food_g = d3
    .select(gRef.current)
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  useEffect(() => {
    d3.csv(fooddata).then((data) => {
      const sorted = data
        .sort((a, b) => d3.descending(+a.severe, +b.severe))
        .map((d, index) => {
          return { ...d, rank: index + 1 };
        });
      setData(sorted);
    });
  }, []);
  useEffect(() => {
    food_g.selectAll('*').remove();

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.severe), 100])
      .nice()
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, WIDTH])
      .padding(1);

    const yaxis = food_g
      .append('g')
      .attr('class', 'yaxis')
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d, i) => `${d}%`)
      )
      .style('color', COLOR.TEXT);

    const ytitle = food_g
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -MARGIN.LEFT)
      .attr('x', -HEIGHT / 2)
      .attr('dy', '1em')
      .attr('font-size', '12px')
      .style('fill', COLOR.TEXT)
      .style('text-anchor', 'middle')
      .text('Food Insecure Rate');

    const xtitle = food_g
      .append('text')
      .attr(
        'transform',
        `translate(${WIDTH / 2}, ${HEIGHT + MARGIN.BOTTOM - 5})`
      )
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .style('fill', COLOR.TEXT)
      .text('Countries ranked by food insecure rate');

    const lines = food_g
      .append('g')
      .attr('class', 'lines')
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('class', (d) => `bellchart-${d.index}`)
      .attr('x1', (d) => x(d.country))
      .attr('x2', (d) => x(d.country))
      .attr('y1', (d) => y(d.moderate))
      .attr('y2', (d) => y(d.severe))
      .attr('stroke', COLOR.GRAY)
      .attr('stroke-width', (d) => {
        return COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR;
      });

    const circleModerate = food_g
      .append('g')
      .attr('class', 'moderate-circles')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.country))
      .attr('cy', (d) => y(d.moderate))
      .style('fill', COLOR.GRAY)
      .attr('r', CIRCLE.REGULAR);

    const circleSevere = food_g
      .append('g')
      .attr('class', 'severe-circles')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.country))
      .attr('cy', (d) => y(d.severe))
      .style('fill', COLOR.GRAY)
      .attr('r', CIRCLE.REGULAR);

    const label = food_g
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.filter((d) => COUNTRIES.includes(d.country)))
      .join('text')
      .attr('y', (d) =>
        d.country === 'El Salvador'
          ? y(d.moderate) - 10
          : d.country === 'Guatemala'
          ? y(d.moderate) - 40
          : y(d.moderate) - 30
      )
      .attr('x', (d) => x(d.country))
      .attr('text-anchor', 'middle')
      .attr('fill', COLOR.TEXT)
      .attr('font-size', '13px')
      .style('font-weight', 'bold')
      .text((d) => d.country);

    const rank = food_g
      .append('g')
      .attr('class', 'ranks')
      .selectAll('text')
      .data(data.filter((d) => COUNTRIES.includes(d.country)))
      .join('text')
      .attr('y', (d) =>
        d.country === 'El Salvador' ? y(d.severe) + 30 : y(d.severe) + 20
      )
      .attr('x', (d) => x(d.country))
      .attr('text-anchor', 'middle')

      .style('fill', (d) =>
        d.country === 'United States of America'
          ? COLOR.MODERATE_S
          : COLOR.SEVERE_S
      )
      .attr('font-size', '13px')
      .style('font-weight', 'bold')
      .text((d) => '#' + d.rank)
      .style('opacity', 0);

    if (step == 2) {
      circleSevere
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('fill', (d) =>
          !COUNTRIES.includes(d.country)
            ? COLOR.GRAY
            : d.country === 'United States of America'
            ? COLOR.MODERATE_S
            : COLOR.SEVERE_S
        );

      label
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('fill', (d) =>
          d.country === 'United States of America'
            ? COLOR.MODERATE_S
            : COLOR.SEVERE_S
        );

      rank.transition().ease(d3.easeCubicIn).duration(500).style('opacity', 1);
    } else if (step == 3) {
      circleModerate
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('fill', (d) =>
          COUNTRIES.includes(d.country) ? COLOR.MODERATE_S : COLOR.MODERATE_R
        );

      circleSevere
        .transition()
        .ease(d3.easeCubicIn)
        .duration(500)
        .style('fill', (d) =>
          COUNTRIES.includes(d.country) ? COLOR.SEVERE_S : COLOR.SEVERE_R
        );
    }
  }, [data, step]);

  return (
    <div id="food-container">
      <div id="tooltip-food" className="hidden" ref={tooltipRef}></div>
      <svg className="food-chart" ref={svgRef}>
        <g ref={gRef} />
      </svg>
    </div>
  );
};
export default FoodChart;
