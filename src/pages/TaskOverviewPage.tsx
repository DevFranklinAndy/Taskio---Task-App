import { useState } from "react";
import NavigationBar from "../common/NavigationBar";
import { AllTask } from "../components/AllTask";
import { InProgressTask } from "../components/InProgressTask";
import { CompletedTask } from "../components/CompletedTask";
import { Top } from "../components/ScrollToTop";

const TaskOverviewPage = () => {
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

  const [search, setSearch] = useState<string>("");
  return (
    <>
      <NavigationBar
        taskObj={
          <>
            <div
              onClick={() => {
                onAllTask();
                Top();
              }}
              className={`mx-2 cursor-pointer py-2 px-4 ${
                allTask && "bg-[#F2EEFC] text-[#8b5cef]"
              }  font-medium rounded duration-300 hover:text-[#8b5cef]`}
            >
              All Tasks
            </div>
            <div
              onClick={() => {
                onInProgress();
                Top();
              }}
              className={`mx-2 cursor-pointer py-2 px-4 duration-300 hover:text-[#8b5cef] ${
                inProgress && "bg-[#F2EEFC] text-[#8b5cef]"
              } font-medium rounded`}
            >
              In Progress
            </div>
            <div
              onClick={() => {
                onCompleted();
                Top();
              }}
              className={`mx-2 ${
                completed && "bg-[#F2EEFC] text-[#8b5cef]"
              } cursor-pointer py-2 px-4 duration-300 hover:text-[#8b5cef] font-medium rounded`}
            >
              Completed
            </div>
          </>
        }
        setSearch={setSearch}
        pageTitle="Tasks"
        allTask={allTask}
        onAllTask={onAllTask}
        inProgress={inProgress}
        onInProgress={onInProgress}
        completed={completed}
        onCompleted={onCompleted}
      />
      <div className="mt-[80px] mb-2 mx-10 s700:mx-2">
        {allTask ? (
          <AllTask search={search} />
        ) : inProgress ? (
          <InProgressTask search={search} />
        ) : (
          <CompletedTask search={search} />
        )}
      </div>
    </>
  );
};

export default TaskOverviewPage;
