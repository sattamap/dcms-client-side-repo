import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';
import SectionTitle from '../SectionTitle/SectionTitle';

const Promotion = () => {
    const [promotion, setPromotion] = useState([]);

    useEffect(() => {
        fetch('promotion.json')
            .then((res) => res.json())
            .then((data) => setPromotion(data));
    }, []);

    return (

        <div>
            <SectionTitle 
        subHeading ={"Choose from our wide range of Health Packages"}
           heading = {"TruHealth Packages"}>
           
       </SectionTitle>
        <div className="flex gap-4">
           
          <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
                loop={true}
            >
                {promotion.map((info) => (
                    <SwiperSlide key={info._id}>
                        <Card sx={{ width: 275 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={info.image}
                                alt={info.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {info.name}
                                </Typography>
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" sx={{ padding: '8px' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        borderRight: '2px solid #4dd0e1',
                                        marginRight: '10px',
                                        paddingRight: '8px',
                                    }}>
                                        {info.profile} Profile
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {info.parameter} Test Parameter
                                    </Typography>
                                </Stack>
                                <hr />
                                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" sx={{ padding: '8px' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${info.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {info.rate}% OFF
                                    </Typography>
                                </Stack>
                                <div className="card-actions justify-end">
                                    <Button variant="contained" color="primary" size="small" fullWidth sx={{
                                        backgroundColor: '#4dd0e1',
                                        '&:hover': {
                                            backgroundColor: '#004d40',
                                        },
                                    }}>
                                        See Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </div>
    );
};

export default Promotion;
