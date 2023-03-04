import * as d3 from 'd3';
import { useRef, useState, useEffect } from 'react';

// RENDERING SETUP
const MARGIN = { TOP: 10, BOTTOM: 25, LEFT: 0, RIGHT: 0 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 100 - MARGIN.TOP - MARGIN.BOTTOM;
const PERCOL = 5;
const COLOR_SECURE = {
  NO: '#efefef',
  PLAN_NO_PREP: '#DEF1EF',
  PREP_NO_ACTION: '#6BBAAD',
  ACTION: '#478F83',
};
const COLOR_INSECURE = {
  NO: '#efefef',
  PLAN_NO_PREP: '#ffe3e0',
  PREP_NO_ACTION: '#ad2e24',
  ACTION: '#80201B',
};

const GridChart = ({ data, content, step }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const PERROW = data.length / PERCOL;
  const CELLTOTAL = Math.floor(WIDTH / PERROW);
  const CELLSIZE = CELLTOTAL * 0.85;
  const CELLMARGIN = CELLTOTAL * 0.15;
  const P = data.filter((d) => d.mig_int_global === '1').length / data.length;
  const P2 = data.filter((d) => d.mig_plan_global === '1').length / data.length;
  const COLOR =
    content === "food secure's intention" ? COLOR_SECURE : COLOR_INSECURE;

  const svg = d3
    .select(svgRef.current)
    .attr(
      'viewBox',
      `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
        HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
      }`
    )
    .attr('preserveAspectRatio', 'xMinYMid meet');

  const grid_g = d3
    .select(gRef.current)
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  useEffect(() => {
    grid_g.selectAll('*').remove();

    const grid = grid_g
      .append('g')
      .attr('class', 'grid')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => {
        const col = Math.floor(i / PERCOL);
        return col * (CELLSIZE + CELLMARGIN);
      })
      .attr('y', (d, i) => {
        const row = i % PERCOL;
        return row * (CELLSIZE + CELLMARGIN);
      })
      .attr('width', CELLSIZE)
      .attr('height', CELLSIZE)
      .attr('fill', COLOR.NO);

    const percentage_yes = grid_g
      .append('text')
      .attr('transform', `translate(${WIDTH * P}, ${HEIGHT})`)
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .style('fill', COLOR.TEXT)
      .text(d3.format('.0%')(P))
      .style('opacity', 0);

    const percentage_plan = grid_g
      .append('text')
      .attr('transform', `translate(${WIDTH * P2}, ${HEIGHT})`)
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .style('fill', COLOR.TEXT)
      .text(d3.format('.0%')(P2))
      .style('opacity', 0);

    if (step == 2) {
      grid
        .transition()
        .ease(d3.easeCubicIn)
        .duration(300)
        .attr('fill', (d) =>
          d.mig_int_global === '0' ? COLOR.NO : COLOR.PLAN_NO_PREP
        );
      percentage_yes
        .transition()
        .ease(d3.easeCubicIn)
        .duration(300)
        .style('opacity', 1);
    } else if (step == 3) {
      grid
        .transition()
        .ease(d3.easeCubicIn)
        .duration(300)
        .attr('fill', (d) =>
          d.mig_int_global === '0'
            ? COLOR.NO
            : d.mig_plan_global === '0'
            ? COLOR.PLAN_NO_PREP
            : d.mig_prep_global === '0'
            ? COLOR.PREP_NO_ACTION
            : COLOR.ACTION
        );
      percentage_plan
        .transition()
        .ease(d3.easeCubicIn)
        .duration(300)
        .style('opacity', 1);
    }
  }, [step, data]);

  return (
    <div>
      <div className="grid-label">{content}</div>
      <svg className="grid-chart" ref={svgRef}>
        <g ref={gRef} />
      </svg>
    </div>
  );
};

const Legend = ({ content, category }) => {
  const secureColor =
    category === 0
      ? COLOR_SECURE.NO
      : category === 1
      ? COLOR_SECURE.PLAN_NO_PREP
      : category === 2
      ? COLOR_SECURE.PREP_NO_ACTION
      : COLOR_SECURE.ACTION;
  const insecureColor =
    category === 0
      ? COLOR_INSECURE.NO
      : category === 1
      ? COLOR_INSECURE.PLAN_NO_PREP
      : category === 2
      ? COLOR_INSECURE.PREP_NO_ACTION
      : COLOR_INSECURE.ACTION;
  return (
    <div className="legend">
      <div
        className="legend-squa"
        style={{ backgroundColor: secureColor, width: 13, height: 13 }}
      />
      <div
        className="legend-squa"
        style={{ backgroundColor: insecureColor, width: 13, height: 13 }}
      />
      <span>{content}</span>
    </div>
  );
};

export { Legend, GridChart };
