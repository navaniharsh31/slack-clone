import { useSelector } from "react-redux";
import { selectRoomId } from "../features/mainSlice";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Chat = () => {
  const [user] = useAuthState(auth);

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  console.log(roomDetails?.data());
  console.log(roomMessages);
  const [message, setMessage] = useState("");
  const sendMessage = (e, roomId) => {
    e.preventDefault();

    if (!roomId) {
      return false;
    }

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    setMessage("");
  };
  return (
    <>
      {!roomId ? (
        ""
      ) : (
        <div className="w-full overflow-y-scroll">
          <div className="my-4 mx-4 ">
            <h4 className="font-semibold"># {roomDetails?.data().name}</h4>
          </div>
          {roomMessages?.docs.map((doc) => {
            const { message, timestamp, user, userImage } = doc.data();
            return (
              <div key={doc.id} className="mx-4 mb-3 flex">
                <img src={userImage} alt={user} className="h-12" />
                <div className="flex flex-col ml-4">
                  <div className="flex">
                    <h5 className="font-semibold">{user}</h5>
                    <h5 className="font-semibold ml-4 text-gray-400">
                      {new Date(timestamp?.toDate()).toUTCString().slice(16,25)}
                    </h5>
                  </div>
                  <p>{message}</p>
                </div>
              </div>
            );
          })}
          <div className="pb-32"></div>

          <div className="border-r-10">
            <form className="relative flex justify-center">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${roomDetails?.data().name}`}
                className="fixed bottom-10 w-3/5 border-2 px-4 py-6 focus-within:outline-none"
              />
              <button
                hidden
                type="submit"
                onClick={(e) => sendMessage(e, roomId)}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
