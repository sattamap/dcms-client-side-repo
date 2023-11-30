import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBookedTests = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: bookedTest=[]} = useQuery({
        queryKey:['bookedTest', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/bookedTest?email=${user.email}`)
            return res.data;
        }
    })
    return [bookedTest, refetch]
};

export default useBookedTests;