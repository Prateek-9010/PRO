import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepagePage from "./pages/Homepage";
import Uploads from "./pages/Uploads";

const Homepage = React.lazy(() => import("./pages/Homepage"));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<HomepagePage />} />
          <Route path="/Uploads" element={<Uploads />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
