// import { useState, useEffect } from 'react';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import { Link } from 'react-router-dom';


// const AllTests = () => {
//   const [tests, setTests] = useState([]);
//   const [filteredTests, setFilteredTests] = useState([]);
//   const [searchDate, setSearchDate] = useState('');
//   const axiosPublic = useAxiosPublic();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosPublic.get('/testsCount');
//         setCount(response.data.count);
//       } catch (error) {
//         console.error('Error fetching product count:', error);
//       }
//     };

//     fetchData();
//   }, [axiosPublic]);

//   const numberOfPages = Math.ceil(count / itemsPerPage);
//   const pages = [...Array(numberOfPages).keys()];

//   useEffect(() => {
//     const currentDate = new Date().toISOString().split('T')[0];
//     axiosPublic.get(`/tests?startDate=${currentDate}`).then((response) => {
//       setTests(response.data);
//       setFilteredTests(response.data);
//     });
//   }, [axiosPublic]);

//   const handleSearch = () => {
//     // Filter tests based on the selected date
//     const filtered = tests.filter((test) =>
//       test.date.includes(searchDate)
//     );
//     setFilteredTests(filtered);
//     setCurrentPage(0); // Reset current page when applying a new search
//   };

//   const handleItemsPerPage = (e) => {
//     const val = parseInt(e.target.value);
//     setItemsPerPage(val);
//     setCurrentPage(0); // Reset current page when changing items per page
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedTests = filteredTests.slice(startIndex, endIndex);

//   return (
//     <div>
//       <div className='bg-teal-600 p-10 my-6'>
//         <input
//         className='p-4 rounded-l-xl border-r-black'
//           type="text"
//           placeholder="yyyy-mm-dd"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//         />
//         <button className=' bg-stone-600 text-slate-200 p-4 rounded-r-lg' onClick={handleSearch}> Search</button>
//       </div>
//       <div className="tests-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {paginatedTests.map((test) => (
//           <div key={test._id} className="card w-72 bg-base-100 shadow-xl">
//             <figure><img className='w-full h-40 object-cover' src={test.image} alt={test.testName} /></figure>
//             <div className="card-body mt-2 ">
//               <h2 className="card-title text-sm font-bold">{test.testName}</h2>
//               <p className='text-xs font-bold'>Booking Date : {test.date}</p>
//               <p className='text-xs font-bold'>Available Slots : {test.slots}</p>
//               <div className="mt-4">
//                 <Link to={`/tests/${test._id}`}><button className="btn btn-secondary w-full">Details</button></Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className='text-center mt-10 mb-10'>
//         <p>Current page: {currentPage}</p>
//         <button onClick={handlePrevPage}>Prev</button>
//         {
//           pages.map(page => <button
//             className={currentPage === page ? 'bg-orange mr-2' : undefined}
//             onClick={() => setCurrentPage(page)}
//             key={page}
//           >{page}</button>)
//         }
//         <button onClick={handleNextPage}>Next</button>
//         <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//           <option value="50">50</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default AllTests;



import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/testsCount');
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    axiosPublic.get(`/tests?startDate=${currentDate}`).then((response) => {
      setTests(response.data);
      setFilteredTests(response.data);
    });
  }, [axiosPublic]);

  const handleSearch = () => {
    // Filter tests based on the selected date
    const filtered = tests.filter((test) => test.date.includes(searchDate));
    setFilteredTests(filtered);
    setCurrentPage(0); // Reset current page when applying a new search
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0); // Reset current page when changing items per page
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, endIndex);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search by date "
            variant="outlined"
            type="text"
            placeholder="yyyy-mm-dd"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ height: '100%' }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {paginatedTests.map((test) => (
          <Grid key={test._id} item xs={12} md={6} lg={3}>
            <Card>
              <img
                src={test.image}
                alt={test.testName}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {test.testName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Booking Date: {test.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available Slots: {test.slots}
                </Typography>
                <div style={{ marginTop: '10px' }}>
                  <Link to={`/tests/${test._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{
                      backgroundColor: '#4dd0e1',
                      '&:hover': {
                        backgroundColor: '#004d40',
                      },
                    }} fullWidth>
                      Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="text-center mt-10 mb-10">
        <Typography>Current page: {currentPage}</Typography>
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={currentPage === page ? 'contained' : 'outlined'}
          >
            {page}
          </Button>
        ))}
        <Button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          Next
        </Button>
        <Select value={itemsPerPage} onChange={handleItemsPerPage} variant="outlined">
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </div>
    </Container>
  );
};

export default AllTests;
