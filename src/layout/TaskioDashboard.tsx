import { Outlet } from "react-router-dom";
import Sider from "../common/Sider";
import CreateNewTask from "../components/CreateNewTask";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
const TaskioDashboard = () => {
  const createNewTask = useSelector((state: any) => state.toggleCreateNewTask);
  const toggleSideBar = useSelector((state: any) => state.toggleSideBar);
  return (
    <>
      <main className="bg-[#F0F1F7] text-[15px] min-h-[100vh] flex">
        <div className="s1000:hidden">
          <Sider />
        </div>
        {toggleSideBar && <SideBar toggleSideBar={toggleSideBar} />}
        <section className="w-full flex justify-end ">
          <div className="w-[calc(100vw-300px)] s1000:w-full">
            {createNewTask && <CreateNewTask createNewTask={createNewTask} />}
            {/* <div className="mx-5"> */}
            <Outlet />
            {/* </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default TaskioDashboard;
