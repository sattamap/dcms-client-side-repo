import { useQuery } from "@tanstack/react-query";

import { FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users = [],isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleToggleRole = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    Swal.fire({
      title: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            const roleMessage = newRole === "admin" ? "Admin" : "User";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name}'s role has been changed to ${roleMessage}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "active" ? "blocked" : "active";

    Swal.fire({
      title: `Are you sure you want to ${newStatus === "active" ? "activate" : "block"} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newStatus === "active" ? "activate" : "block"} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            const statusMessage = newStatus === "active" ? "activated" : "blocked";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name}'s status has been ${statusMessage}`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  };
  const handleDelete =(user)=>{
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

    
            axiosSecure.delete(`/users/${user._id}`)
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


  const handleSeeInfo = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };


  return (
    <div>
      <div className="flex justify-evenly bg-emerald-900 p-10">
        <h2 className="text-2xl text-slate-100 font-extrabold">All Users</h2>
        <h2 className="text-2xl text-slate-100 font-extrabold">Total users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra mt-10">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Status</th>
              <th>User Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleToggleRole(user)}
                    className={`btn btn-ghost btn-xs ${
                      user.role === "admin" ? "text-blue-500" : "text-green-500"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`btn btn-ghost btn-xs ${
                      user.status === "active" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Blocked"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleSeeInfo(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    See Info
                  </button>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(user)}
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

     {/* Modal for user info */}
     <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="User Information"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            width: '50%', // Adjust the width as needed
            margin: 'auto',
            borderRadius: '8px',
            padding: '20px',
          },
        }}
      >
         <button
          onClick={handleCloseModal}
          className="absolute top-0 right-0 p-2 cursor-pointer"
        >
          {/* Close icon */}
          <FaTimes />
        </button>
        {selectedUser && (
          <div className="flex items-center justify-center gap-4">
           <div> <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Blood Group:</strong> {selectedUser.bloodGroup}</p>
            <p><strong>District:</strong> {selectedUser.district}</p>
            <p><strong>Upazila:</strong> {selectedUser.upazila}</p></div>
           <div><img src={selectedUser.photoURL} alt={selectedUser.name} /></div>
            
          </div>
        )}
      </Modal>
    
    </div>
  );
};

export default AllUsers;