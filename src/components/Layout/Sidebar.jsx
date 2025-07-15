import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

let response = {
  getMenu: [
    {
      mSortNo: "3",
      mPageID: "0",
      cssClass: "fa fa-gears",
      menuText: "Operation",
      folderName: "Operation",
      getSubMenu: [
        {
          menuText: "Users",
          folderName: "Users",
          pageUrl: "Users",
          pageID: "12",
          mpageID: "11",
        },
      ],
    },
  ],
};

const Sidebar = ({ handleClick, sideClose }) => {
  const [dropdown, setDropdown] = useState();
  const [menuData, setMenuData] = useState(response.getMenu);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "";

  const pathSegments = location.pathname.split("/");
  const lastUrlValue = pathSegments[pathSegments.length - 1];
  const secondLastUrlValue = pathSegments[pathSegments.length - 2];

  useEffect(() => {
    setDropdown(secondLastUrlValue);
  }, [location]);

  return (
    <div>
      <div className="relative flex items-center gap-3 px-3 py-3 after:absolute after:w-full after:h-[2px] after:bg-gradient-to-r after:from-white after:white after:to-white after:right-0 after:bottom-0">
        <div className="flex justify-start items-center w-full gap-2 mt-3 ms-1">
          <div className="h-8 w-8 bg-black rounded-full flex justify-center items-center">
            <p className="text-white text-xl">A</p>
          </div>
          <div className="text-2xl font-bold  text-black text-center">
            Assignment
          </div>
        </div>
        {!sideClose ? (
          <div
            className="absolute -right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
            onClick={handleClick}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 stroke-black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* -------------side links------------------- */}
      <div
        onClick={() => navigate("Dashboard/Dashboard")}
        className="flex items-center gap-2 py-2 px-4 m-3 cursor-pointer rounded-full text-white bg-gradient-to-r from-blue-950 via-purple-900 to-orange-500"
      >
        <i className={`fa fa-dashboard`}></i>
        <button className="text-sm" onClick={handleClick}>
          {" "}
          Dashboard
        </button>
      </div>

      {role === "admin" ? (
        <ul className="m-3">
          {menuData?.map((menuData, index) => (
            <li key={index}>
              <div
                onClick={() => {
                  if (dropdown === menuData?.folderName) {
                    setDropdown(null);
                  } else {
                    setDropdown(menuData?.folderName);
                  }
                }}
                className={`py-2 px-4 ${
                  dropdown === menuData?.folderName ? "bg-[#EEF2F5]" : ""
                } w-full text-black flex items-center rounded-full cursor-pointer justify-between gap-2`}
              >
                <div className="flex items-center gap-3 text-sm font-semibold ">
                  <div className="">
                    <i className={`${menuData?.cssClass}`}></i>
                  </div>
                  {menuData?.menuText}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={`size-4 transition-all ease-linear ${
                      dropdown === menuData?.folderName ? "rotate-90" : ""
                    }`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={`transition-all ease-in overflow-hidden ${
                  dropdown === menuData?.folderName
                    ? "max-h-[1000px]"
                    : "max-h-0"
                }`}
              >
                <ul
                  className={`child_links ps-8 relative after:absolute after:w-[2px] after:h-full after:bg-zinc-200 after:-translate-y-2/4 after:top-2/4 after:left-[18px] after:z-0`}
                >
                  {menuData.getSubMenu?.map((subMenuData, subIndex) => (
                    <li
                      key={subIndex}
                      className="relative z-10 list-disc after:absolute after:w-6 after:h-[2px] after:bg-zinc-200 after:-translate-y-2/4 after:top-2/4 after:-left-2"
                    >
                      <Link
                        to={`/${menuData?.folderName}/${subMenuData.pageUrl}`}
                        className={`block py-1 ps-6 text-sm text-zinc-500 ${
                          subMenuData?.pageUrl.toLowerCase() ===
                          lastUrlValue.toLowerCase()
                            ? "text-zinc-800"
                            : ""
                        } hover:text-zinc-800`}
                      >
                        {subMenuData.menuText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
