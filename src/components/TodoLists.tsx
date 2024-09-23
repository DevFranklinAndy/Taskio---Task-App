import { IoIosStar } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { FC } from "react";
import moment from "moment";
import { TbProgressCheck } from "react-icons/tb";
import {
  deleteTrashedTaskAPI,
  moveTaskToCompletedAPI,
  moveToAllTaskAPI,
  moveToProgressAPI,
  moveToTrashAPI,
  starredTaskControlAPI,
} from "../api/taskAPI";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";

interface iTodo {
  el: any;
  taskioUser: string;
}

const TodoLists: FC<iTodo> = ({ el, taskioUser }) => {
  const customId: string = "custom-id";
  return (
    <>
      <main
        className={`w-[100%] flex flex-col justify-between animate__animated animate__zoomIn hover:shadow-xl text-[13.5px] min-h-[100px] bg-white rounded-xl p-5 border-l-8 ${
          el.status === "Task"
            ? "border-[#fad68e]"
            : el.status === "Pending"
            ? "border-[#A7E2F5]"
            : el.status === "InProgress"
            ? "border-[#d7caf9]"
            : el.status === "Completed"
            ? "border-[#b4f7e6]"
            : "border-[#f59283]"
        }`}
      >
        <section>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                {el.starred === true ? (
                  <IoIosStar
                    onClick={() => {
                      starredTaskControlAPI(taskioUser, el._id).then(
                        (res: any) => {
                          if (res.status === 200) {
                            toast.success(res.data.message, {
                              toastId: customId,
                            });
                          }
                        }
                      );
                    }}
                    className="text-[#FAD68E] cursor-pointer text-[18px]"
                  />
                ) : (
                  <IoIosStar
                    onClick={() => {
                      starredTaskControlAPI(taskioUser, el._id).then(
                        (res: any) => {
                          if (res.status === 200) {
                            toast.success(res.data.message, {
                              toastId: customId,
                            });
                          }
                        }
                      );
                    }}
                    className="text-[#dddfe3] cursor-pointer text-[18px]"
                  />
                )}
                <p className="font-medium ml-3">{el.title}</p>
              </div>
              <p className="text-[12.5px]">{el.description}</p>
            </div>
            <span
              className={`italic ${
                el.category === "Personal"
                  ? "text-[#906AE2]"
                  : el.category === "Work"
                  ? "text-[#23bae9]"
                  : el.category === "Health & Fitness"
                  ? "text-[#F9C649]"
                  : el.category === "Daily Goals"
                  ? "text-[#26BF94]"
                  : "text-[#E6533C]"
              } ml-5`}
            >
              {el.category === "Personal"
                ? "PE"
                : el.category === "Work"
                ? "WK"
                : el.category === "Health & Fitness"
                ? "HF"
                : el.category === "Daily Goals"
                ? "DG"
                : "FM"}
            </span>
          </div>
          <div className="mt-3">
            <span className="font-medium">Assigned On:</span>{" "}
            <span className="text-gray-500">
              {moment(el.createdAt).format("LLL")}
            </span>
          </div>
          <div className="mt-3">
            <span className="font-medium">Target Date:</span>{" "}
            <span className="text-gray-500">
              {moment(el.targetDate).format("LLL")}
            </span>
          </div>
        </section>
        <section className="flex mt-3 justify-between items-center">
          <div className="flex">
            {el.status !== "Trash" && el.status !== "Completed" ? (
              <AiOutlineEdit
                title="Edit Task"
                className="bg-[#FEF8EC] text-[#cf9a2f] hover:text-white hover:bg-[#FAD68E] text-[30px] mr-1 duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
            {el.status !== "Trash" ? (
              <IoIosRemoveCircle
                title="Trash Task"
                onClick={() => {
                  moveToTrashAPI(taskioUser, el._id).then((res: any) => {
                    if (res.status === 200) {
                      toast.success(res.data.message, {
                        toastId: customId,
                      });
                    }
                  });
                }}
                className=" text-[#E6533C] bg-[#FCEDEB] hover:text-white hover:bg-[#E6533C] mr-1 text-[30px] duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
            {el.status !== "InProgress" && el.status !== "Trash" ? (
              <TbProgressCheck
                title="Progress"
                onClick={() => {
                  moveToProgressAPI(taskioUser, el._id).then((res: any) => {
                    if (res.status === 200) {
                      toast.success(res.data.message, {
                        toastId: customId,
                      });
                    }
                  });
                }}
                className=" bg-[#F2EEFC] text-[#845ADF] mr-1 hover:text-white hover:bg-[#845ADF] text-[30px] duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
            {el.status !== "Completed" && el.status !== "Trash" ? (
              <IoCheckmarkCircleSharp
                onClick={() => {
                  moveTaskToCompletedAPI(taskioUser, el._id).then(
                    (res: any) => {
                      if (res.status === 200) {
                        toast.success(res.data.message, {
                          toastId: customId,
                        });
                      }
                    }
                  );
                }}
                title="Mark as done"
                className=" text-[#26BF94] mr-1 bg-[#E9F8F4] hover:text-white hover:bg-[#26BF94] text-[30px] duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
            {el.status !== "Task" ? (
              <HiHome
                title="Restore"
                onClick={() => {
                  moveToAllTaskAPI(taskioUser, el._id).then((res: any) => {
                    if (res.status === 200) {
                      toast.success(res.data.message, {
                        toastId: customId,
                      });
                    }
                  });
                }}
                className=" text-[#4891E0] mr-1 bg-[#D7F6FF] hover:text-white hover:bg-[#4891E0] text-[30px] duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
            {el.status === "Trash" ? (
              <FaTrashCan
                title="Delete Permanently"
                onClick={() => {
                  deleteTrashedTaskAPI(taskioUser, el._id).then((res: any) => {
                    if (res.status === 200) {
                      toast.success(res.data.message, {
                        toastId: customId,
                      });
                    }
                  });
                }}
                className=" text-[#E6533C] bg-[#FCEDEB] hover:text-white hover:bg-[#E6533C] text-[30px] duration-300 cursor-pointer rounded p-2"
              />
            ) : null}
          </div>
          <div
            className={`${
              el.priority === "Critical"
                ? "text-[#E6533C] bg-[#FCEDEB]"
                : el.priority === "High"
                ? "text-[#F9C95F] bg-[#FEF8EC]"
                : el.priority === "Low"
                ? "text-[#5FBF94] bg-[#E9F8F4]"
                : "text-[#906AE2] bg-[#F2EEFC]"
            } px-2 text-[11.5px] py-1 cursor-default rounded`}
          >
            {el.priority}
          </div>
        </section>
      </main>
    </>
  );
};

export default TodoLists;
