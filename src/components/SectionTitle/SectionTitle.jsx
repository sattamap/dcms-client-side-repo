import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';



const SectionTitle = ({ heading, subHeading }) => {
  return (
    <Box width="30%" margin="auto" textAlign="center" my={8}>
      <Typography variant="subtitle1" color="secondary" gutterBottom>
        --- {subHeading} ---
      </Typography>
      <Typography variant="h4" component="h3" style={{ textTransform: 'uppercase', borderBottom: '4px solid #004d40', padding: '16px' }}>
        {heading}
      </Typography>
    </Box>
  );
};

SectionTitle.propTypes = {
    heading: PropTypes.object ,
    subHeading: PropTypes.object ,
}

export default SectionTitle;
