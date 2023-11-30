import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useBookedTests from "../../../../hooks/useBookedTests";
import { FaTrash } from "react-icons/fa";



const Appointments = () => {
    const [bookedTest, refetch] = useBookedTests();
    const axiosSecure = useAxiosSecure(); 

    const totalPrice = bookedTest.reduce((total, item)=> total+item.price,0)

    const handleDelete = (id) =>{
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

        
            axiosSecure.delete(`/bookedTest/${id}`)
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
        <div className="flex justify-evenly mb-8">
<h1 className="text-2xl">Items: {bookedTest.length}</h1>
<h1 className="text-2xl">Total Price: {totalPrice}</h1>
{/* {cart.length ? <Link to="/dashboard/payment">
        <button className="btn btn-primary">Pay</button>
    </Link>:
    <button disabled className="btn btn-primary">Pay</button>
    } */}
</div>
<div className="overflow-x-auto ">
<table className="table w-full">
{/* head */}
<thead>
<tr>
  <th>
    #
  </th>
  <th>Name</th>
  <th>Test Date</th>
  <th>Price</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
{/* row 1 */}

 {
    bookedTest.map((item, index) =>
        <tr key={item._id}>
        <th>
          {index+1}
        </th>
        <td>
        {item.testName}
        </td>
        <td>
         {item.date}
        </td>
        <td>${item.price}</td>
        <th>
          <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-xs">
            <FaTrash></FaTrash>
          </button>
        </th>
      </tr>

    )
 }


</tbody>


</table>
</div>
</div>
    );
};

export default Appointments;