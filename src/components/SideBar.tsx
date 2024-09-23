import { useDispatch } from "react-redux";
import { toggleSideBarState } from "../global/ReduxStates";
import Sider from "../common/Sider";
import { FC, useState } from "react";

interface iToggleSideBar {
  toggleSideBar: boolean;
}

const SideBar: FC<iToggleSideBar> = ({ toggleSideBar }) => {
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);

  const handleClose = () => {
    setAnimate(false); // Start fadeOut animation
    setTimeout(() => {
      // Dispatch toggleCreateNewTask after fadeOut animation completes
      dispatch(toggleSideBarState(!toggleSideBar));
    }, 500); // Adjust the delay according to the duration of fadeOut animation
  };
  return (
    <>
      <div
        className={`s1000:fixed animate__animated ${
          animate ? "animate__fadeOutRight" : "animate__fadeInRight"
        } w-full bg-[rgba(0,0,0,0.5)] h-[100vh] z-50`}
        onClick={() => {
          handleClose();
          setAnimate(true);
        }}
      >
        <Sider />
      </div>
    </>
  );
};

export default SideBar;
