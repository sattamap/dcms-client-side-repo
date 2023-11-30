import { useQuery } from "@tanstack/react-query";

import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllBanners = () => {
    const axiosSecure = useAxiosSecure();

  const { data: banner = [], refetch } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banner");
      return res.data;
    }
  });


  const handleToggleStatus = (item) => {
    const newStatus = item.is_Active === "true" ? "false" : "true";
  
    Swal.fire({
      title: `Are you sure you want to change ${item.bannerName}'s role to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Create an array of banners with the new status
        const updatedBanners = banner.map((bannerItem) => ({
          ...bannerItem,
          is_Active: bannerItem._id === item._id ? newStatus : "false",
        }));
  
        // Update the statuses of all banners on the server
        axiosSecure.patch('/banner/updateStatus', { banners: updatedBanners }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            const statusMessage = newStatus === "true" ? "True" : "False";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.bannerName}'s role has been changed to ${statusMessage}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  };


  const handleDelete =(item)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

    
            axiosSecure.delete(`/banner/${item._id}`)
        .then(res=>{
            if(res.data.deletedCount>0){
                refetch();
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
            }
        })
        }
      });
  }


  return (
    <div>
      <div className="flex justify-evenly">
        <h2>All Users</h2>
        <h2>Total users: {banner.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banner.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.bannerName}</td>
              
                <td>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`btn btn-ghost btn-xs ${
                      item.is_Active === "true" ? "text-blue-500" : "text-green-500"
                    }`}
                  >
                    {item.is_Active === "true" ? "True" : "False"}
                  </button>
                </td>
              
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default AllBanners;


