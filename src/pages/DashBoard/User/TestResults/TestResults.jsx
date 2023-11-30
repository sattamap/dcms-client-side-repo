import useBookedTests from "../../../../hooks/useBookedTests";


const TestResults = () => {
    const [bookedTest] = useBookedTests();

    // const handleDownload = (item) => {
    //     if (item.report === 'delivered' && item.pdfLink) {
    //         const link = document.createElement('a');
    //         link.href = item.pdfLink;
    //         link.target = '_blank';
    //         link.download = `report_${item._id}.pdf`;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } else {
    //         // Provide feedback to the user that the report is not available for download
    //         console.log('Report not available for download');
    //     }
    // };
 const handleDownload = async (pdfLink) => {
  try {
    console.log('Downloading from:', pdfLink);

    const response = await fetch(pdfLink);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'report.pdf';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
      
    return (
        <div>
            <div className="flex justify-evenly mb-8">
                <h1 className="text-2xl">Items: {bookedTest.length}</h1>

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
                            <th>Email</th>
                            <th>Report Status</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            bookedTest.map((item, index) =>
                                <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {item.testName}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.report}</td>
                                    <td>
                                    {item.report === 'delivered' && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleDownload(item.pdfLink)}
                                        >
                                            Download
                                        </button>
                                    )}
                                    {item.report !== 'delivered' && (
                                        <span>Report not available</span>
                                    )}
                                </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestResults;