import { Link, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
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
  Link as MuiLink,
  CardContent,
} from "@mui/material";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateUser = () => {
  const { name, email,  _id } = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        const userData = {
            name: data.name,
            email: data.email,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,

          photoURL: res.data.data.display_url,
        };

        const updateData = await axiosPublic.patch(`/users/update/${_id}`, userData);

        if (updateData.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.testName} is updated to the menu.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user. Please try again.',
      });
    }
  };

//   const validatePasswordMatch = (value) => {
//     const password = watch('password');
//     return password === value || 'Passwords do not match';
//   };

  return (
    <Container component="div" maxWidth="xl">
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  {...register("name", { required: true })}
                  defaultValue={name} 
                  error={Boolean(errors.name)}
                  helperText={errors.name && 'This field is required'}
                  sx={{ mb: 3 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.image)}>
                  <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                  <FormHelperText>{errors.image && 'This field is required'}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register("email", { required: true })}
                  defaultValue={email} 
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
                {/* Add District and Upazila selection similar to the blood group */}
                <div className="form-control w-full my-6">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <Select
                    defaultValue="default"
                    {...register('district', { required: true })}
                    error={Boolean(errors.district)}
                  >
                    <MenuItem value="default" disabled>
                      Select District
                    </MenuItem>
                    {districtData[2]?.data.map((district) => (
                      <MenuItem key={district.id} value={district.name}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.district && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control w-full my-6">
                  <label className="label">
                    <span className="label-text">Upazila</span>
                  </label>
                  <Select
                    defaultValue="default"
                    {...register('upazila', { required: true })}
                    error={Boolean(errors.upazila)}
                  >
                    <MenuItem value="default" disabled>
                      Select Upazila
                    </MenuItem>
                    {upazilaData[2]?.data.map((upazila) => (
                      <MenuItem key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.upazila && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                {/* <TextField
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
                /> */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Update
                </Button>
              </CardContent>
            </form>
            <CardContent>
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account? <MuiLink component={Link} to="/login">
                  Login
                </MuiLink>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateUser;
