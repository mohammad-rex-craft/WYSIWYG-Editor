import React from 'react'
import './App.css'
import ControlledWithToolbarBtn from './section/ControlledWithToolbarBtn'
import ControlledWithRender from './section/ControlledWithRender'
import Uncontrolled from './section/Uncontrolled'


function App() {
    
    return (
        <div className="app">
            <ControlledWithToolbarBtn />
            <ControlledWithRender />
            <Uncontrolled />
        </div>
    )
}

export default App
