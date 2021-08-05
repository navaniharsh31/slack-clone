import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [loggedIn, loading] = useAuthState(auth);
  return (
    <div className="App">
      {!loggedIn ? (
        <Login />
      ) : (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex-1 overflow-y-auto flex">
            <Sidebar />
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
