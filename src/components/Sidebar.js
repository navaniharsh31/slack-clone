import { faHashtag, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/mainSlice";
const Sidebar = () => {
  const [channel, loading, error] = useCollection(db.collection("rooms"));
  const dispatch = useDispatch();
  const addChannel = () => {
    const name = prompt("Enter channel name");

    if (name) {
      db.collection("rooms").add({
        name: name,
      });
    }
  };

  const selectChannel = (id) => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <div className="h-full bg-slack w-72 border-t-2 border-white border-opacity-30">
      <div
        className="text-white px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slack-dark border-b-2 border-white border-opacity-30"
        onClick={addChannel}
      >
        <FontAwesomeIcon icon={faPlus} />
        <h4 className="font-medium">Add Channel</h4>
      </div>
      <div>
        {channel?.docs.map((doc) => (
          <div
            className="text-white px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slack-dark"
            key={doc.id}
            onClick={() => selectChannel(doc.id)}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <h4 className="font-medium">{doc.data().name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
