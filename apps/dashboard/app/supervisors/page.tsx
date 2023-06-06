"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { setActiveTab } from "@/app/GlobalState/TabSlice";
import { register_supervisor_validate } from "@/components/Auth/login.validate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdClose } from "react-icons/md";
import { FetchAllSupervisors } from "../GlobalState/ApiCalls/supervisorApiCalls";
import { RootState } from "../GlobalState/store";
type Props = {};

function Supervisors({}: Props) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  useEffect(() => {
    FetchAllSupervisors(dispatch);
  }, []);

  const supervisors = useSelector(
    (state: RootState) => state.Supervisor.supervisorsAll
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(register_supervisor_validate) });

  const onSubmit = async (data: any) => {
    console.log(data);

    // CALLING API FUNCTION

    // AFTER CALLING API RESET FORM AND CLOSE MODAL
    reset();
    setModal(false);
  };

  return (
    <div className="relative container flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4  text-md">
          <span
            className="cursor-pointer flex items-center justify-center p-[10px] rounded-full hover:bg-gray-100 active:bg-gray-300 transition-all"
            title="Dashboard"
            onClick={() => {
              navigate.push("/");
              dispatch(setActiveTab(0));
            }}
          >
            <AiFillHome />
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            <MdOutlineArrowForwardIos />
          </span>
          <span
            title="Complaints"
            className="flex items-center justify-center cursor-pointer text-sm text-primary-default px-3 py-1 rounded-full bg-primaryColor-300"
          >
            <span>Supervisors</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModal(true)}
            className="font-medium text-white bg-inprogessColor py-1 px-3 rounded-lg hover:shadow-lg transition-all"
          >
            Add Supervisor
          </button>
          <div className="flex items-center border-2 border-gray-300 rounded-full">
            <input
              type="text"
              placeholder={`Search in ${supervisors?.length} supervisors`}
              className="text-sm rounded-l-full outline-none py-1 px-4 w-52 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="border-[1px] border-gray-300 h-8"></div>
            <button className="py-1 px-4 rounded-r-full transition-all text-white bg-feedbackColor cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S. NO.
              </th>
              <th scope="col" className="px-6 py-3">
                Supervisor ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Asigned Complaints
              </th>
              <th scope="col" className="px-6 py-3">
                WSSC_CODE
              </th>

              <th scope="col" className="px-6 py-3">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {supervisors?.map(
              (
                { _id, name, phone, WSSC_CODE, assignComplaints }: any,
                index: any
              ) => (
                <tr
                  key={index}
                  className="cursor-pointer bg-white border-b  hover:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                  >
                    {index + 1}
                  </th>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap uppercase"
                  >
                    {_id.slice(-8)}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {name}
                  </td>
                  <td className="px-6 py-4">{phone}</td>
                  <td className="px-6 py-4">
                    {assignComplaints ? assignComplaints.length : "NILL"}
                  </td>
                  <td className="px-6 py-4 uppercase">{WSSC_CODE}</td>

                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      onClick={() => navigate.push(`/supervisors/${_id}`)}
                      className="font-bold text-[12px] uppercase text-white bg-primaryColor-500  py-1 px-3 rounded-lg hover:shadow-lg transition-all"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setUpdateModal(true);
                        setUpdateId(_id);
                      }}
                      className="font-bold text-[12px] uppercase text-white bg-inprogessColor py-1 px-3 rounded-lg hover:shadow-lg transition-all"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="absolute mt-10 h-[80vh] w-full flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col bg-white shadow-2xl px-16 py-8 w-[30%] rounded-md border-[1px] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-bold text-inprogessColor">
                Register Supervisor
              </h1>
              <span
                onClick={() => setModal(false)}
                className="cursor-pointer p-1 bg-gray-200 rounded hover:bg-red-500 hover:text-white transition-all"
              >
                <MdClose />
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6 w-full"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Supervisor Name
                </label>
                <input
                  type="name"
                  // name="username"
                  id="name"
                  {...register("name")}
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                outline-none
                block w-full p-2
                focus:border-primaryColor-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                ${errors.name ? "focus:border-red-500" : ""}
                `}
                  placeholder="John Doe"
                />
                <div className="text-sm text-red-500">
                  {/* {errors.phone?.message} */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Contact Number
                </label>
                <input
                  type="number"
                  // name="username"
                  id="phone"
                  {...register("phone")}
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                outline-none
                block w-full p-2 
                focus:border-primaryColor-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                ${errors.phone ? "focus:border-red-500" : ""}
                `}
                  placeholder="03*********"
                />
                <div className="text-sm text-red-500">
                  {/* {errors.phone?.message} */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  // name="password"
                  id="password"
                  {...register("password")}
                  placeholder="Supervisor password"
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    outline-none
                    block w-full p-2
                    focus:border-primaryColor-500
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                    ${errors.password ? "focus:border-red-500" : ""}
                    `}
                />
                <div className="text-sm text-red-500">
                  {/* {errors.password?.message} */}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primaryColor-500 transition-all focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
      {updateModal && (
        <div className="absolute mt-10 h-[80vh] w-full flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col bg-white shadow-2xl px-16 py-8 w-[30%] rounded-md border-[1px] border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-bold text-inprogessColor">
                Update Supervisor
              </h1>
              <span
                onClick={() => setUpdateModal(false)}
                className="cursor-pointer p-1 bg-gray-200 rounded hover:bg-red-500 hover:text-white transition-all"
              >
                <MdClose />
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6 w-full"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Supervisor Name
                </label>
                <input
                  type="name"
                  // name="username"
                  id="name"
                  {...register("name")}
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                outline-none
                block w-full p-2
                focus:border-primaryColor-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                ${errors.name ? "focus:border-red-500" : ""}
                `}
                  placeholder="John Doe"
                />
                <div className="text-sm text-red-500">
                  {/* {errors.phone?.message} */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  // name="username"
                  id="phone"
                  {...register("phone")}
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                outline-none
                block w-full p-2 
                focus:border-primaryColor-500
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                ${errors.phone ? "focus:border-red-500" : ""}
                `}
                  placeholder="03*********"
                />
                <div className="text-sm text-red-500">
                  {/* {errors.phone?.message} */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  // name="password"
                  id="password"
                  {...register("password")}
                  placeholder="Supervisor password"
                  className={`bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg
                    outline-none
                    block w-full p-2
                    focus:border-primaryColor-500
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  
                    ${errors.password ? "focus:border-red-500" : ""}
                    `}
                />
                <div className="text-sm text-red-500">
                  {/* {errors.password?.message} */}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primaryColor-500 transition-all focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Supervisors;
