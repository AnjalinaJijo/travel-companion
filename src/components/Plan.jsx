import React,{useEffect} from 'react'
import { styled } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
import { Box,Typography, Paper} from '@mui/material';

import { useDispatch,useSelector} from 'react-redux';

const Plan = () => {

 const dispatch = useDispatch();

 const region = useSelector((state) => state.place.value.region);
  return (
    <Box sx={{mt:'10px',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
         
    <Typography variant="h4" component="h4" sx={{mx:{sm:'3%',xs:'3%'},mt:'3%',display:'flex',justifyContent:'center',alignItems:'center',zIndex:5,fontWeight:'100px',color:'#4E6366'}}>
       LETS NOT MISS ANYTHING IN {region.toUpperCase()}
    </Typography>

    <Box sx={{mt:'25px',display:{xs:'grid',sm:'grid',md:'flex',lg:'flex',xl:'flex'},gridTemplateColumns:{xs:'1fr',sm:' 1fr '}, gridGap:{xs:'30px',sm:'30px'},justifyContent:'space-evenly',alignItems:'center',mb:"5%"}}>
    {/* <Link to="Home/Restaurants" style={{textDecoration: 'none'}}> */}
    <PaperFood elevation={6}>
        <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
            FOOD
        </Typography>
    </PaperFood>
    {/* </Link> */}
 
    {/* <Link to="/Home/Attractions" style={{textDecoration: 'none'}}> */}
    <PaperAttractions elevation={6}>
    <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
        ATTRACTIONS
     </Typography>
    </PaperAttractions>
    {/* </Link> */}

    {/* <Link to="/Home/Hotels" style={{textDecoration: 'none'}}> */}
    <PaperHotels elevation={6}>
    <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
        HOTELS
     </Typography>
    </PaperHotels>
    {/* </Link> */}

    </Box>
    </Box>
  )
}


const PaperFood= styled (Paper)(()=>({
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(../images/food1.jpg) ',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height:'350px',
    width:'300px',
    zIndex:-1,
    variant:'outlined',
    display:'flex',
    justifyContent:'center',
    alignItems:'top',
    borderRadius:'5%'
}))

const PaperAttractions= styled (Paper)(()=>({
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(../images/attraction.jpg) ',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height:'350px',
    width:'300px',
    zIndex:-1,
    variant:'outlined',
    display:'flex',
    justifyContent:'center',
    alignItems:'top',
    borderRadius:'5%'
}))
const PaperHotels= styled (Paper)(()=>({
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(../images/hotel.jpg) ',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height:'350px',
    width:'300px',
    zIndex:-1,
    variant:'outlined',
    display:'flex',
    justifyContent:'center',
    alignItems:'top',
    borderRadius:'5%'
}))

export default Plan
