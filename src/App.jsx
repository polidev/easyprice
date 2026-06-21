import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
