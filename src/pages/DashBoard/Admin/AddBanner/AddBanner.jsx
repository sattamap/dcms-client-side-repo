import {  useForm } from "react-hook-form"
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {
    const { register, handleSubmit, reset} = useForm()
    const axiosPublic = useAxiosPublic();
  
   
 

    const onSubmit = async (data) =>{
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
       
            // now send the menu item data to the server with the image url
            const bannerItem = {
              
                bannerName: data.bannerName,
                bannerTitle: data.bannerTitle,
                description: data.description,
                couponCode: data.couponCode,
                couponRate: parseFloat(data.couponRate),
                image: res.data.data.display_url,
                is_Active: 'true'
            }
            // 
            const bannerResult = await axiosPublic.post('/banner', bannerItem);
           
            if(bannerResult.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.bannerName} is added to the menu.`,
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
<div className="flex gap-6">
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Banner Name</span>
  </label>
  <input type="text" placeholder="Banner Name" {...register("bannerName" , {required: true})} required  className="input input-bordered w-full " />

</div>
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Banner Title</span>
  </label>
  <input type="text" placeholder="Banner Title" {...register("bannerTitle", {required: true})}  className="input input-bordered w-full " />

</div>
</div>
<div className="flex gap-6">

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Coupon Code</span>
  </label>
  <input type="text" placeholder="Coupon Code" {...register("couponCode", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Coupon Rate</span>
  </label>
  <input
    type="number"
    placeholder="Coupon Rate"
    {...register('couponRate', { required: true })}
    className="input input-bordered w-full"
  />
</div>

</div>
<div className="flex gap-6">


</div>
<div className="form-control">
  <label className="label">
    <span className="label-text"> Description</span>
  </label>
  <textarea {...register('description', {required: true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
 
</div>
<div className="form-control w-full my-6">
<input {...register('image')} type="file" className="file-input w-full max-w-xs" />
</div>
      
     <button className="btn">
        Add Test
     </button>
    </form>
            </div>
        </div>
    );
};

export default AddBanner;