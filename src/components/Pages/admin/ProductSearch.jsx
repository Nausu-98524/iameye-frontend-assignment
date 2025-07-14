import React from "react";

const ProductSearch = () => {
  return (
    <>
      <div className=" bg-white p-3 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="mb-1">
            <label
              for="manpower"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Provider Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="manpower"
              className="bg-blue-50 border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 "
            />
          </div>
          <div className="mb-1">
            <label
              for="hrswork"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Sub-Provider Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="hrswork"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            />
          </div>
          <div className="mb-1">
            <label
              for="time"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Booking Date Range <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-1">
              <input
                type="time"
                id="time"
                className="bg-blue-50 border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 "
              />
              <input
                type="time"
                id="time"
                className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
              />
            </div>
          </div>
          <div className="mb-1">
            <label
              for="worktime"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Booking ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="worktime"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            />
          </div>
          <div className="mb-1">
            <label
              for="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              type="email"
              id="email"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            >
              <option value="">--Select--</option>
              <option value="">Train</option>
              <option value="">Flight</option>
              <option value="">Hotel</option>
            </select>
          </div>
          <div className="mb-1">
            <label
              for="worklocation"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Work Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="worklocation"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            />
          </div>
          <div className="mb-1">
            <label
              for="worktime"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Payment Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="worktime"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            />
          </div>
          <div className="mb-1">
            <label
              for="Manul"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Manual Verification required (Y/N){" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="Manul"
              className="bg-[#F5F5F5] border border-[E2E2E2] text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full p-2.5 "
            >
              <option value="">--Select--</option>
              <option value="">Yes</option>
              <option value="">No</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <button className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-lime-500 to-green-600 hover:bg-gradient-to-r hover:from-lime-600 hover:to-green-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white">
            Search
          </button>
          <button className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 bg-white p-3 rounded-xl shadow-lg">
        <div className="overflow-x-auto w-full">
          <table className="common-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Work Type</th>
                <th>No of Required Manpower</th>
                <th>Hours of Work</th>
                <th>Reporting Date&Time</th>
                <th>Work Timing</th>
                <th>Work Location</th>
                <th>Payment Amount</th>
                <th>Manual Verification </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index}>
                  <td className="text-sm font-normal text-zinc-700">01</td>
                  <td className="text-sm font-normal text-zinc-700">Loading</td>
                  <td className="text-sm font-normal text-zinc-700">10</td>
                  <td className="text-sm font-normal text-zinc-700">8 hrs</td>
                  <td className="text-sm font-normal text-zinc-700">9 A.M</td>
                  <td className="text-sm font-normal text-zinc-700">
                    9:30 A.M
                  </td>
                  <td className="text-sm font-normal text-zinc-700">Delhi</td>
                  <td className="text-sm font-normal text-zinc-700">20,000</td>
                  <td className="text-sm font-normal text-zinc-700">Yes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
