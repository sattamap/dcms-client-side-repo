import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTests = () => {
    const axiosPublic = useAxiosPublic();

    const {data: test = [], isPending: loading, refetch} = useQuery({
        queryKey: ['test'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/tests');
            return res.data;
        }
    })


    return [test, loading, refetch]
}

export default useTests;