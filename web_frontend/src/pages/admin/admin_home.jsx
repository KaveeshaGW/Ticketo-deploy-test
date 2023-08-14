import React from "react";
import Sidebar from "../../components/admin/adminsidebar";
import Dashboard from "./Dashboard";
import StationMaster from "./StationMaster";
import StationMastersPage from "./StationMastersPage";
import TrainTicketIncome from "./TrainTicketIncome";
import ComplaintsPage from "./ComplaintsPage";
import ReportPage from "./ReportPage";

import { Route, Routes } from "react-router-dom";
import ViewDelays from "../admin/viewDelays";


const admin_home = () => {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/StationMaster" element={<StationMaster />} />
        <Route path="/StationMastersPage" element={<StationMastersPage />} />
        <Route
          path="/StationMastersPage/StationMaster"
          element={<StationMaster />}
        />

        <Route path="/TrainTicketIncome" element={<TrainTicketIncome />} />
        <Route path="/ComplaintsPage" element={<ComplaintsPage />} />
        <Route path="/ReportPage" element={<ReportPage />} />
        <Route path="/ViewDelays" element={<ViewDelays/>}/>

      </Routes>
    </Sidebar>
  );
};

export default admin_home;
