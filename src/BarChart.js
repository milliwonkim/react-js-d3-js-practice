import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './App.css'

export const BarChart = () => {
    const svgRef = useRef()

    useEffect(() => {
        let width = 900
        let height = 600

        d3.csv('alphabet.csv').then((data) => {
            let name = []
            let value = []

            data.map((d) => {
                name.push(d.letter)
                value.push(+d.frequency)

                return { name, value }
            })

            const svg = d3
                .select(svgRef.current)
                .attr('viewBox', [0, 0, width + 100, height + 100])

            var g = svg.append('g').attr('transform', 'translate(55, 10)')

            const x_scale = d3
                .scalePoint()
                .domain(name)
                .range([0, width])
                .padding(0.5)

            const y_scale = d3
                .scaleLinear()
                .domain([d3.max(value), 0])
                .range([0, height - 50])

            const x_axis = d3.axisBottom().scale(x_scale)
            const y_axis = d3.axisLeft().scale(y_scale)

            // svg.append('text')
            //     .attr('x', 265)
            //     .attr('y', 240)
            //     .style('text-anchor', 'middle')
            //     .attr('transform', 'translate(0, 230)')
            //     .text('alphabet')

            svg.append('g').attr('transform', 'translate(60, 570)').call(x_axis)

            svg.append('g').attr('transform', 'translate(60, 20)').call(y_axis)

            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', function (d) {
                    return x_scale(d.letter)
                })
                .attr('y', function (d) {
                    return y_scale(d.frequency)
                })
                .attr('width', 10)
                .attr('height', function (d) {
                    return height - y_scale(+d.frequency) - 40
                })
                .attr('fill', 'red')
                .attr('transform', 'translate(')
                .join('rect')
        })
    }, [])

    return (
        <div>
            <h1>Bar Chart</h1>
            <svg ref={svgRef} />
        </div>
    )
}
