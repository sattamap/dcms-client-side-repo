
 import { useEffect, useState } from 'react';
 import useAxiosPublic from '../../hooks/useAxiosPublic';
 import { Link } from 'react-router-dom';
 import { Typography, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
 
 const Banner = () => {
   const [filteredBanners, setFilteredBanners] = useState([]);
   const axiosPublic = useAxiosPublic();
 
   useEffect(() => {
     const fetchBanners = async () => {
       try {
         const response = await axiosPublic.get('/banner');
         const banners = response.data;
 
         // Filter banners where is_active is "true"
         const activeBanners = banners.filter((banner) => banner.is_Active === 'true');
 
         setFilteredBanners(activeBanners);
       } catch (error) {
         console.error('Error fetching banners:', error);
       }
     };
 
     fetchBanners();
   }, [axiosPublic]);
 
   return (
     <Container>
       <Grid container spacing={2}>
         {filteredBanners.map((banner) => (
           <Grid item key={banner._id} xs={12}>
             <Card style={{ position: 'relative', minHeight: '400px' }}>
               <Box
                 component="img"
                 alt={banner.alt_text}
                 src={banner.image}
                 sx={{
                   width: '100%',
                   height: '100%',
                   objectFit: 'cover',
                 }}
               />
               <Box
                 sx={{
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   width: '100%',
                   height: '100%',
                   backgroundColor: 'rgba(0, 0, 0, 0.6)',
                 }}
               />
               <CardContent
                 sx={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   textAlign: 'center',
                   color: 'white',
                   zIndex: 1,
                 }}
               >
                 <div>
                   <Typography variant="h3" gutterBottom>
                     {banner.bannerTitle}
                   </Typography>
                   <Typography variant="body1" paragraph>
                     {banner.description}
                   </Typography>
                   <Typography variant="body2" paragraph>
                     Get an extra <span className="text-xl font-extrabold">{banner.couponRate}%</span> off
                   </Typography>
                   <Typography variant="body2" paragraph>
                     Coupon Code{' '}
                     <span className="bg-green-700 text-xs font-semibold p-2 rounded-lg">
                       {banner.couponCode}
                     </span>
                   </Typography>
                   <Link to="/allTests" style={{ textDecoration: 'none' }}>
                     <Button variant="contained" color="primary" mt={3}>
                       All Tests
                     </Button>
                   </Link>
                 </div>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>
     </Container>
   );
 };
 
 export default Banner;
 
