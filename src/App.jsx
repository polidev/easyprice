import { Routes, Route } from "react-router";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}

export default App;
