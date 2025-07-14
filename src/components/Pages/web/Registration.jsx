import React, { useEffect, useState } from "react";
import InputBox from "../../common/InputBox";
import {
  convertToNumeric,
  getBeforeDate,
  getCurrentDate,
  handleDateChange,
  setFocus,
  validateDate_ddMmmYYYY,
  validateEmail,
  validateMobile,
  validatePAN,
} from "../../common/common";
import DateBox from "../../common/DateBox";
import SelectInputBox from "../../common/SelectInputBox";
import toast from "react-hot-toast";
import fetchData from "../../../service/service";
import { useNavigate } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import ImageUpload from "../../common/ImageUpload";
import VideoUpload from "../../common/VideoUpload";

const Registration = () => {
  const initialState = {
    fullName: "",
    dateOfBirth: getCurrentDate(),
    gender: "",
    mobileNumber: "",
    emailID: "",
    adhaarNumber: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    role: "user",
    city: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
    videoUrl: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [stateList, setStateList] = useState([]);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (formData.fullName.trim() === "") {
      setFocus("txtFullName");
      return toast.error("Full Name is required");
    } else if (formData.dateOfBirth.trim() === "") {
      setFocus("txtDOB");
      return toast.error("Date of birth is required");
    } else if (!validateDate_ddMmmYYYY(formData.dateOfBirth)) {
      setFocus("txtDOB");
      return toast.error(
        "Invalid date format. Use DD-MMM-YYYY (e.g., 12-Jul-2025)."
      );
    } else if (formData.gender.trim() === "") {
      setFocus("txtGender");
      return toast.error("Gender is required");
    } else if (formData.mobileNumber.trim() === "") {
      setFocus("txtMobileNo");
      return toast.error("Mobile No. is required");
    } else if (!validateMobile(formData.mobileNumber)) {
      setFocus("txtMobileNo");
      return toast.error("Please provide valid mobile number");
    } else if (formData.emailID.trim() === "") {
      setFocus("txtEmailID");
      return toast.error("Email Id is required");
    } else if (!validateEmail(formData.emailID.trim())) {
      setFocus("txtEmailID");
      return toast.error("Invalid Email Id");
    } else if (formData.password.trim() === "") {
      setFocus("txtPassword");
      return toast.error("Password is required");
    } else if (formData.confirmPassword.trim() === "") {
      setFocus("txtConfirmPassword");
      return toast.error("Confirm Password is required");
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setFocus("txtConfirmPassword");
      return toast.error("Password and Confirm Password are not equal");
    } else if (formData.addressLine1.trim() === "") {
      setFocus("txtAddress1");
      return toast.error("Address 1 is required");
    } else if (formData.addressLine2.trim() === "") {
      setFocus("txtAddress2");
      return toast.error("Address 2 is required");
    } else if (formData.state.trim() === "") {
      setFocus("txtState");
      return toast.error("State is required");
    } else if (formData.city.trim() === "") {
      setFocus("txtCity");
      return toast.error("City is required");
    } else if (formData.pinCode.trim() === "") {
      setFocus("txtPincode");
      return toast.error("Pincode is required");
    } else if (formData.adhaarNumber.trim() === "") {
      setFocus("txtAdhaarNo");
      return toast.error("Adhaar no is required");
    } else if (formData.panNumber.trim() === "") {
      setFocus("txtPANNo");
      return toast.error("Pan no is required");
    } else if (!validatePAN(formData.panNumber.trim())) {
      setFocus("txtPANNo");
      return toast.error("Please Provide valid Pan No");
    } else if (formData.imageUrl.trim() === "") {
      return toast.error("Image is required");
    } else if (formData.videoUrl.trim() === "") {
      return toast.error("Video is required");
    }
    const response = await fetchData("/register", formData);

    if (response.success) {
      toast.success(response.message);
      setFormData(initialState);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };
  const getStateList = async () => {
    const response = await fetchData("/get-state-list");
    if (response.success) {
      setStateList(response.data);
    }
  };
  useEffect(() => {
    document.title = "Registration";
    getStateList();
  }, []);

  return (
    <div className="bg-[#EEF2F5] h-screen flex justify-between flex-col ">
      <div>
        <header className="antialiased bg-white ">
          <nav className="px-5 py-5 ">
            <div className="flex items-center justify-between">
              <div className="flex justify-start items-center w-full gap-2">
                <div className="h-8 w-8 bg-black rounded-full flex justify-center items-center">
                  <p className="text-white text-xl">A</p>
                </div>
                <div className="text-2xl font-bold hidden md:block  text-black text-center">
                  Assignment
                </div>
              </div>
              <div className="flex items-center lg:order-2 gap-3">
                <p className="text-sm underline">Registration</p>
                <button
                  id="login_btn"
                  onClick={(e) => navigate("/login")}
                  className={`w-full rounded-md bg-gradient-to-r from-blue-900 via-purple-900 to-orange-500 px-6 py-1 text-md font-semibold text-white shadow-lg transition-all ease-in hover:shadow-none hover:-translate-y-1`}
                >
                  Login
                </button>
              </div>
            </div>
          </nav>
        </header>

        <div className="m-5">
          <div className=" bg-white p-3 rounded-xl shadow-lg ">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-2xl bg-slate-50 w-xs border border-blue-500 p-4 mb-4">
              <legend className="fieldset-legend py-1 px-4 text-white font-semibold bg-gradient-to-r from-blue-900 via-purple-900 to-orange-500 text-sm rounded-full ">
                Basic Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                  label={"Confirm Password"}
                  type="password"
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
                      setFocus("txtRole");
                    }
                  }}
                />
                <SelectInputBox
                  id="txtRole"
                  label="Role"
                  required={true}
                  value={formData.role ? formData.role : ""}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      role: e.target.value,
                    }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setFocus("txtAddress1");
                    }
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </SelectInputBox>
              </div>
            </fieldset>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-2xl bg-slate-50 w-xs border border-blue-500 p-4 mb-4">
              <legend className="fieldset-legend py-1 px-4 text-white font-semibold bg-gradient-to-r from-blue-900 via-purple-900 to-orange-500 text-sm rounded-full ">
                Address Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                />
              </div>
            </fieldset>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-2xl bg-slate-50 w-xs border border-blue-500 p-4">
              <legend className="fieldset-legend py-1 px-4 text-white font-semibold bg-gradient-to-r from-blue-900 via-purple-900 to-orange-500 text-sm rounded-full ">
                Addional Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-8">
                <ImageUpload
                  imageUrl={""}
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, imageUrl: url })
                  }
                />

                <VideoUpload
                  videoUrl={""}
                  onUploadComplete={(videoUrl) =>
                    setFormData({ ...formData, videoUrl: videoUrl })
                  }
                />

                {/* <div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    <div className="flex items-center gap-2">
                      Upload Video
                      <FaRegCirclePlay
                        title="Preview Video"
                        className="cursor-pointer text-lg"
                      />
                    </div>
                  </label>
                  <section class="h-full overflow-auto w-full flex flex-col">
                    <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                      <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                        <span>Drag and drop your</span>&nbsp;
                        <span>files anywhere or</span>
                      </p>
                      <input
                        id="hidden-input"
                        type="file"
                        multiple
                        class="hidden"
                      />
                      <button
                        id="button"
                        class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                      >
                        Upload a video
                      </button>
                    </header>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm">Accept only MP4/MOV </div>
                      <div className="text-sm">maximum size of 10 MB</div>
                    </div>
                  </section>
                </div> */}
              </div>
            </fieldset>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={handleRegistration}
                id="btn_submit"
                className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-lime-500 to-green-600 hover:bg-gradient-to-r hover:from-lime-600 hover:to-green-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white"
              >
                Register
              </button>
              <button className="rounded-lg py-[10px] px-5 bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-sm font-semibold flex items-center justify-center m-0 leading-none shadow-lg shadow-yellow-100 text-white">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white shadow-lg flex justify-center items-center py-2">
        <div>Copyright : Assignment 2025</div>
      </footer>
    </div>
  );
};

export default Registration;
