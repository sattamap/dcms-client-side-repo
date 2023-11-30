
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Modal from 'react-modal';
import Swal from "sweetalert2";
import Payments from "./TestDetailsComponent/Payments";
import useAuth from "../../hooks/useAuth";
import useActiveUser from "../../hooks/useActiveUser";
import { Button, TextField, Typography, Paper } from '@mui/material';
import { useQueryClient } from "@tanstack/react-query";

// Set the application root element for react-modal
Modal.setAppElement('#root');

const TestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null); // Use null for initial state
  const axiosPublic = useAxiosPublic();
  const [isActiveUser] = useActiveUser();
  const [coupon, setCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    axiosPublic.get('/tests').then((response) => {
      setTests(response.data);
    });
  }, [axiosPublic]);

  const testDetails = tests.find((test) => test._id === id);

  useEffect(() => {
    const fetchActiveBanner = async () => {
      try {
        const response = await axiosPublic.get('/banner');
        const activeBanner = response.data.find(banner => banner.is_Active === "true");

        if (activeBanner) {
          // If an active banner is found, set the couponCode and discount
          setCoupon(activeBanner.couponCode);
          setDiscount(activeBanner.couponRate);
        }
      } catch (error) {
        console.error('Error fetching active banner:', error);
      }
    };

    fetchActiveBanner();
  }, [axiosPublic]);

  useEffect(() => {
    // Apply promo code logic here
    if (testDetails) {
      let updatedPrice = testDetails.price;

      if (couponCode === coupon) {
        // Apply discount logic
        updatedPrice = testDetails.price - (testDetails.price * (discount / 100));
      }

      // Update the discounted price state
      setDiscountedPrice(updatedPrice);
    }
  }, [testDetails, coupon, couponCode, discount]);

  const handleBookNow = () => {
    // Check if the user is active and has slots available
    if (!isActiveUser || testDetails.slots === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Book',
        text: !isActiveUser
          ? 'You are not an active user. Please contact support.'
          : 'No slots available for this test.',
      });
      return;
    }

    // Open the modal when Book Now is clicked
    setIsModalOpen(true);
  };

  const handleConfirm = async() => {
    // Implement the logic to store test data in bookedTests collection with default status "pending"
    const bookedTest = {
      testId: testDetails._id,
      email: user.email,
      testName: testDetails.testName,
      price: discountedPrice !== null ? discountedPrice : testDetails.price, // Use discounted price if available, otherwise use the original price
      date: testDetails.date,
      report: "pending", // Default status
    };

    try {
      await axiosPublic.post('/bookedTests', bookedTest);
      // Use the query key associated with the data you want to refetch
      queryClient.invalidateQueries('bookedTests');
    } catch (error) {
      console.error('Error adding booked test:', error);
    }
  
    // Close the modal after confirming
    setIsModalOpen(false);
  };

  if (!testDetails) {
    // Handle the case when testDetails is undefined (e.g., test not found)
    return <div>No test is found or an error occurred.</div>;
  }

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={testDetails.image} alt={testDetails.testName} style={{ maxWidth: '300px', marginBottom: '20px' }} />
        <Typography variant="h4" component="div" gutterBottom>
          {testDetails.testName}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Available Date: {testDetails.date}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Available Slots: {testDetails.slots}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Price: {testDetails.price}
        </Typography>
        <Typography variant="body1" paragraph>
          {testDetails.details}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBookNow} style={{ marginBottom: '20px' }}>
          Book Now
        </Button>
      </Paper>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <Typography variant="h6" component="div" gutterBottom>
      Confirm Booking
    </Typography>
    <Button variant="outlined" color="primary" onClick={() => setIsModalOpen(false)}>
      Close
    </Button>
  </div>
  <TextField
    fullWidth
    label="Promo Code"
    variant="outlined"
    type="text"
    id="couponCode"
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value)}
    style={{ marginBottom: '20px' }}
  />
  <TextField
    fullWidth
    label="Current Price"
    variant="outlined"
    type="text"
    id="currentPrice"
    value={discountedPrice !== null ? discountedPrice : testDetails.price}
    readOnly
    style={{ marginBottom: '20px' }}
  />
  <Payments currentPrice={discountedPrice} handleConfirm={handleConfirm} />
</Modal>

    </div>
  );
};

export default TestDetails;


