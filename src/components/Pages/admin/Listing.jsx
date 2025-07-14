import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

const Listing = () => {
  const [data, setData] = useState({});
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [pageSize, setPageSize] = useState("10");

  const countNo = Math.ceil(
    parseInt(data?.total) / parseInt(pageSize)
  );

  const handleChange1 = (event, pagenumber) => {
    setCurrentPageNo(pagenumber);
  };

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:8080/get-data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: currentPageNo,
        limit: pageSize,
      }),
    });

    const result = await res.json();
    setData(result)
    console.log(result, 'result');
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

console.log(data, 'datadatadata')

useEffect(() => {
  fetchData();
}, [currentPageNo]);



  return (
    <div>
      <div className="mt-5 bg-white p-3 rounded-xl shadow-lg">
        <div className="overflow-x-auto w-full">
          <table className="common-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Album ID</th>
                <th>Title</th>
                <th>Url</th>
                <th>thumbnailUrl</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((item, index) => (
                <tr key={index}>
                  <td className="text-sm font-normal text-zinc-700">{index+1}</td>
                  <td className="text-sm font-normal text-zinc-700">{item.albumId}</td>
                  <td className="text-sm font-normal text-zinc-700">{item.title.toString().padEnd(10, ' ').slice(0, 10)}</td>
                  <td className="text-sm font-normal text-zinc-700">{item.url}</td>
                  <td className="text-sm font-normal text-zinc-700">{item.thumbnailUrl}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          {countNo > 1 ? (
            <div className="mt-2 flex items-center justify-between">
              <div className="">
                Showing page {currentPageNo} of {countNo}
              </div>
              <div className="">
                <Pagination
                  className="text-nowrap pb-1"
                  count={countNo}
                  size="small"
                  variant="outlined"
                  page={currentPageNo}
                  onChange={handleChange1}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
