import { useSelector } from "react-redux";
import { useViewAllTaskInProgress } from "../hooks/customHooksSWR";
import TodoLists from "./TodoLists";
import Loader from "../static/Loader";
import AllTaskImage from "../assets/AddTask-Image.svg";
import { FC } from "react";

interface iSearch {
  search: string;
}

export const InProgressTask: FC<iSearch> = ({ search }) => {
  const taskioUser = useSelector((state: any) => state.taskioUser);
  const { data, isLoading } = useViewAllTaskInProgress(taskioUser);
  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
            <div className="items-center rounded w-[40px] h-[40px] flex justify-center bg-[#c1b1ea]">
              <Loader />
            </div>
          </div>
        </>
      ) : (
        <>
          {data && data.length === 0 ? (
            <div className="w-full flex flex-col animate__animated animate__fadeIn items-center justify-center h-[calc(100vh-80px)] ">
              <img
                alt="Add task Image"
                src={AllTaskImage}
                className="w-[300px] mb-2"
              />
              <p className="text-[#8B5CEF] italic font-medium">
                No tasks are currently in progress.
              </p>
            </div>
          ) : (
            <div className="grid gap-2 grid-cols-3 s1240:grid-cols-2 s700:grid-cols-1 justify-center">
              {data &&
                data
                  .filter((el: any) => {
                    return search.toLowerCase() === ""
                      ? el
                      : el.category.toLowerCase().includes(search);
                  })
                  .map((el: any) => (
                    <TodoLists key={el._id} el={el} taskioUser={taskioUser} />
                  ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
