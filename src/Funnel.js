import React, { useEffect, useRef } from 'react'
import D3Funnel from 'd3-funnel'

export default function Funnel() {
    const svgRef = useRef()

    useEffect(() => {
        let data = [
            ['Grade1', 400],
            ['Grade2', 300],
            ['Grade3', 200],
            ['Grade4', 100],
        ]

        const options = {
            block: {
                dynamicHeight: true,
                minHeight: 15,
            },
        }

        const chart = new D3Funnel(svgRef.current)

        chart.draw(data, options)
    }, [])

    return (
        <div>
            <h1>Funnel Using D3Funnel</h1>
            <svg ref={svgRef} />
        </div>
    )
}
