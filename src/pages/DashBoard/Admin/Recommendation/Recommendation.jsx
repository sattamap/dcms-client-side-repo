
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


//import DatePicker from "react-multi-date-picker";



const Recommendation = () => {
    const { register, handleSubmit, reset} = useForm()
    const axiosPublic = useAxiosPublic();

 

    const onSubmit = async (data) =>{
 
         console.log("add data", data);
        if (data) {
        
            // now send the menu item data to the server with the image url
            const info = {
              
                type: data.type,
                title: data.title,
                description: data.description,
                
            }
            // 
            const result = await axiosPublic.post('/recommendation', info);
            console.log(result.data)
            if(result.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
       
    };

    //test name ,image url, details, price, date, slots etc.
    return (
        <div>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Type</span>
  </label>
  <input type="text" placeholder="Type" {...register("type" , {required: true})} required  className="input input-bordered w-full " />

</div>
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Title</span>
  </label>
  <input type="text" placeholder="Title" {...register("title" , {required: true})} required  className="input input-bordered w-full " />

</div>

<div className="form-control">
  <label className="label">
    <span className="label-text"> Description</span>
  </label>
  <textarea {...register('description', {required: true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
 
</div>


<button className="btn mt-10 bg-emerald-700 hover:bg-emerald-950 hover:text-white">
  Add Recommendation info
</button>
    </form>
            </div>
        </div>
    );
};

export default Recommendation;