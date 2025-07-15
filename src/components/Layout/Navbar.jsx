import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ handleClick, sideClose }) => {
  const [heading, setHeading] = useState("");
  const [profileToggle, setProfileToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fullName = localStorage.getItem("name") || "";
  const role = localStorage.getItem("role") || "";

  useEffect(() => {
    if (location.pathname === "/Dashboard/Dashboard") {
      setHeading("Dashboard");
    }
    if (location.pathname === "/Dashboard/Profile") {
      setHeading("Profile");
    }
  }, [location]);

  return (
    <header className="antialiased">
      <nav className=" md:px-4 md:py-2.5 lg:px-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="m-0 flex items-center gap-3 text-xl font-semibold text-zinc-800">
            {sideClose ? (
              <div
                onClick={handleClick}
                className="cursor-pointer bg-white shadow-md rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
            {heading}
          </div>
          <div className="flex items-center lg:order-2 md:gap-3 gap-1">
            <button
              type="button"
              className="relative md:mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex h-10 w-10 items-center justify-center">
                <div>
                  <div className="text-lg text-white">{fullName.charAt(0)}</div>
                </div>
              </div>
            </button>
            <div className="flex-col items-center  justify-center hidden md:block">
              <p className="text-sm font-bold">{fullName}</p>
              <p className="text-sm">{role}</p>
            </div>
            <div
              onClick={() => setProfileToggle(!profileToggle)}
              className="md:ms-6 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#EEF2F5] shadow-md"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4 stroke-black -rotate-90"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              <div
                className={`${
                  profileToggle ? "block" : "hidden"
                } absolute w-56 rounded-lg h-auto border bg-white md:-right-6 right-0 shadow-lg top-12 py-2 px-3`}
              >
                <div className="mb-2 flex items-center justify-start gap-2">
                  <div className="relative h-3 w-3 rounded-full bg-green-500">
                    <span class="animate-ping absolute top-0 left-0 inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {fullName}
                  </div>
                </div>

                <p
                  onClick={() => navigate("/Dashboard/Profile")}
                  className="mb-2 block rounded-lg hover:bg-blue-500 hover:text-white  bg-blue-50 py-1 px-2 text-sm font-semibold text-black"
                >
                  Profile
                </p>
                <p
                  onClick={async () => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    localStorage.removeItem("role");
                    localStorage.removeItem("user_id");
                    await navigate("/");
                  }}
                  className="mb-2 block rounded-lg hover:bg-red-500 hover:text-white  bg-red-50 py-1 px-2 text-sm font-semibold text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
