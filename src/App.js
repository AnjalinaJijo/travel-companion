import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Restaurant from './components/Restaurant';
import SeeMap from './components/SeeMap';
import Attractions from './components/Attractions';
import Hotels from './components/Hotels';


import HomePage from './components/HomePage';


function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route exact path="/" element={<HomePage />} />
    <Route exact path="/Restaurants" element={<Restaurant />} />
    <Route exact path="/SeeMap" element={<SeeMap />} />
    <Route exact path="/Attractions" element={<Attractions/>} />
    <Route exact path="/Hotels" element={<Hotels/>} />
    {/* <Route exact path="/List" element={<List/>} /> */}
    </Routes>
    </Router>
    </>
  );
}


export default App;
