import { Container, Typography, Link, TextField, Button, Grid } from '@mui/material';

const Footer = () => {
  return (
    
      <Container maxWidth='xl' style={{ width: '100%', color: 'white', backgroundColor: '#004d40', marginLeft: 0, marginRight: 0, marginTop: 100 }} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              Branding
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Design
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Marketing
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Advertisement
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              About us
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Contact
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Jobs
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Press kit
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              Terms of use
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Privacy policy
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              Cookie policy
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <form>
              <TextField
                variant="outlined"
                label="Enter your email address"
                placeholder="mediscan@site.com"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
   
  );
};

export default Footer;
