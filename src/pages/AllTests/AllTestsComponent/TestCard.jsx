// TestCard.jsx

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const TestCard = ({ test }) => {
    const { testName, image, date, slots, price, _id } = test;

    return (
        <div className="test-card">
            <img src={image} alt={testName} />
            <h2>{testName}</h2>
            <p>Available Dates: {date}</p>
            <p>Slots: {slots}</p>
            <p>Price: {price}</p>
            <Link to={`/tests/${_id}`}>
                <button className="btn bg-[#8c5ad1] text-sm px-4"> Details</button>

            </Link>
          
        </div>
    );
};

TestCard.propTypes = {
    test: PropTypes.object ,
}
export default TestCard;
