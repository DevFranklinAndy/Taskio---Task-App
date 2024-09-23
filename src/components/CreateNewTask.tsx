import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateNewTask } from "../global/ReduxStates";
import { GrClose } from "react-icons/gr";
import { FaCalendarWeek } from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewTaskAPI } from "../api/taskAPI";
import Loader from "../static/Loader";
import { toast } from "react-toastify";

interface CreateNewTaskProps {
  createNewTask: any;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({ createNewTask }) => {
  const dispatch = useDispatch();
  const taskioUser = useSelector((state: any) => state.taskioUser);
  const [animate, setAnimate] = useState(false);

  const handleClose = () => {
    setAnimate(false); // Start fadeOut animation
    setTimeout(() => {
      // Dispatch toggleCreateNewTask after fadeOut animation completes
      dispatch(toggleCreateNewTask(!createNewTask));
    }, 500); // Adjust the delay according to the duration of fadeOut animation
  };

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation(); // Prevent click event from propagating to the main container
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    title: yup.string().required("Please enter task title"),
    description: yup.string().required("Please enter task description"),
    targetDate: yup.date().required(),
    category: yup.string().required("Choose the category of task"),
    priority: yup.string().required("Prioritize your task"),
  });

  const customId: string = "custom-id";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const { title, description, targetDate, category, priority } = data;

    createNewTaskAPI(taskioUser, {
      title,
      description,
      targetDate,
      category,
      priority,
    })
      .then((res: any) => {
        if (res.status === 201) {
          toast.success(res.data.message, {
            toastId: customId,
          });
        }
      })
      .then(() => {
        setLoading(false);
        handleClose();
        setAnimate(true);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };
  return (
    <main
      onClick={() => {
        handleClose();
        setAnimate(true);
      }}
      className={`fixed flex justify-center items-center animate__animated ${
        animate ? "animate__fadeOut" : "animate__fadeIn"
      } w-full h-full z-50 bg-[rgba(0,0,0,0.5)] left-0`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          handleFormClick(e);
        }}
        className={`rounded-xl text-[12px] animate__animated ${
          animate ? "animate__fadeOutDown" : "animate__fadeInDown"
        } bg-white w-[500px] s500:w-full min-h-[300px]`}
      >
        <div className="flex justify-between items-center px-5 s500:px-2 py-3 border-b-2">
          <p className="font-medium text-[16px]">Create Task</p>
          <GrClose
            onClick={() => {
              handleClose();
              setAnimate(true);
            }}
            className="text-slate-500 cursor-pointer hover:text-black duration-300"
          />
        </div>
        {/* Title */}
        <div className="px-5 s500:px-2 py-3">
          <p className="font-medium mb-1">Task Title</p>
          <input
            type="text"
            {...register("title")}
            placeholder="Type your Task Name"
            className="outline-none border pl-3 w-full h-[40px] rounded"
          />
          <p className="text-rose-500">{errors.title?.message}</p>
        </div>
        {/* Description */}
        <div className="px-5 s500:px-2">
          <p className="font-medium mb-1">Task Description</p>
          <input
            type="text"
            placeholder="Description of Task"
            {...register("description")}
            className="outline-none border pl-3 w-full h-[40px] rounded"
          />
          <p className="text-rose-500">{errors.description?.message}</p>
        </div>
        <div className="px-5 s500:px-2 py-3 w-full flex">
          {/* Target Date */}
          <div className="flex-1 min-h-[40px] ml-1">
            <p className="font-medium mb-1">Target Date</p>
            <div className="w-full flex">
              <FaCalendarWeek className="text-[40px] rounded-l border p-3 text-[#92989e] bg-[#f3f6f8] " />
              <input
                type="datetime-local"
                {...register("targetDate")}
                defaultValue={getCurrentDateTime()} // Set value to current date and time
                min={getCurrentDateTime()} // Set min attribute to current date and time
                className="w-full border outline-none rounded-l-0 rounded-r border-l-0 pl-3"
              />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="w-full s500:px-2 px-5 pb-5">
          <p className="font-medium mb-1">Choose Category</p>
          <select
            {...register("category")}
            className="w-full outline-none border rounded h-[40px]"
          >
            <option value="Personal" className="h-[40px]">
              Personal
            </option>
            <option value="Work" className="h-[40px]">
              Work
            </option>
            <option value="Health & Fitness" className="h-[40px]">
              Health & Fitness
            </option>
            <option value="Daily Goals" className="h-[40px]">
              Daily Goals
            </option>
            <option value="Financial Management" className="h-[40px]">
              Financial Management
            </option>
          </select>
          <p className="text-rose-500">{errors.category?.message}</p>
        </div>

        {/* Category */}
        <div className="w-full s500:px-2 px-5 pb-5 border-b">
          <p className="font-medium mb-1">Set Priority</p>
          <select
            {...register("priority")}
            className="w-full outline-none border rounded h-[40px]"
          >
            <option value="Critical" className="h-[40px]">
              Critical
            </option>
            <option value="High" className="h-[40px]">
              High
            </option>
            <option value="Low" className="h-[40px]">
              Low
            </option>
            <option value="Urgent" className="h-[40px]">
              Urgent
            </option>
          </select>
          <p className="text-rose-500">{errors.priority?.message}</p>
        </div>

        <div className="w-full flex justify-end items-center px-5 s500:px-2 py-5">
          <div
            onClick={() => {
              handleClose();
              setAnimate(true);
            }}
            className="hover:bg-[#e4ecf2] cursor-pointer duration-300 bg-slate-100  px-7 py-3 mr-3 rounded font-medium"
          >
            Cancel
          </div>
          {!loading ? (
            <button
              type="submit"
              onKeyDown={() => handleKeyPress}
              className="hover:bg-[#906AE2] cursor-pointer duration-300 bg-[#8b5cef] text-white px-7 py-3 rounded font-medium"
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="hover:bg-[#906AE2] cursor-pointer duration-300 bg-[#8b5cef] text-white px-7 py-3 rounded font-medium"
            >
              <Loader />
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateNewTask;
