import { useState } from "react";
import NavigationBar from "../common/NavigationBar";
import { useViewStarredTaskControlAPI } from "../hooks/customHooksSWR";
import { useSelector } from "react-redux";
import Loader from "../static/Loader";
import TodoLists from "../components/TodoLists";
import starredTaskImg from "../assets/undraw_taking_notes.svg";
import { CiSearch } from "react-icons/ci";
const StarredTaskPage = () => {
  const [allTask, setAllTask] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const onAllTask = () => {
    setAllTask(true);
    setInProgress(false);
    setCompleted(false);
  };

  const onInProgress = () => {
    setAllTask(false);
    setInProgress(true);
    setCompleted(false);
  };

  const onCompleted = () => {
    setAllTask(false);
    setInProgress(false);
    setCompleted(true);
  };
  const taskionUser = useSelector((state: any) => state.taskioUser);
  const { starred, fetching } = useViewStarredTaskControlAPI(taskionUser);

  const [search, setSearch] = useState<string>("");
  return (
    <>
      <NavigationBar
        pageTitle="Starred Task"
        allTask={allTask}
        setSearch={setSearch}
        taskObj={
          <div className="h-[40px] rounded w-full bg-[#F3F6F8] flex items-center">
            <input
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              placeholder="Search Category Here"
              className="flex-1 outline-none lowercase placeholder:text-[12px] bg-transparent h-full pl-3 "
            />
            <CiSearch className="text-[16px] p-3 rounded-r w-[40px] h-full hover:bg-[#E4ECF2] cursor-pointer duration-500" />
          </div>
        }
        onAllTask={onAllTask}
        inProgress={inProgress}
        onInProgress={onInProgress}
        completed={completed}
        onCompleted={onCompleted}
      />
      <div className="mt-[80px] mb-2 mx-10 s700:mx-2">
        {fetching ? (
          <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
            <div className="items-center rounded w-[40px] h-[40px] flex justify-center bg-[#c1b1ea]">
              <Loader />
            </div>
          </div>
        ) : (
          <>
            {starred && starred.length === 0 ? (
              <div className="w-full animate__animated animate__fadeIn flex flex-col items-center justify-center h-[calc(100vh-80px)] ">
                <img
                  alt="Starred task Image"
                  src={starredTaskImg}
                  className="w-[300px] mb-2 s700:w-[200px]"
                />
                <p className="text-[#ffc44d] italic s700:text-[12.5px] font-medium">
                  There are no starred task.
                </p>
              </div>
            ) : (
              <div className="grid gap-2 grid-cols-3 s1240:grid-cols-2 s700:grid-cols-1 justify-center">
                {starred &&
                  starred
                    .filter((el: any) => {
                      return search.toLowerCase() === ""
                        ? el
                        : el.category.toLowerCase().includes(search);
                    })
                    .map((el: any) => (
                      <TodoLists
                        key={el._id}
                        el={el}
                        taskioUser={taskionUser}
                      />
                    ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StarredTaskPage;
