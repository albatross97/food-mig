import * as d3 from 'd3';
import { useRef, useState, useEffect, useMemo } from 'react';

// RENDERING SETUP
const MARGIN = { TOP: 20, BOTTOM: 25, LEFT: 7, RIGHT: 15 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 100 - MARGIN.TOP - MARGIN.BOTTOM;
const PERCOL = 5;
const COLOR_SECURE = {
  NO: '#efefef',
  PLAN_NO_PREP: '#DEF1EF',
  PREP_NO_ACTION: '#6BBAAD',
  ACTION: '#478F83',
  TEXT: '#808080',
};
const COLOR_INSECURE = {
  NO: '#efefef',
  PLAN_NO_PREP: '#ffe3e0',
  PREP_NO_ACTION: '#ad2e24',
  ACTION: '#80201B',
  TEXT: '#808080',
};

const GridChart = ({ data, dataPrep, content, step }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const PERROW = useMemo(() => data.length / PERCOL, [data]);
  const CELLTOTAL = useMemo(() => WIDTH / PERROW, [data]);
  const CELLSIZE = useMemo(() => CELLTOTAL * 0.85, [data]);
  const CELLMARGIN = useMemo(() => CELLTOTAL * 0.15, [data]);

  const P = useMemo(
    () => data.filter((d) => d.mig_int_global === '1').length / data.length,
    [data]
  );
  const P2 = useMemo(
    () => data.filter((d) => d.mig_plan_global === '1').length / data.length,
    [data]
  );
  const P_prep = useMemo(
    () =>
      dataPrep.filter((d) => d.mig_plan_global === '1').length /
      dataPrep.length,
    [dataPrep]
  );
  const COLOR = useMemo(
    () =>
      content === "food-secure's intention" ? COLOR_SECURE : COLOR_INSECURE,
    [content]
  );

  useEffect(() => {
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

    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, WIDTH - CELLMARGIN]);

    const xaxis = grid_g
      .append('g')
      .attr('class', 'xaxis')
      .call(
        d3
          .axisTop(x)
          .ticks(5)
          .tickFormat((d, i) => `${d}%`)
      )
      .style('color', COLOR.TEXT);

    const percentage_yes = grid_g
      .append('text')
      .attr('transform', `translate(${WIDTH * P}, ${HEIGHT + MARGIN.TOP - 5})`)
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d3.format('.0%')(P))
      .style('opacity', 0);

    const percentage_plan = grid_g
      .append('text')
      .attr('transform', `translate(${WIDTH * P2}, ${HEIGHT + MARGIN.TOP - 5})`)
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d3.format('.0%')(P2))
      .style('opacity', 0);

    const percentage_plan_scale = grid_g
      .append('text')
      .attr(
        'transform',
        `translate(${WIDTH * P_prep}, ${HEIGHT + MARGIN.TOP - 5})`
      )
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d3.format('.0%')(P_prep))
      .style('opacity', 0);

    if (step === 1) {
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
    } else if (step === 2) {
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
    } else if (step === 3) {
      grid
        .data(dataPrep)
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

      percentage_plan_scale
        .transition()
        .ease(d3.easeCubicIn)
        .duration(300)
        .style('opacity', 1);
    }
  }, [step, data, dataPrep]);

  return (
    <div>
      <div className="grid-label" style={{ color: COLOR.ACTION }}>
        {content}
      </div>
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
