
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Select from 'react-select';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';


const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTestName, setSelectedTestName] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const queryClient = useQueryClient();

  const [selectedFiles, setSelectedFiles] = useState({});

  const { data: bookedTests = [] } = useQuery({
    queryKey: ['bookedTests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookedTests');
      return res.data;
    },
  });

  const distinctTestNames = ['All', ...new Set(bookedTests.map((item) => item.testName))];
  const testNameOptions = distinctTestNames.map((testName) => ({
    label: testName,
    value: testName,
  }));

  const filteredBookedTests =
    selectedTestName && selectedTestName.value !== 'All'
      ? bookedTests.filter((item) => item.testName === selectedTestName.value)
      : bookedTests;

  const emailFilteredBookedTests =
    searchEmail.trim() !== ''
      ? filteredBookedTests.filter(
          (item) =>
            item.email && item.email.toLowerCase().includes(searchEmail.toLowerCase())
        )
      : filteredBookedTests;

  const handleFileChange = (e, itemId) => {
    const file = e.target.files[0];
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [itemId]: file,
    }));
  };

  const handlePdfLinkSubmit = async (reservationId) => {
    try {
      const selectedFile = selectedFiles[reservationId];

      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const pdf = new jsPDF();
      pdf.text('Hello, this is a sample PDF!', 10, 10);

      // Save the PDF as a blob
      const pdfBlob = pdf.output('blob');

      // Create a FormData object and append the PDF blob
      const formData = new FormData();
      formData.append('file', pdfBlob, 'sample.pdf');

      // Send the PDF blob to the server
      const uploadResponse = await axiosSecure.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload Response:', uploadResponse);


      const result = uploadResponse.data;

      if (result.link) {
        const pdfLink = result.link;
        await axiosSecure.patch(`/bookedTests/${reservationId}`, {
          report: 'delivered',
          pdfLink,
        });
        console.log(`PDF link submitted for reservation with ID ${reservationId}`);
      } else {
        console.error('Server did not return a valid PDF link.');
      }
    } catch (error) {
      console.error('Error submitting PDF link:', error);
    }
  };  


 

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookedTest/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Invalidate and refetch the 'bookedTests' query
              queryClient.invalidateQueries('bookedTests');

              // Optionally perform any other actions after deletion
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              });
            }
          })
          .catch((error) => {
            console.error('Error deleting reservation:', error);
          });
      }
    });
  };
    

    
  return (
    <div>
      <div className="flex justify-between bg-teal-300 px-4">
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Filter by Test Name:</span>
          </label>
          <Select
            options={testNameOptions}
            value={selectedTestName}
            onChange={(value) => setSelectedTestName(value)}
            placeholder="Select Test Name"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">ALL Reservations </h2>
        </div>
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Search by Email:</span>
          </label>
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Enter Email"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {emailFilteredBookedTests.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.testName}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
                <td>{item?.email || 'no email'}</td>
             
                <td>
        <label className="label mt-2">
          <span className="label-text">PDF File:</span>
        </label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, item._id)}
          className="input input-bordered w-full"
        />
        <button
          onClick={() => handlePdfLinkSubmit(item._id)}
          className="btn btn-primary mt-2"
          disabled={!selectedFiles[item._id]}
        >
          Submit
        </button>
      </td>
      <th>
          <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-xs">
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

export default Reservation;






    {/* <th>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th> */}

                // const [reportContent, setReportContent] = useState('');
                // //const [pdfLink, setPdfLink] = useState('');
                // const [openEditorForReservation, setOpenEditorForReservation] = useState(null);
                    //   const handlePdfLinkSubmit = async (reservationId) => {
    //     try {
    //       // Send a PATCH request to update the reservation with the provided PDF link
    //       await axiosSecure.patch(`/bookedTests/${reservationId}`, { report: 'delivered', pdfLink });
    //       console.log(`PDF link submitted for reservation with ID ${reservationId}`);
    
    //       // Close the editor after submission
    //       setOpenEditorForReservation(null);
    //     } catch (error) {
    //       console.error('Error submitting PDF link:', error);
    //     }
    //   };




    // const handleOpenEditor = (reservationId) => {
    //     setOpenEditorForReservation(reservationId);
    //   };
    // const handleReportSubmit = async (reservationId) => {
    //     console.log(`Submitting report for reservation with ID ${reservationId}`);
    //     console.log('Report Content:', reportContent);
    
    //     setOpenEditorForReservation(null);
    //   };
       
    // <td>
    // {openEditorForReservation === item._id ?  (
    //     <div>
    //       <ReactQuill value={reportContent} onChange={setReportContent} />
    //       <button
    //         onClick={() => handleReportSubmit(item._id)}
    //         className="btn btn-primary"
    //       >
    //         Submit Report
    //       </button>
    //     </div>
    //   ) : (
    //     <button onClick={() => handleOpenEditor(item._id)} className="btn btn-primary">
    //       Make Report
    //     </button>
    //   )}
    // </td>




//     import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import Select from 'react-select';
// import 'react-quill/dist/quill.snow.css';


// const Reservation = () => {
//   const axiosSecure = useAxiosSecure();
//   const [selectedTestName, setSelectedTestName] = useState(null);
//   const [searchEmail, setSearchEmail] = useState('');

//   const [selectedFiles, setSelectedFiles] = useState({});

//   const { data: bookedTests = [] } = useQuery({
//     queryKey: ['bookedTests'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/bookedTests');
//       return res.data;
//     },
//   });

//   // Extract distinct test names
//   const distinctTestNames = ['All', ...new Set(bookedTests.map((item) => item.testName))];

//   // Options for the react-select dropdown
//   const testNameOptions = distinctTestNames.map((testName) => ({
//     label: testName,
//     value: testName,
//   }));

//   // Filter the bookedTests based on the selected testName
//   const filteredBookedTests =
//     selectedTestName && selectedTestName.value !== 'All'
//       ? bookedTests.filter((item) => item.testName === selectedTestName.value)
//       : bookedTests;

//   // Filter the bookedTests based on the entered email
//   const emailFilteredBookedTests =
//     searchEmail.trim() !== ''
//       ? filteredBookedTests.filter(
//           (item) =>
//             item.email && item.email.toLowerCase().includes(searchEmail.toLowerCase())
//         )
//       : filteredBookedTests;

   

//       const handleFileChange = (e, itemId) => {
//         const file = e.target.files[0];
//         setSelectedFiles((prevFiles) => ({
//           ...prevFiles,
//           [itemId]: file,
//         }));
//       };
//     // const handleFileChange = (e) => {
//     //     const file = e.target.files[0];
//     //     console.log('Selected File:', file);
//     //     setSelectedFiles(file);
//     //   };
    
//     const handlePdfLinkSubmit = async (reservationId) => {
//         try {
//           const selectedFile = selectedFiles[reservationId];
      
//           if (!selectedFile) {
//             console.error('No file selected');
//             return;
//           }
      
//           console.log('Selected File:', selectedFile);
      
//           const formData = new FormData();
//           formData.append('file', selectedFile);
//           console.log('FormData:', formData);
//           const uploadResponse = await axiosSecure.post('/upload', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
      
//           console.log('Upload Response:', uploadResponse);
      
//           const pdfLink = uploadResponse.data.link;
      
//           if (pdfLink !== null) {
//             await axiosSecure.patch(`/bookedTests/${reservationId}`, { report: 'delivered', pdfLink });
//             console.log(`PDF link submitted for reservation with ID ${reservationId}`);
//           } else {
//             console.error('Server did not return a valid PDF link.');
//           }
       
//         } catch (error) {
//           console.error('Error submitting PDF link:', error);
//         }
//       };