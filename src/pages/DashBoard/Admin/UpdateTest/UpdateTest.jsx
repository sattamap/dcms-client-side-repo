import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";




const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateTest = () => {
    

    const {testName,price,date,slots,details, _id} = useLoaderData();
    console.log(testName, _id);
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    //const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const testItem = {
                testName: data.testName,
                price: parseFloat(data.price),
                date: data.date,
                slots: parseFloat(data.slots),
                details: data.details,
                image: res.data.data.display_url
            }
            // 
            const testData = await axiosPublic.patch(`/test/${_id}`, testItem);
            console.log(testData.data)
            if(testData.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.testName} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };
    
    return (
        <div>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
<div className="flex gap-6">
<div className="form-control w-full ">
<label className="label">
<span className="label-text">Test Name</span>
</label>
<input type="text" defaultValue={testName} placeholder="Test Name" {...register("testName" , {required: true})} required  className="input input-bordered w-full " />

</div>
<div className="form-control w-full">
          <label className="label">
            <span className="label-text"> Date</span>
          </label>
          <input
            type="text"
            defaultValue={date}
            placeholder=" Date"
            {...register("date", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
</div>
<div className="flex gap-6">

<div className="form-control w-full ">
<label className="label">
<span className="label-text">Price</span>
</label>
<input type="text" defaultValue={price} placeholder="Price" {...register("price", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
<label className="label">
<span className="label-text">Slots</span>
</label>
<input
type="number"
defaultValue={slots}
placeholder="Slots"
{...register('slots', { required: true })}
className="input input-bordered w-full"
/>
</div>

</div>
<div className="form-control">
<label className="label">
<span className="label-text"> Details</span>
</label>
<textarea {...register('details', {required: true})} className="textarea textarea-bordered h-24" placeholder="Details" defaultValue={details}></textarea>

</div>
<div className="form-control w-full my-6">
<input {...register('image')} type="file" className="file-input w-full max-w-xs"  />
</div>
  
 <button className="btn">
    Update Test
 </button>
</form>
        </div>
    </div>
    );
};

export default UpdateTest;