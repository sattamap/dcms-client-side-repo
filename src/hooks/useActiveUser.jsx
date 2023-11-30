import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useActiveUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isActiveUser, isPending: isActiveUserLoading } = useQuery({
        queryKey: [user?.email, 'isActiveUser'],
        enabled: !loading,
        queryFn: async () => {
            console.log('checking active user', user)
            const res = await axiosSecure.get(`/users/status/${user.email}`);
            // console.log(res.data);
            return res.data?.activeUser;
            
        }
       
    })

    
    return [isActiveUser, isActiveUserLoading]
};

export default useActiveUser;