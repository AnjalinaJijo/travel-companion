import React from 'react'
import { styled } from '@mui/material/styles';
import { Box,Typography, Paper, Link } from '@mui/material';

const CardsPage = () => {
  return (
    <Box sx={{mt:'65vh',mx:'10px'}}>
    <Typography variant="h4" component="h4" sx={{ mt:'120px',display:'flex',justifyContent:'center',alignItems:'center',flexGrow: 1,zIndex:5,fontWeight:'100px',color:'#4E6366'}}>
       LETS NOT MISS ANYTHING
    </Typography>

    <Box sx={{mt:'10vh',display:'flex',justifyContent:'space-evenly',alignItems:'center',mb:"70px"}}>
    <Link href="/Restaurants" sx={{textDecoration: 'none'}}>
    <PaperFood elevation={6}>
        <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
            FOOD
        </Typography>
    </PaperFood>
    </Link>
 
    <Link href="/Attractions" sx={{textDecoration: 'none'}}>
    <PaperAttractions elevation={6}>
    <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
        ATTRACTIONS
     </Typography>
    </PaperAttractions>
    </Link>
    {/* <Paper elevation={3} sx={{height:'350px',width:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Typography variant="h6" component="h6" sx={{ color:'blue',display:'flex',justifyContent:'center',alignItems:'center',flexGrow: 1,zIndex:5}}>
        Hotels
     </Typography>

    </Paper> */}
    <Link href="/SeeMap" sx={{textDecoration: 'none'}}>
    <PaperMap elevation={6}>
    <Typography variant="h4" component="h4" sx={{mt:'45px', color:'white',zIndex:3}}>
        SEE MAP
     </Typography>
    </PaperMap>
    </Link>

    </Box>
    </Box>
  )
}




const PaperFood= styled (Paper)(()=>({
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(./images/food1.jpg) ',
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
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(./images/attraction.jpg) ',
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
const PaperMap= styled (Paper)(()=>({
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1),rgba(0,0,0,0.2)),url(./images/map.jpg) ',
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

export default CardsPage

