import { useDispatch,useSelector} from 'react-redux';
import { useState } from 'react'
import { useNavigate,Link ,useParams} from "react-router-dom";
import { Box,Typography,Tabs,Tab,AppBar } from '@mui/material';

// import { setSelectedTab } from '../features/Place/placeSlice';

import Plan from './Plan';
import Hotels from './Hotels';
import Restaurants from './Restaurant';
import Attractions from './Attractions';
import TripApi from './Travel/TripApi'

const CardsPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    let { page } = useParams();

    const tabNameToIndex = {
        0: "Plan",
        1: "Restaurants",
        2: "Hotels",
        3: "Attractions"
      }
    
      const indexToTabName = {
        Plan: 0,
        Restaurants: 1,
        Hotels: 2,
        Attractions :3
      };

      const [selectedTab,setSelectedTab] = useState(indexToTabName[page])

      const handleChange = (event, newValue) => {
        navigate(`/Home/${tabNameToIndex[newValue]}`);
       
          setSelectedTab(newValue)
      };
  
  return (
    <Box>
      <TripApi />
            <AppBar position='static' sx={{display:'flex',backgroundColor:'#51B0DA',justifyContent:'space-between',py:'10px'}}>
                
                <Link to="/" style={{textDecoration: 'none',color:'white'}}>
                <Typography variant="h4" component="h4" sx={{mx:'15px'}}>
                    TravelCompanion
                </Typography>
                </Link>

                <Tabs
                value={selectedTab}
                onChange={handleChange}
                centered
                sx={{flexWrap: 'wrap'}}
                
              >

                <Tab label="Plan" sx={{color:'white',fontSize:{xs:'10px',sm:'15px',md:'20px',lg:'20px',xl:'20px'}}}/>
                <Tab label="Restaurants" sx={{color:'white',fontSize:{xs:'10px',sm:'15px',md:'20px',lg:'20px',xl:'20px'}}}/>
                <Tab label="Hotels" sx={{color:'white',fontSize:{xs:'10px',sm:'15px',md:'20px',lg:'20px',xl:'20px'}}}/>
                <Tab label="Attractions" sx={{color:'white',fontSize:{xs:'10px',sm:'15px',md:'20px',lg:'20px',xl:'20px'}}}/>
            </Tabs>
            </AppBar>

              {selectedTab ===0 && <Plan />}
              {selectedTab ===1 && <Restaurants />}
              {selectedTab ===2 && <Hotels />}
              {selectedTab ===3 && <Attractions />}
        </Box>
  )
}

export default CardsPage

