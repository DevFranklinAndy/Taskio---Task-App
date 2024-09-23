import { useSelector } from "react-redux";
import TodoLists from "./TodoLists";
import { useViewAllTaskionTask } from "../hooks/customHooksSWR";
import Loader from "../static/Loader";
import AllTaskImage from "../assets/AddTask-Image.svg";
import { FC } from "react";

interface iSearch {
  search: string;
}

export const AllTask: FC<iSearch> = ({ search }) => {
  const taskionUser = useSelector((state: any) => state.taskioUser);
  const { data, isLoading } = useViewAllTaskionTask(taskionUser);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
          <div className="items-center rounded w-[40px] h-[40px] flex justify-center bg-[#c1b1ea]">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {data && data.length === 0 ? (
            <div className="w-full animate__animated animate__fadeIn flex flex-col items-center justify-center h-[calc(100vh-80px)] ">
              <img
                alt="Add task Image"
                src={AllTaskImage}
                className="w-[300px] mb-2 s700:w-[200px]"
              />
              <p className="text-[#8B5CEF] italic s700:text-[12.5px] font-medium">
                There are currently no tasks assigned.
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
                    <TodoLists key={el._id} el={el} taskioUser={taskionUser} />
                  ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
