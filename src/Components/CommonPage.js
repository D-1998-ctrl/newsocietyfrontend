
import { Box, Typography,  } from "@mui/material";

const CommonPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      textAlign="center"
  
    >
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Service Unavailable
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        This service is currently not available!!!!
      </Typography>

      
    </Box>
  );
};

export default CommonPage;