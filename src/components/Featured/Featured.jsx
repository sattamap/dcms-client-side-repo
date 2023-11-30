import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import SectionTitle from '../SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const Featured = () => {
    const [featuredTests, setFeaturedTests] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchFeaturedTests = async () => {
            try {
                const response = await axiosPublic.get('/featured-tests'); // Adjust the API route
                setFeaturedTests(response.data);
            } catch (error) {
                console.error('Error fetching most booked tests:', error);
            }
        };

        fetchFeaturedTests();
    }, [axiosPublic]);

    return (
        <div>
            <SectionTitle
                subHeading={"Choose from our frequently booked blood tests"}
                heading={"Featured Tests"}>



            </SectionTitle>
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
                {featuredTests.map((test) => (
                    <SwiperSlide key={test._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <img src={test.image} alt={test.testName} style={{ height: '200px', objectFit: 'cover' }} />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {test.testName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Booking Date: {test.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Available Slots: {test.slots}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>

                                <Link to={`/tests/${test._id}`}>
                                    <Button size="medium" variant="outlined" href="#outlined-buttons">
                                        Details
                                    </Button>
                                </Link>


                            </CardActions>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Featured;

