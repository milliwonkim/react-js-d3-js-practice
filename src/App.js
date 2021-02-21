import React from 'react'
import './App.css'
import { BarChart } from './BarChart'
import Pie from './Pie'
import Funnel from './Funnel'
import Sankey from './Sankey'
import Circle from './Circle'
import DivergingBarChart from './DivergingBarChart'

function App() {
    return (
        <div className="App">
            <BarChart />
            <Pie />
            <Funnel />
            <Sankey />
            <Circle />
            <DivergingBarChart />
        </div>
    )
}

export default App
