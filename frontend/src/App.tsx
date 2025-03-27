import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeYourInvite from "./pages/MakeYourInvite";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/makeyourinvite" element={<MakeYourInvite/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
