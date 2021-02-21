import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function DivergingBarChart() {
    const svgRef = useRef()
    const [isMetric, setIsMetric] = useState('true')

    useEffect(() => {
        let margin = { top: 30, right: 60, bottom: 10, left: 60 }
        let width = 600
        let height = 800
        // let barHeight = 25
        let metric = isMetric === 'true' ? 'absolute' : 'relative'

        const svg = d3
            .select(svgRef.current)
            .attr('viewBox', [0, 0, width, height])

        d3.tsv(
            'state_population.tsv',
            ({ State: name, 2010: value0, 2019: value1 }) => ({
                name,
                value:
                    metric === 'absolute'
                        ? value1 - value0
                        : (value1 - value0) / value0,
            })
        ).then((data) => {
            data.sort((a, b) => d3.ascending(a.value, b.value))

            let format = d3.format(metric === 'absolute' ? '+,d' : '+,.0%')
            let tickFormat =
                metric === 'absolute' ? d3.formatPrefix('+.1', 1e6) : format

            let yAxis = (g) =>
                g
                    .attr('transform', `translate(${x(0)},0)`)
                    .call(
                        d3
                            .axisLeft(y)
                            .tickFormat((i) => data[i].name)
                            .tickSize(0)
                            .tickPadding(6)
                    )
                    .call((g) =>
                        g
                            .selectAll('.tick text')
                            .filter((i) => data[i].value < 0)
                            .attr('text-anchor', 'start')
                            .attr('x', 6)
                    )

            let xAxis = (g) =>
                g
                    .attr('transform', `translate(0,${margin.top})`)
                    .call(
                        d3
                            .axisTop(x)
                            .ticks(width / 80)
                            .tickFormat(tickFormat)
                    )
                    .call((g) => g.select('.domain').remove())

            let x = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d.value))
                .rangeRound([margin.left, width - margin.right])

            let y = d3
                .scaleBand()
                .domain(d3.range(data.length))
                .rangeRound([margin.top, height - margin.bottom])
                .padding(0.1)

            svg.append('g')
                .selectAll('rect')
                .enter()
                .data(data)
                .join('rect')
                .attr('fill', (d) => d3.schemeSet1[d.value > 0 ? 1 : 0])
                .attr('x', (d) => x(Math.min(d.value, 0)))
                .attr('y', (d, i) => y(i))
                .attr('width', (d) => Math.abs(x(d.value) - x(0)))
                .attr('height', y.bandwidth())

            svg.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .selectAll('text')
                .data(data)
                .join('text')
                .attr('text-anchor', (d) => (d.value < 0 ? 'end' : 'start'))
                .attr('x', (d) => x(d.value) + Math.sign(d.value - 0) * 4)
                .attr('y', (d, i) => y(i) + y.bandwidth() / 2)
                .attr('dy', '0.35em')
                .text((d) => format(d.value))

            svg.append('g').call(xAxis)

            svg.append('g').call(yAxis)
        })

        return () => {
            svg.selectAll('g').remove()
        }
    }, [isMetric])

    return (
        <div>
            <h1>Diverging BarChart</h1>
            <select onChange={(e) => setIsMetric(e.target.value)}>
                <option value="true">Absolute</option>
                <option value="false">Relative</option>
            </select>
            <svg ref={svgRef} />
        </div>
    )
}
