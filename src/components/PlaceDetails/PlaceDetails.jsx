import React from 'react'
import { Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip } from '@mui/material'
import Rating from '@mui/material/Rating'
import {LocationOn,Phone} from '@mui/icons-material'

import useStyles from './styles'

const PlaceDetails = ({place,selected,refProp}) => {
  // console.log(place);
  const classes = useStyles();

  //to automatically scroll the cards upon clicking a specificchild element in map
  if(selected){
    console.log(refProp)
    refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})
  } 

  return (
    <Card elevation={6}>
      <CardMedia 
        style={{height:350}}
        image={place.photo?place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
        <Rating name="read-only" value={Number(place.rating)} precision={0.5} readOnly />
        <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent='space-between'>
            <Typography variant="subtitle1">Price</Typography>
          <Typography variant="subtitle1">{place.price}</Typography>
        </Box>
        <Box display="flex" justifyContent='space-between'>
            <Typography variant="subtitle1">Ranking</Typography>
          <Typography variant="subtitle1">{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award)=>(
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src="awards.images.small" />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
      {place?.cuisine?.map(({name})=>(
        <Chip key={name} size="small" label={name} className={classes.chip} />
      ))}
      {place.address && (
         <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
          <LocationOn />{place.address}
         </Typography>
      )}
      {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')}>
            Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        </CardActions>
    </Card >
  )
}

export default PlaceDetails
