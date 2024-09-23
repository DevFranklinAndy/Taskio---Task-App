import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCheckboxOutline, IoIosRemoveCircle } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiPriceTagLine } from "react-icons/ri";
import taskImg from "../assets/isometric-time-management-concept.jpg";
import { useDispatch, useSelector } from "react-redux";
import { taskioLogOut, toggleCreateNewTask } from "../global/ReduxStates";
import { Top } from "../components/ScrollToTop";
import {
  useViewAllTaskionTask,
  useViewStarredTaskControlAPI,
  useViewTrashedTask,
} from "../hooks/customHooksSWR";
import TaskionProfile from "./TaskionProfile";

const Sider = () => {
  const dispatch = useDispatch();
  const createNewTask = useSelector((state: any) => state.toggleCreateNewTask);
  const taskioUser = useSelector((state: any) => state.taskioUser);
  const { data, isLoading } = useViewAllTaskionTask(taskioUser);
  const { trash, loading } = useViewTrashedTask(taskioUser);
  const { starred, fetching } = useViewStarredTaskControlAPI(taskioUser);
  console.log(data);
  return (
    <>
      <main className="w-[300px] s1240:overflow-y-scroll h-full fixed bg-white p-4">
        <button
          onClick={() => {
            dispatch(toggleCreateNewTask(!createNewTask));
          }}
          className="w-full mb-5 flex items-center rounded justify-center py-3 hover:bg-[#906AE2] duration-300 bg-[#8b5cef] text-white"
        >
          <FaCirclePlus />
          <span className="ml-3 font-medium">Create New Task</span>
        </button>
        <div className="hidden s1240:flex">
          <TaskionProfile />
        </div>
        <p className="mt-5 font-medium text-[#AEB1B6]">TASKS</p>
        <ul>
          <div className="flex items-center justify-between">
            <Link
              onClick={Top}
              to="/"
              className="flex items-center font-medium mt-3 hover:text-[#8b5cef] duration-300"
            >
              <IoIosCheckboxOutline className="mr-2" />
              <span>Task Overview</span>
            </Link>
            <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#26BF94] bg-[#E9F8F4]">
              {isLoading ? ". . ." : data?.length}
            </span>
          </div>
          <div className="flex items-center mt-3 justify-between">
            <Link
              onClick={Top}
              to="/starred-task"
              className="flex items-center font-medium hover:text-[#8b5cef] duration-300"
            >
              <GoStar className="mr-2" />
              <span>Starred Task</span>
            </Link>
            <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#F9C649] bg-[#FEF8EC]">
              {loading ? ". . ." : starred?.length}
            </span>
          </div>
          <div className="flex items-center mt-3 justify-between">
            <Link
              onClick={Top}
              to="/trashed-task"
              className="flex items-center font-medium hover:text-[#8b5cef] duration-300"
            >
              <FaTrashCan className="mr-2" />
              <span>Trash</span>
            </Link>
            <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#E6533C] bg-[#FCEDEB]">
              {fetching ? ". . ." : trash?.length}
            </span>
          </div>
        </ul>
        <p className="mt-5 font-medium text-[#AEB1B6]">CATEGORIES</p>
        <ul>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex cursor-pointer items-center font-medium hover:text-[#8b5cef] duration-300">
              <RiPriceTagLine className="mr-2 text-[#8466E5]" />
              <span>Personal</span>
            </div>
            {/* <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#8466E5] bg-[#F2EEFC]">
              0
            </span> */}
          </div>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex  cursor-pointer items-center font-medium hover:text-[#8b5cef] duration-300">
              <RiPriceTagLine className="mr-2 text-[#23bae9]" />
              <span>Work</span>
            </div>
            {/* <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#23bae9] bg-[#d7f6ff]">
              0
            </span> */}
          </div>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex cursor-pointer items-center font-medium hover:text-[#8b5cef] duration-300">
              <RiPriceTagLine className="mr-2 text-[#F9C649]" />
              <span>Health & Fitness</span>
            </div>
            {/* <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#F9C649] bg-[#FEF8EC]">
              2
            </span> */}
          </div>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex  cursor-pointer items-center font-medium hover:text-[#8b5cef] duration-300">
              <RiPriceTagLine className="mr-2 text-[#26BF94]" />
              <span>Daily Goals</span>
            </div>
            {/* <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#26BF94] bg-[#E9F8F4]">
              4
            </span> */}
          </div>
          <div className="flex items-center mt-3 justify-between">
            <div className="flex cursor-pointer items-center font-medium hover:text-[#8b5cef] duration-300">
              <RiPriceTagLine className="mr-2 text-[#E6533C]" />
              <span>Financial Management</span>
            </div>
            {/* <span className="py-1 px-3 text-[12px] rounded-xl font-medium text-[#E6533C] bg-[#FCEDEB]">
              5
            </span> */}
          </div>
        </ul>
        <button
          onClick={() => dispatch(taskioLogOut())}
          className="mt-5 py-3 rounded hover:bg-[#de614e] duration-300 w-full bg-[#E6533C] flex items-center justify-center font-medium text-white"
        >
          <IoIosRemoveCircle /> <span className="ml-3"> Logout Taskio</span>
        </button>
        <div className="flex justify-center">
          <img
            src={taskImg}
            className="w-[160px]"
            loading="lazy"
            alt="Image depicts Task Management: Shows Clock, Planner, Calendar"
          />
        </div>
      </main>
    </>
  );
};

export default Sider;
