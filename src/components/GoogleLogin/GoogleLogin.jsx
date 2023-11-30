import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          status: 'active',
        };
        axiosPublic.post('/users', userInfo).then((res) => {
          console.log(res.data);
          navigate('/');
        });
      });
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div className="">
        <Button onClick={handleGoogleSignIn} variant="contained" color="primary" fullWidth>
          <FaGoogle className="mr-4" />
          Google
        </Button>
      </div>
    </div>
  );
};

export default GoogleLogin;
