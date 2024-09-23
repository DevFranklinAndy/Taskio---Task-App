import { useSelector } from "react-redux";
import avatar from "../assets/3d-rendering-avatar.avif";
import { useViewOneTaskioAccount } from "../hooks/customHooksSWR";
import Loader from "../static/Loader";

const TaskionProfile = () => {
  const taskioUser = useSelector((state: any) => state.taskioUser);
  const { data, isLoading } = useViewOneTaskioAccount(taskioUser);
  return (
    <>
      {isLoading ? (
        <>
          <div className="items-center rounded w-[40px] flex h-[40px] justify-center bg-[#c1b1ea]">
            <Loader />
          </div>
        </>
      ) : (
        <div className="flex">
          <img
            src={avatar}
            alt=""
            className="w-[45px] object-cover h-[45px] mr-2 rounded-full"
          />
          <div>
            <p className="font-medium">{data?.userName}</p>
            <span className="text-[12.5px]">
              {data?.email.split("@gmail.com")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskionProfile;
