import Banner from "../../components/Banner/Banner";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import Personalized from "../../components/Personalized/Personalized";
import Promotion from "../../components/Promotion/Promotion";
import Testimonials from "../../components/Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <Personalized></Personalized>
           <Promotion></Promotion>
           <Testimonials></Testimonials>
           <Footer></Footer>
        </div>
    );
};

export default Home;