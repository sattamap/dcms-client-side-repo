import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
//import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: users = {} } = useQuery({
    queryKey: ["users",],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });
  return (
    <div>



      <div className="card justify-end card-side bg-base-100 shadow-xl">
        <figure><img src={users.photoURL} alt={users.name} /></figure>

        <div className="card-body">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <h2 className="card-title">Name: {users.name}        </h2>
          <p className="card-title"> Blood Group: {users.bloodGroup}    </p>
          <p className="card-title"> Distric: {users.district}       </p>
          <p className="card-title"> Upazila: {users.upazila}      </p>
          
        </div>
      </div>
      <div className=" ">
          <Link to={`/dashboard/updateUser/${users._id}`}>
              <button className="btn mt-10 bg-emerald-700 hover:bg-emerald-950 hover:text-white w-1/2">
                Edit
              </button>
            </Link>
        
          </div>
    </div>
  );
};

export default Profile;