import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import InputBox from "../../common/InputBox";
import fetchData from "../../../service/service";
import SelectInputBox from "../../common/SelectInputBox";
import {
  convertToNumeric,
  getCurrentDate,
  handleDateChange,
  setFocus,
  validateDate_ddMmmYYYY,
  validateEmail,
  validateMobile,
  validatePAN,
} from "../../common/common";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import DateBox from "../../common/DateBox";
import ImageUpload from "../../common/ImageUpload";
import VideoUpload from "../../common/VideoUpload";

const Dashboard = () => {
  const initialState = {
    fullName: "",
    mobileNumber: "",
    adhaarNumber: "",
    state: "",
    gender: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [stateList, setStateList] = useState([]);

  const [data, setData] = useState({});
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [pageSize, setPageSize] = useState("10");

  const countNo = Math.ceil(parseInt(data?.total) / parseInt(pageSize));
  const role = localStorage.getItem("role") || "";

  const [isOpen, setIsOpen] = useState(false);
  const [dataLoader, setDataLoder] = useState(true);
  const [editData, setEditData] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange1 = (event, pagenumber) => {
    setCurrentPageNo(pagenumber);
  };

  const getUsersList = async () => {
    let payload = {
      ...formData,
      page: currentPageNo,
      limit: pageSize,
    };
    setDataLoder(true);
    const response = await fetchData("/get-all-user-details", payload);
    setDataLoder(false);
    if (response.success) {
      setData(response);
    }
  };

  const getStateList = async () => {
    const response = await fetchData("/get-state-list");
    if (response.success) {
      setStateList(response.data);
    }
  };

  const getUserDetail = async (id) => {
    console.log(id, "idididididid");
    const response = await fetchData("/get-user-details", {
      userId: id,
    });
    if (!response.success) {
      toast.error(response.message);
    } else {
      setEditData(response.userdetails);
      setIsOpen(true);
    }
  };
  const deleteUserDetails = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want delete this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData("/delete-user-details", {
          userId: id,
        });
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          getUsersList();
        }
      }
    });
  };

  useEffect(() => {
    getStateList();
    getUsersList();
  }, [currentPageNo]);

  return (
    <>
      <div>
        <div className=" bg-white p-3 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            <InputBox
              label={"Name"}
              placeholder={"Name"}
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  fullName: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFocus("txtMobileNo");
                }
              }}
            />
            <InputBox
              label={"Mobile No"}
              placeholder={"Mobile No"}
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  mobileNumber: convertToNumeric(e.target.value, 10),
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFocus("txtAdhaarNo");
                }
              }}
            />
            <InputBox
              label={"Adhaar No"}
              placeholder={"Adhaar No"}
              value={formData.adhaarNumber}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  adhaarNumber: convertToNumeric(e.target.value, 6),
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFocus("txtState");
                }
              }}
            />

            <SelectInputBox
              label="State"
              value={formData.state ? formData.state : ""}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  state: e.target.value,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFocus("txtGender");
                }
              }}
            >
              <option value="">--Select State--</option>
              {stateList?.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </SelectInputBox>
            <SelectInputBox
              label="Gender"
              value={formData.gender ? formData.gender : ""}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  gender: e.target.value,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setFocus("btn-serach");
                }
              }}
            >
              <option value="">--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectInputBox>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button
              id="btn-serach"
              onClick={() => getUsersList()}
              className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-lime-500 to-green-600 hover:bg-gradient-to-r hover:from-lime-600 hover:to-green-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white"
            >
              Search
            </button>
            <button
              onClick={() => setFormData(initialState)}
              className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white"
            >
              Reset
            </button>
          </div>
        </div>
        {dataLoader ? (
          <div className="mt-5 bg-white p-3 rounded-xl shadow-lg h-72 flex items-center justify-center">
            <div class="loader"></div>
          </div>
        ) : (
          <div className="mt-5 bg-white p-3 rounded-xl shadow-lg">
            <div className="overflow-x-auto w-full">
              <table className="common-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Mob No</th>
                    <th>Role</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Adhaar No</th>
                    <th>PAN No</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Pincode</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.edit && (
                          <td
                            onClick={() => getUserDetail(item._id)}
                            className="text-sm font-normal text-blue-500 cursor-pointer"
                          >
                            <BiEdit />
                          </td>
                        )}
                        {role === "admin" && (
                          <td
                            onClick={() => deleteUserDetails(item._id)}
                            className="text-sm font-normal text-red-500 cursor-pointer"
                          >
                            <FaRegTrashAlt />
                          </td>
                        )}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.fullName}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.emailID}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.mobileNumber}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.role}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.dateOfBirth}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.gender}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.adhaarNumber}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.panNumber}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.state}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.city}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.pinCode}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.addressLine1}
                      </td>
                      <td className="text-sm font-normal text-zinc-700">
                        {item.addressLine2}
                      </td>
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
        )}
      </div>

      <Modal
        stateList={stateList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editData={editData}
        getUsersList={getUsersList}
      />
    </>
  );
};

export default Dashboard;

const Modal = (props) => {
  const { stateList, editData, isOpen, setIsOpen, getUsersList } = props;
  const initalState = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emailID: "",
    adhaarNumber: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
    userId: "",
    videoUrl: "",
    imageUrl: "",
  };
  const [formData, setFormData] = useState(initalState);
  const [editLoader, setEditLoader] = useState(false);

  const editUserList = async () => {
    if (formData.fullName === "") {
      setFocus("txtFullName");
      return toast.error("Full Name is required");
    } else if (formData.dateOfBirth === "") {
      setFocus("txtDOB");
      return toast.error("Date of birth is required");
    } else if (!validateDate_ddMmmYYYY(formData.dateOfBirth)) {
      setFocus("txtDOB");
      return toast.error(
        "Invalid date format. Use DD-MMM-YYYY (e.g., 12-Jul-2025)."
      );
    } else if (formData.gender === "") {
      setFocus("txtGender");
      return toast.error("Gender is required");
    } else if (formData.mobileNumber === "") {
      setFocus("txtMobileNo");
      return toast.error("Mobile No. is required");
    } else if (!validateMobile(formData.mobileNumber)) {
      setFocus("txtMobileNo");
      return toast.error("Please provide valid mobile number");
    } else if (formData.emailID === "") {
      setFocus("txtEmailID");
      return toast.error("Email Id is required");
    } else if (!validateEmail(formData.emailID)) {
      setFocus("txtEmailID");
      return toast.error("Invalid Email Id");
    } else if (formData.password === "") {
      setFocus("txtPassword");
      return toast.error("Password is required");
    } else if (formData.confirmPassword === "") {
      setFocus("txtConfirmPassword");
      return toast.error("Confirm Password is required");
    } else if (formData.password !== formData.confirmPassword) {
      setFocus("txtConfirmPassword");
      return toast.error("Password and Confirm Password are not equal");
    } else if (formData.addressLine1 === "") {
      setFocus("txtAddress1");
      return toast.error("Address 1 is required");
    } else if (formData.addressLine2 === "") {
      setFocus("txtAddress2");
      return toast.error("Address 2 is required");
    } else if (formData.state === "") {
      setFocus("txtState");
      return toast.error("State is required");
    } else if (formData.city === "") {
      setFocus("txtCity");
      return toast.error("City is required");
    } else if (formData.pinCode === "") {
      setFocus("txtPincode");
      return toast.error("Pincode is required");
    } else if (formData.adhaarNumber === "") {
      setFocus("txtAdhaarNo");
      return toast.error("Adhaar no is required");
    } else if (formData.panNumber === "") {
      setFocus("txtPANNo");
      return toast.error("Pan no is required");
    } else if (!validatePAN(formData.panNumber)) {
      setFocus("txtPANNo");
      return toast.error("Please Provide valid Pan No");
    }
    setEditLoader(true);
    const response = await fetchData("/update-user-details", formData);
    setEditLoader(false);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setIsOpen(false);
      getUsersList();
    }
  };

  console.log(editData, "testtttttttttt");
  const resetFormDetails = () => {
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      dateOfBirth: "",
      gender: "",
      mobileNumber: "",
      emailID: "",
      adhaarNumber: "",
      panNumber: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      city: "",
      pinCode: "",
      password: "",
      confirmPassword: "",
    }));
  };

  useEffect(() => {
    setFormData({
      fullName: editData.fullName,
      dateOfBirth: editData.dateOfBirth,
      gender: editData.gender,
      mobileNumber: editData.mobileNumber,
      emailID: editData.emailID,
      adhaarNumber: editData.adhaarNumber,
      panNumber: editData.panNumber,
      addressLine1: editData.addressLine1,
      addressLine2: editData.addressLine2,
      state: editData.state,
      city: editData.city,
      pinCode: editData.pinCode,
      password: editData.password,
      confirmPassword: editData.confirmPassword,
      userId: editData._id,
      imageUrl: editData.imageUrl,
      videoUrl: editData.videoUrl,
    });
  }, [editData]);

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="absolute inset-0 z-50  bg-black bg-opacity-50 p-4 h-full md:h-screen w-screen">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl h-full p-6 relative mx-auto  my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 relative">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit User Details
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 max-h-screen md:max-h-full overflow-y-auto md:overflow-y-hidden">
              <InputBox
                required={true}
                label={"Full Name"}
                placeholder={"Enter Full Name"}
                id={"txtFullName"}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    fullName: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtDOB");
                  }
                }}
              />

              <DateBox
                required={true}
                id="txtDOB"
                label="Date Of Birth"
                placeholder="Date Of Birth"
                selected={
                  formData.dateOfBirth === "" ? "" : formData.dateOfBirth
                }
                onChange={(e) =>
                  handleDateChange(e, setFormData, formData, "dateOfBirth")
                }
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtGender");
                  }
                }}
              />

              <SelectInputBox
                id="txtGender"
                label="Gender"
                required={true}
                value={formData.gender ? formData.gender : ""}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    gender: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtMobileNo");
                  }
                }}
              >
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInputBox>

              <InputBox
                required={true}
                label={"Mobile Number"}
                placeholder={"Enter Mobile Number"}
                id={"txtMobileNo"}
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    mobileNumber: convertToNumeric(e.target.value, 10),
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtEmailID");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Email ID"}
                placeholder={"Enter Email ID"}
                id={"txtEmailID"}
                value={formData.emailID}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    emailID: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtPassword");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Password"}
                type="password"
                placeholder={"Enter Password"}
                id={"txtPassword"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtConfirmPassword");
                  }
                }}
              />
              <InputBox
                required={true}
                type="password"
                label={"Confirm Password"}
                placeholder={"Enter Confirm Password"}
                id={"txtConfirmPassword"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    confirmPassword: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtAddress1");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Address 1"}
                placeholder={"Enter Address 1"}
                id={"txtAddress1"}
                value={formData.addressLine1}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    addressLine1: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtAddress2");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Address 2"}
                placeholder={"Enter Address 2"}
                id={"txtAddress2"}
                value={formData.addressLine2}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    addressLine2: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtState");
                  }
                }}
              />

              <SelectInputBox
                id="txtState"
                label="State"
                required={true}
                value={formData.state ? formData.state : ""}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    state: e.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtCity");
                  }
                }}
              >
                <option value="">--Select State--</option>
                {stateList?.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </SelectInputBox>

              <InputBox
                required={true}
                label={"City"}
                placeholder={"Enter City"}
                id={"txtCity"}
                value={formData.city}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    city: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtPincode");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Pincode"}
                placeholder={"Enter Pincode"}
                id={"txtPincode"}
                value={formData.pinCode}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    pinCode: convertToNumeric(e.target.value, 6),
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtAdhaarNo");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"Adhaar Number"}
                placeholder={"Enter Adhaar Number"}
                id={"txtAdhaarNo"}
                value={formData.adhaarNumber}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    adhaarNumber: convertToNumeric(e.target.value, 12),
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFocus("txtPANNo");
                  }
                }}
              />
              <InputBox
                required={true}
                label={"PAN Number"}
                placeholder={"Enter PAN Number"}
                id={"txtPANNo"}
                value={formData.panNumber}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    panNumber: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFocus("btn-update");
                  }
                }}
              />
              <ImageUpload
                imageUrl={formData.imageUrl}
                onUploadComplete={(url) =>
                  setFormData({ ...formData, imageUrl: url })
                }
              />
              <VideoUpload
                videoUrl={formData.videoUrl}
                onUploadComplete={(videoUrl) =>
                  setFormData({ ...formData, videoUrl: videoUrl })
                }
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6 space-x-3 border-t pt-4">
              <button
                onClick={editUserList}
                disabled={editLoader}
                id="btn-update"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {editLoader ? "Loading..." : "Update"}
              </button>
              <button
                onClick={resetFormDetails}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
