import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import OptionPage from "./pages/OptionPage";
import RunWalkPage from "./pages/RunWalkPage";
import RunPage from "./pages/RunPage";
import WalkPage from "./pages/WalkPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/options" element={<OptionPage />} />

      <Route path="/options/run-walk" element={<RunWalkPage />} />
      <Route path="/options/run" element={<RunPage />} />
      <Route path="/options/walk" element={<WalkPage />} />
    </Routes>
  );
};

export default App;
