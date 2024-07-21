import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomepagePage from "./pages/Homepage";
import Uploads from "./pages/Uploads";
import LoginPage from "./pages/Loginpage"
import NotFound from "./pages/Notfound";
import Create from "./pages/Createpage";

const Homepage = React.lazy(() => import("./pages/Homepage"));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Homepage" element={<HomepagePage />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Uploads" element={<Uploads />} />
          <Route path="/NotFound" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
