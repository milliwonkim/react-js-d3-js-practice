import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function BarChart2() {
    const svgRef = useRef()
    const sample = [
        { language: 'Rust', value: 78.9, color: '#000000' },
        { language: 'Kotlin', value: 75.1, color: '#00a2ee' },
        { language: 'Python', value: 68, color: '#fbcb39' },
        { language: 'Typescript', value: 67, color: '#007bc8' },
        { language: 'Go', value: 65.6, color: '#65cedb' },
        { language: 'Swift', value: 65.1, color: '#ff6e52' },
        { language: 'Javascript', value: 61.9, color: '#f9de3f' },
        { language: 'c#', value: 60.4, color: '#5d2f8e' },
        { language: 'F#', value: 59.6, color: '#008fc9' },
        { language: 'Clojure', value: 59.6, color: '#507dca' },
    ]

    useEffect(() => {
        const margin = 50
        const width = 1000 - 2 * margin
        const height = 800 - 2 * margin

        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height + 100)

        const svgContainer = d3.select('#container')

        let chart = svg
            .append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        const xScale = d3
            .scaleBand()
            .range([0, width - 100])
            .domain(sample.map((s) => s.language))
            .padding(0.5)

        const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100])

        chart.append('g').call(d3.axisLeft(yScale))
        chart
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))

        chart
            .selectAll('rect')
            .data(sample)
            .enter()
            .append('rect')
            .attr('class', 'bars')
            .attr('fill', '#353b48')
            .attr('x', (s) => xScale(s.language))
            .attr('y', (s) => yScale(s.value))
            .attr('height', (s) => height - yScale(s.value))
            .attr('width', xScale.bandwidth())

        chart
            .append('g')
            .attr('class', 'grid')
            .call(
                d3
                    .axisLeft()
                    .scale(yScale)
                    .tickSize(-width, 0, 0)
                    .tickFormat('')
            )

        svg.append('text')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Love meter (%)')

        svg.append('text')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Most loved programming languages in 2018')

        let bars = svg.selectAll('.bars')

        bars.append('text')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .attr('text-anchor', 'left')
            .text(function (d) {
                return d.value + '%'
            })
            .style('fill', '#ffffff')

        bars.on('mouseover', function () {
            d3.select(this).attr('fill', '#40739e')
        }).on('mouseout', function (d, i) {
            d3.select(this).attr('fill', '#353b48')
        })
    }, [])

    return (
        <div id="container">
            <h1>BarChart 2</h1>
            <svg ref={svgRef} />
        </div>
    )
}
