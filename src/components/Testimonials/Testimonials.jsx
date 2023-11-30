
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Box, Typography, Avatar, Container } from '@mui/material';
import SectionTitle from '../SectionTitle/SectionTitle';





const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
       <SectionTitle 
             subHeading ={"Happy and Top-Rated Experiences"}
                heading = {"Voices of Satisfaction"}>
                
            </SectionTitle>

    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>

<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 6 }}>
<Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
    <Box sx={{ position: 'relative', textAlign: 'center', py:2}}>
      <FaQuoteLeft sx={{ position: 'absolute', left: 16 }} />
      <Typography>{review.details}</Typography>
      <FaQuoteRight sx={{ position: 'absolute', right: '25%', top: '60%', '@media (min-width: 600px)': { top: '56%' } }} />
    </Box>

    <Avatar src={review?.image} alt={review.name} sx={{ width: 80, height: 80 }} />
    <Typography variant="h5" sx={{ mt: 2, color: 'orange.400' }}>{review.name}</Typography>
  </Box>
                        </SwiperSlide>
                    )
                }
            </Swiper>

          



       </Container>
    );
};

export default Testimonials;