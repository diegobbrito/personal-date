import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeYourInvite from "./pages/MakeYourInvite";
import Checkout from "./pages/Checkout";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/makeyourinvite" element={<MakeYourInvite/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
