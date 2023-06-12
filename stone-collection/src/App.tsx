import "./App.css";
import Home from "./pages/Home";
import { Buffer } from "buffer";
window.Buffer = Buffer;

function App() {
  return <Home />;
}

export default App;
