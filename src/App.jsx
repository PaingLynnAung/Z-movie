import { Routes, Route } from 'react-router-dom';
import Navbar from './componemts/navbar/Navbar';
import Homepage from "./componemts/renderMovie/Homepage";
import Viewall from './componemts/view-all/Viewall';

import "./App.css";
import Details from './componemts/details/Details';
import Similarviewall from './componemts/similar-view-all/Similarviewall';
import Searching from './componemts/searching/Searching';



const App = () => {
    
    return(
        <div className="App" >
            <Navbar/>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/search' element={<Searching/>} />
                <Route path='/:type/page/:page' element={<Viewall />} />
                <Route path='/:typ/:id/:name' element={<Details/>} />
                <Route path='/:id/:type/page/:page' element={<Similarviewall/>} />
            </Routes>
        </div>
    )
}

export default App;