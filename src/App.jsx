import { Routes, Route } from 'react-router-dom';
import Navbar from './componemts/navbar/Navbar';
import Homemovie from "./componemts/renderMovie/Homemovie";
import Viewall from './componemts/view-all/Viewall';

import "./App.css";
import Details from './componemts/details/Details';
import Similarviewall from './componemts/similar-view-all/Similarviewall';



const App = () => {
    
    return(
        <div className="App" >
            <Navbar/>
            <Routes>
                <Route path='/' element={<Homemovie />} />
                <Route path='/:type/page/:page' element={<Viewall />} />
                <Route path='/:typ/:id/:name' element={<Details/>} />
                <Route path='/:id/:type/page/:page' element={<Similarviewall/>} />
            </Routes>
        </div>
    )
}

export default App;