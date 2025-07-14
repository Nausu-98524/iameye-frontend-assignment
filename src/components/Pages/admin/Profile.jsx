import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import fetchData from "../../../service/service";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem("user_id") || "";

  const getUserDetail = async () => {
    const response = await fetchData("/get-user-details", {
      userId: userId,
    });
    if (!response.success) {
      toast.error(response.message);
    } else {
      setUserDetails(response.userdetails);
    }
  };

  useEffect(() => {
    if (userId !== "" && userId !== undefined) {
      getUserDetail();
    }
  }, [userId]);

  return (
    <>
      <div className="mt-1 mb-5 py-5 px-8 flex justify-between items-center rounded-xl bg-white shadow-lg">
        {/* Left Side: User Info */}
        <div className="flex gap-8 items-center">
          <div className="relative">
            <img
              className="rounded-full h-24 w-24"
              src={userDetails.imageUrl}
              alt="User"
            />
          </div>
          <div>
            <div className="text-xl text-orange-500">
              {userDetails.fullName}
            </div>
            <div className="text-sm text-gray-700">{userDetails.role}</div>
          </div>
        </div>

        {/* Right Side: Video */}
        {userDetails.videoUrl && (
          <div className="w-60">
            {" "}
            {/* fixed width to control layout */}
            <video
              src={userDetails.videoUrl}
              className="cursor-pointer rounded-xl"
              onClick={(e) => e.target.play()}
              controls={true}
              width="100%"
            />
          </div>
        )}
      </div>

      <div className={`mt-1 mb-5 py-5 px-8 rounded-xl bg-white shadow-lg`}>
        <div className="text-xl text-orange-500">Personal Information</div>
        <hr className="mt-2 mb-5" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8">
          <div>
            <div className="text-sm text-gray-400">Name</div>
            <div className="text-md">{userDetails.fullName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Date of birth</div>
            <div>{userDetails.dateOfBirth}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Gender</div>
            <div>{userDetails.gender}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Mobile No</div>
            <div>{userDetails.mobileNumber}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Email Id</div>
            <div>{userDetails.emailID}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Adhaar No</div>
            <div className="text-md">{userDetails.adhaarNumber}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Pan No</div>
            <div className="text-md">{userDetails.panNumber}</div>
          </div>
        </div>
      </div>

      <div className={`mt-1 mb-5 py-5 px-8 rounded-xl bg-white shadow-lg`}>
        <div className="text-xl text-orange-500">Address</div>
        <hr className="mt-2 mb-5" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8">
          <div>
            <div className="text-sm text-gray-400">Address Line 1</div>
            <div className="text-md">{userDetails.addressLine1}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Address Line 2</div>
            <div>{userDetails.addressLine2}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">State</div>
            <div>{userDetails.state}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">City</div>
            <div>{userDetails.city}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Pin code</div>
            <div className="text-md">{userDetails.pinCode}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
