import TaskionProfile from "./TaskionProfile";
import { FC, useEffect, useRef, useState } from "react";
import { BsFillMenuAppFill, BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import "../styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBarState } from "../global/ReduxStates";
import { CiSearch } from "react-icons/ci";

interface interfaceChangeStatus {
  allTask: boolean;
  onAllTask: any;
  inProgress: boolean;
  onInProgress: any;
  completed: boolean;
  onCompleted: any;
  pageTitle: string;
  taskObj?: any;
  search?: string;
  setSearch: any;
}

const NavigationBar: FC<interfaceChangeStatus> = ({
  pageTitle,
  taskObj,
  setSearch,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  let menuRef: React.MutableRefObject<any> = useRef();
  useEffect(() => {
    let handler = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleMenuToggle = () => {
    setAnimate(false);
    setTimeout(() => {
      setShowMenu(!showMenu);
    }, 500);
  };

  const toggleSideBar = useSelector((state: any) => state.toggleSideBar);
  const dispatch = useDispatch();
  return (
    <>
      <header className="w-[calc(100vw-300px)] s700:px-2 s1000:w-full z-10 flex justify-between items-center px-10 bg-white h-[70px] fixed">
        {!toggleSideBar && (
          <BsFillMenuButtonWideFill
            className="text-[#b89efa] bg-[#f2eefc] rounded hover:bg-[#e7e0f9] cursor-pointer duration-300 p-1  hidden s950:flex text-[30px]"
            onClick={() => {
              dispatch(toggleSideBarState(!toggleSideBar));
            }}
          />
        )}

        <p className="font-medium text-[16px] cursor-default animate__animated animate__shakeX">
          {pageTitle}
        </p>
        <ul className="flex s950:hidden">{taskObj}</ul>
        {!showMenu ? (
          <BsFillMenuAppFill
            onClick={() => setShowMenu(!showMenu)}
            className="text-[#b89efa] bg-[#f2eefc] rounded hover:bg-[#e7e0f9] cursor-pointer duration-300 p-1 hidden s950:flex text-[30px]"
          />
        ) : (
          <MdOutlineClose
            onClick={() => {
              handleMenuToggle();
              setAnimate(true);
            }}
            className="text-[#b89efa] bg-[#f2eefc] rounded hover:bg-[#e7e0f9] cursor-pointer duration-300 p-1  hidden s950:flex text-[30px]"
          />
        )}
        {showMenu && (
          <div
            className={`flex-col bg-white p-3 animate__animated ${
              animate ? "animate__fadeOutRight" : "animate__fadeInRight"
            } absolute right-0 top-[70px] rounded flex`}
            ref={menuRef}
          >
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
          </div>
        )}
        <div className="flex items-center s1240:hidden cursor-pointer">
          <TaskionProfile />
          {!showMenu && (
            <CiSearch
              onClick={() => setShowMenu(!showMenu)}
              className="text-[16px] p-3 rounded ml-1 w-[40px] h-full hover:bg-[#E4ECF2] cursor-pointer duration-500"
            />
          )}
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
