import Logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faQuestionCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="bg-slack w-full">
      <div className="px-12 md:px-24 flex justify-between py-1 items-center">
        <div className="flex-1">
          <img src={Logo} alt="logo" className="h-5"></img>
        </div>

        <div className="flex-2 flex-grow flex justify-between items-center text-white">
          <FontAwesomeIcon icon={faClock} />

          <div className="rounded mx-4 border-2 border-opacity-30 px-4 py-0.5 flex-grow  flex justify-between items-center text-white text-opacity-30 ">
            <input
              type="text"
              placeholder="Search Slack"
              className="bg-transparent focus-within:outline-none text-white placeholder-white w-full pr-4 placeholder-opacity-30"
            ></input>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>

        <div
          className="flex-1 text-white flex justify-end items-center gap-4 cursor-pointer"
          onClick={() => auth.signOut()}
        >
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="rounded-md h-8"
          />
          <p>{user?.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
