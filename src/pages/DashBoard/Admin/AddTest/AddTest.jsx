import {  useForm } from "react-hook-form"
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useState } from "react";
import DatePicker from 'react-datepicker';
//import DatePicker from "react-multi-date-picker";







const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTest = () => {
    const { register, handleSubmit, reset} = useForm()
    const axiosPublic = useAxiosPublic();
   const [selectedDate, setSelectedDate] = useState(null);
   
 

    const onSubmit = async (data) =>{
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
          const formattedDate = selectedDate
          ? format(selectedDate, 'yyyy-MM-dd')
          : null;
            // now send the menu item data to the server with the image url
            const testItem = {
              
                testName: data.testName,
                price: parseFloat(data.price),
                date: formattedDate,
                slots: parseFloat(data.slots),
                sampleType: data.sampleType,
                preTestInfo: data.preTestInfo,
                details: data.details,
                image: res.data.data.display_url
            }
            // 
            const testResult = await axiosPublic.post('/tests', testItem);
            console.log(testResult.data)
            if(testResult.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.testName} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };

    //test name ,image url, details, price, date, slots etc.
    return (
        <div>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
<div className="flex gap-6">
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Test Name</span>
  </label>
  <input type="text" placeholder="Test Name" {...register("testName" , {required: true})} required  className="input input-bordered w-full " />

</div>
<div className="form-control w-full">
              <label className="label">
                <span className="label-text"> Date</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                className="input input-bordered w-full"
              />
            </div>
</div>
<div className="flex gap-6">

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Price</span>
  </label>
  <input type="text" placeholder="Price" {...register("price", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Slots</span>
  </label>
  <input
    type="number"
    placeholder="Slots"
    {...register('slots', { required: true })}
    className="input input-bordered w-full"
  />
</div>

</div>
<div className="flex gap-6">

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Sample Type</span>
  </label>
  <input type="text" placeholder="Sample Type" {...register("sampleType", {required: true})}  className="input input-bordered w-full " />

</div>


<div className="form-control w-full">
  <label className="label">
    <span className="label-text">Pre Test Information</span>
  </label>
  <input
    type="text"
    placeholder="Pre Test Info"
    {...register('preTestINfo', { required: true })}
    className="input input-bordered w-full"
  />
</div>

</div>
<div className="form-control">
  <label className="label">
    <span className="label-text"> Details</span>
  </label>
  <textarea {...register('details', {required: true})} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
 
</div>
<div className="form-control w-full my-6">
<input {...register('image')} type="file" className="file-input w-full max-w-xs" />
</div>
      
<button className="btn mt-10 bg-emerald-700 hover:bg-emerald-950 hover:text-white">
  Add Test
</button>
    </form>
            </div>
        </div>
    );
};

export default AddTest;