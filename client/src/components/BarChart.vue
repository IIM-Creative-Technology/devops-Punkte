<template>
<div>
  <div ref="barChart" class="barchart">
    <svg></svg>
  </div>
</div>
</template>

<script>
import * as d3 from 'd3';
import { cloneDeep } from 'lodash';

export default {
  data() {
    return {
      chartDatas: [],
      svg: null,
      xScale0: null,
      xScale1: null,
      yScale: null,
      datas: null,
      chart: null,
    };
  },
  methods: {
    async updateData() {
      const req = await fetch('https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000');
      const res = await req.json();
      console.log(res);
      return false;
    },
  },
  mounted() {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    days.forEach(day => this.chartDatas.push({ category: day, values: [] }));
    // const url = 'https://datatubeapi.kevinmanssat.fr/ressources/country/FR/category/10/subscribers/10000-100000';

    const container = d3.select(this.$refs.barChart);
    this.width = 700;
    this.height = 500;
    this.margin = {
      top: 30, right: 20, bottom: 30, left: 50,
    };
    const barPadding = 0.5;
    const axisTicks = { qty: 5, outerSize: 0, dateFormat: '%m-%d' };

    this.svg = container.select('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);


    const defs = this.svg.append('defs');

    // GRADIENTS
    const gradient1 = defs.append('linearGradient')
      .attr('id', 'svgGradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient1.append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', '#3f78de')
      .attr('stop-opacity', 1);

    gradient1.append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', '#9dc3ff');

    const gradient2 = defs.append('linearGradient')
      .attr('id', 'svgGradient2')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient2.append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', '#de543f')
      .attr('stop-opacity', 1);

    gradient2.append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', '#ff9e8f')
      .attr('stop-opacity', 1);


    let numberOfPublicationByDay;
    if (this.$store.state.column1.datas.numberOfPublicationByDay
    && this.$store.state.column2.datas.numberOfPublicationByDay) {
      numberOfPublicationByDay = cloneDeep(
        this.$store.state.column1.datas.numberOfPublicationByDay,
      );
    } else {
      numberOfPublicationByDay = [{ label: 'lundi', value: 0, value2: 3 }];
    }
    // Get data
    numberOfPublicationByDay.forEach((el, index) => {
      // eslint-disable-next-line no-param-reassign
      if (numberOfPublicationByDay[index]) {
        el.value2 = this.$store.state.column2.datas.numberOfPublicationByDay[index].value;
      }
    });
    numberOfPublicationByDay.push(numberOfPublicationByDay.shift());

    this.xScale0 = d3.scaleBand()
      .range([0, this.width - this.margin.left - this.margin.right])
      .padding(barPadding);
    this.xScale1 = d3.scaleBand();
    // setting values scale (number => height)
    this.yScale = d3.scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]);


    const xAxis = d3.axisBottom(this.xScale0)
      .tickSizeOuter(axisTicks.outerSize);

    this.xScale0.domain(numberOfPublicationByDay.map(d => d.label));
    this.xScale1.domain(['value', 'value2']).range([0, this.xScale0.bandwidth()]);
    this.yScale
      .domain([0,
        d3.max(numberOfPublicationByDay, d => (d.value > d.value2 ? d.value : d.value2)),
      ]);

    this.svg.append('line')
      .attr('class', 'maxRed');
    this.svg.append('line')
      .attr('class', 'minRed');
    this.svg.append('line')
      .attr('class', 'maxBlue');
    this.svg.append('line')
      .attr('class', 'minBlue');

    // append bars foreach values
    this.chart = this.svg.selectAll('.bars')
      .data(numberOfPublicationByDay)
      .enter().append('g')
      .attr('class', 'bars');


    // set red bars values
    this.chart.selectAll('.bar.value')
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', 'bar value')
      .style('fill', 'url(#svgGradient2)')
      .attr('x', () => this.xScale1('value'))
      .attr('y', () => this.height - this.margin.bottom * 2)
      .attr('width', () => this.xScale1.bandwidth() * 1.5)
      .attr('transform', d => `translate(${this.xScale0(d.label) - 12},0)`)
      .attr('height', () => 0)
      .transition()
      .duration(1500)
      .attr('y', d => this.yScale(d.value))

      .attr('height', d => this.height - this.margin.top - this.margin.bottom - this.yScale(d.value));

    // set blue bars values
    this.chart.selectAll('.bar.value2')
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', 'bar value2')
      .style('fill', 'url(#svgGradient)')
      .attr('x', () => this.xScale1('value2'))
      .attr('y', () => this.height - this.margin.bottom * 2)
      .attr('width', this.xScale1.bandwidth() * 1.5)
      .attr('height', () => 0)
      .attr('transform', d => `translate(${this.xScale0(d.label) + 2},0)`);

    this.chart.selectAll('.bar.value2')
      .attr('height', () => 0)
      .transition()
      .duration(1500)
      .attr('y', d => this.yScale(d.value2))
      .attr('height', d => this.height - this.margin.top - this.margin.bottom - this.yScale(d.value2));

    // append min max bars
    // append text values
    this.chart.selectAll('.bar.value2')
      .data(d => [d])
      .enter()
      .append('text');

    // this.chart.selectAll('.bar')
    //   .data(d => [d])
    //   .enter()
    //   .append('text')
    //   .attr('class', 'bartext')
    //   .attr('text-anchor', 'middle')
    //   .attr('fill', 'white')
    //   .attr('x', (d, i) => this.xScale1(i) + this.xScale1.bandwidth() / 2)
    //   .attr('y', d => this.height - this.yScale(d))
    //   .text(d => d);

    // append days ticks axis
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
      .call(xAxis);

    // append text
    this.chart.selectAll('.bars')
      .data(d => [d])
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .text(d => (d.value > 0 ? d.value : ''))
      .attr('x', d => this.xScale0(d.label) - 1)
      .attr('y', d => this.yScale(d.value) + 24)
      .attr('fill', '#fff');
    this.chart.selectAll('.bars')
      .data(d => [d])
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .style('style', 'font-size: "Geomanist", sans-serif')
      .text(d => (d.value2 > 0 ? d.value2 : ''))
      .attr('x', d => this.xScale0(d.label) + 36)
      .attr('y', d => this.yScale(d.value2) + 24)
      .attr('fill', '#fff');
  },

  watch: {
  },
};
</script>

<style lang="scss">
.axis {
  font: 10px sans-serif;

  & path,
  & line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
}

.barchart {
  min-width: 700px;
  svg {
    display: block;
    margin: 0 auto;
  }
}
.bar-text {
  font-weight: 500;
  font-family: 'Geomanist', sans-serif;
}
</style>
