import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Card, CardContent, Typography} from '@mui/material';
import SectionTitle from '../SectionTitle/SectionTitle';

const Personalized = () => {
    const axiosPublic = useAxiosPublic();
    const [personalized, setPersonalized] = useState([]);

    useEffect(() => {
        const fetchFeaturedTests = async () => {
            try {
                const response = await axiosPublic.get('/recommendation'); // Adjust the API route
                setPersonalized(response.data);
            } catch (error) {
                console.error('Error fetching most booked tests:', error);
            }
        };

        fetchFeaturedTests();
    }, [axiosPublic]);

    return (
        <div className="my-20">
            <SectionTitle 
             subHeading ={"PLan Your Health"}
                heading = {"Health Insights"}>
                
            </SectionTitle>
            <Swiper
                slidesPerView={1}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                breakpoints={{
                    769: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                    },
                }}
                scrollbar={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Keyboard, Autoplay, Navigation, Pagination]}
                className="mySwiper"
                autoplay={{
                    delay: 3000, // Adjust the delay in milliseconds
                    disableOnInteraction: true, // Allow interaction to stop autoplay
                }}
                loop={true}
            >
                {personalized.map((info) => (
                    <SwiperSlide key={info._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" color="fuchsia">
                                    {info.type}
                                </Typography>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                    {info.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
                                    {info.description}
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Personalized;
