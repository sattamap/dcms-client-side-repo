import { useContext } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// import districtData from '../../../public/districts.json';
// import upazilaData from '../../../public/upazilas.json';
import districtData from '/districts';
import upazilaData from '/upazilas';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Link as MuiLink,
} from '@mui/material';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const validatePasswordMatch = (value) => {
    const password = watch('password');
    return password === value || 'Passwords do not match';
  };

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const imgbbResponse = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (!imgbbResponse.data || imgbbResponse.data.status !== 200) {
        throw new Error('Failed to upload image to imgbb');
      }

      const imgbbImageLink = imgbbResponse.data.data.url;

      const authResult = await createUser(data.email, data.password);
      const loggedUser = authResult.user;
      console.log(loggedUser);
      await updateUserProfile(data.name, imgbbImageLink);

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: imgbbImageLink,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        status: 'active',
      };

      const mongoDbResponse = await axiosPublic.post('/users', userInfo);

      if (!mongoDbResponse.data || !mongoDbResponse.data.insertedId) {
        throw new Error('Failed to create user in MongoDB');
      }

      reset();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User created successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      console.error(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user. Please try again.',
      });
    }
  };

  return (
    <Container component="div" maxWidth="xl">
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up now!
          </Typography>
          <Typography variant="body1" paragraph align="center">
          Embark on your journey to a healthier future by creating an account! Sign up today to unlock personalized diagnostic services, expert healthcare updates, and a seamless experience tailored just for you.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  {...register('name', { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && 'This field is required'}
                  sx={{ mb: 3 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.image)}>
                  <input type="file" {...register('image', { required: true })} className="file-input w-full max-w-xs" />
                  <FormHelperText>{errors.image && 'This field is required'}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register('email', { required: true })}
                  error={Boolean(errors.email)}
                  helperText={errors.email && 'This field is required'}
                  sx={{ mb: 3 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.bloodGroup)}>
                  
                  <Select defaultValue="default" {...register('bloodGroup', { required: true })} error={Boolean(errors.bloodGroup)}>
                    <MenuItem value="default" disabled>
                      Select Blood Group
                    </MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                  <FormHelperText>{errors.bloodGroup && 'This field is required'}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.district)}>
                 
                  <Select defaultValue="default" {...register('district', { required: true })} error={Boolean(errors.district)}>
                    <MenuItem value="default" disabled>
                      Select District
                    </MenuItem>
                    {districtData[2]?.data.map((district) => (
                      <MenuItem key={district.id} value={district.name}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.district && 'This field is required'}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.upazila)}>
                 
                  <Select defaultValue="default" {...register('upazila', { required: true })} error={Boolean(errors.upazila)}>
                    <MenuItem value="default" disabled>
                      Select Upazila
                    </MenuItem>
                    {upazilaData[2]?.data.map((upazila) => (
                      <MenuItem key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.upazila && 'This field is required'}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]/,
                  })}
                  error={Boolean(errors.password)}
                  helperText={
                    (errors.password?.type === 'required' && 'Password is required') ||
                    (errors.password?.type === 'minLength' && 'Password must be 6 characters') ||
                    (errors.password?.type === 'maxLength' && 'Password must be less than 20 characters') ||
                    (errors.password?.type === 'pattern' && 'Password must have an uppercase, a lowercase, and a special character')
                  }
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  {...register('confirmPassword', {
                    required: true,
                    validate: validatePasswordMatch,
                  })}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 3 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </form>
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account? <MuiLink component={Link} to="/login">
                  Login
                </MuiLink>
              </Typography>
              <GoogleLogin></GoogleLogin>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
