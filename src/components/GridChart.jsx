import * as d3 from 'd3';
import { useRef, useState, useEffect } from 'react';

// RENDERING SETUP
const MARGIN = { TOP: 10, BOTTOM: 30, LEFT: 0, RIGHT: 0 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 150 - MARGIN.TOP - MARGIN.BOTTOM;
const COLOR = {
  NO: '#efefef',
  YES: '#ffe3e0',
  PLAN_NO_PREP: '#ffe3e0',
  PREP_NO_ACTION: '#ad2e24',
  ACTION: '#540804',
};
const CELLMARGIN = 1.5,
  CELLSIZE = 8,
  PERCOL = 5;

const GridChart = ({ data, content, step }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);

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
        return col * CELLSIZE + col * CELLMARGIN;
      })
      .attr('y', (d, i) => {
        const row = i % PERCOL;
        return row * CELLSIZE + row * CELLMARGIN;
      })
      .attr('width', CELLSIZE)
      .attr('height', CELLSIZE)
      .attr('fill', (d) => (d.mig_int_global === '0' ? COLOR.NO : COLOR.YES));

    if (step == 2) {
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

const Legend = ({ content }) => {
  return <div>legend</div>;
};

export { Legend, GridChart };
