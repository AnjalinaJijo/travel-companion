import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Restaurant from './components/Restaurant';
import Attractions from './components/Attractions';
import Hotels from './components/Hotels';
import Cards from './components/CardsPage';


import HomePage from './components/HomePage';


function App() {

  return (
    <>
    <Router>
    <Routes>
    <Route exact path="/" element={<HomePage />} />

    <Route exact path="/Home" element={<Navigate replace to="/Home/Plan" />} />
    <Route path="/Home/:page?" element={<Cards />} />
    
    <Route exact path="/Restaurants" element={<Restaurant />} />
    <Route exact path="/Attractions" element={<Attractions/>} />
    <Route exact path="/Hotels" element={<Hotels/>} />
    </Routes>
    </Router>
    </>
  );
}


export default App;
