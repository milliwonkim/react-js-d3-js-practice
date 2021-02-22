import React from 'react'
import './App.css'
import { BarChart } from './BarChart'
import Pie from './Pie'
import Funnel from './Funnel'
import Sankey from './Sankey'
import Circle from './Circle'
import DivergingBarChart from './DivergingBarChart'
import BarChart2 from './BarChart2'

function App() {
    return (
        <div className="App">
            <BarChart />
            <Pie />
            <Funnel />
            <Circle />
            <DivergingBarChart />
            <Sankey />
            <BarChart2 />
        </div>
    )
}

export default App
