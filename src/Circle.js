import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Wrapper = styled.svg`
    background-color: grey;
`

const d = [25, 30, 45, 60, 20]
export default function Circle() {
    const svgRef = useRef()

    const [data, setData] = useState(d)
    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('r', (value) => value)
            .attr('cx', (value) => value * 2)
            .attr('cy', (value) => value * 2)
            .attr('stroke', 'blue')
    }, [data])

    return (
        <div>
            <h1>Circle</h1>
            <svg ref={svgRef} />
            <button onClick={() => setData(data.map((value) => value + 5))}>
                UPDATE
            </button>
            <button onClick={() => setData(data.filter((value) => value < 35))}>
                FILTER
            </button>
        </div>
    )
}
