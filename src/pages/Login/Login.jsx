import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Link as MuiLink,
} from '@mui/material';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInUp',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown',
          },
        });

        navigate(from, { replace: true });
      });
  };

  return (
    <Container component="div" maxWidth="xl">
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Login now!
          </Typography>
          <Typography variant="body1" paragraph align="center">
          Welcome! Your journey to wellness begins with a secure login, providing you instant access to your personalized diagnostic insights and healthcare updates.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="email"
                      name="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Typography variant="body2" align="center" className="mt-3">
                New Here? <MuiLink component={Link} to="/register">Create an account</MuiLink>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
