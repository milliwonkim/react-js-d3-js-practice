import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Pie() {
    const svgRef = useRef()

    let width = 400
    let height = 400
    let radius = Math.min(width, height) / 2

    useEffect(() => {
        let color = d3.scaleOrdinal([
            '#4daf4a',
            '#377eb8',
            '#ff7f00',
            '#984ea3',
            '#e41a1c',
        ])

        let data = [2, 4, 6, 8, 10]

        let svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height)

        let g = svg.append('g').attr('transform', `translate(200, 200)`)

        svg.append('text').text('Pie Chart')

        let pie = d3.pie()

        let arc = d3.arc().innerRadius(0).outerRadius(radius)

        let arcs = g
            .selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc')

        arcs.append('path')
            .attr('fill', function (d, i) {
                return color(i)
            })
            .attr('d', arc)
    }, [])

    return (
        <div>
            <h1>Pie Chart</h1>
            <svg ref={svgRef} />
        </div>
    )
}
