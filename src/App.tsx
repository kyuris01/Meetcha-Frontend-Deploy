import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./pages/login/components/LoginContainer";
import LoginCompleteContainer from "./pages/login_complete/components/LoginCompleteContainer";
import BackgroundPage from "./pages/background/BackgroundPage";
import Memoir_meeting_All from "./pages/memoir/Memoir_meeting/Memoir_meeting_All";
import Memoir_write_ctn from "./pages/memoir/Memoir_write/Memoir_write_ctn";
import Memoir_complete_ctn from "./pages/memoir/Memoir_complete/Memoir_complete_ctn";
import MeetingCreationPage from "./pages/meeting/create/MeetingCreationPage";
import MeetingDetailPage from "./pages/meeting/detail/MeetingDetailPage";
import MeetingAlternativePage from "./pages/meeting/alternative/MeetingAlternativePage";
import SchedulePage from "./pages/schedule/SchedulePage";
import MeetingPage from "./pages/meeting/MeetingPage";

import Participate_timetable_ctn from "./pages/participate/Participate_timetable/Participate_timetable_ctn";

import Participate_link from "./pages/participate/Participate_link/Participate_link_ctn";

import Participate_completed_ctn from "./pages/participate/Participate_complete/Participate_completed_ctn";

import Participate_error_ctn from "./pages/participate/Participate_error/Participate_error_ctn";

import MyPage from "./pages/mypage/MyPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";

import LandingBackground from "./pages/landing/LandingBackground";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landingPage" replace />} />
        <Route path="/landingPage" element={<LandingBackground/>}></Route>
        <Route index path="/alternative/:id" element={<MeetingAlternativePage />}></Route>
        <Route index path="/meeting/detail" element={<MeetingDetailPage />}></Route>
        <Route path="/login" element={<LoginContainer />}></Route>
        <Route path="/login-complete" element={<LoginCompleteContainer />}></Route>
        <Route path="/" element={<BackgroundPage />}>
          <Route index path="schedule" element={<SchedulePage />} />
          <Route path="meeting" element={<MeetingPage />} />
          <Route index path="/memoir" element={<Memoir_meeting_All />}></Route>
          <Route index path="/mypage" element={<MyPage />}></Route>
        </Route>
        <Route index path="/memoir-write" element={<Memoir_write_ctn />}></Route>
        <Route index path="/memoir-complete" element={<Memoir_complete_ctn />}></Route>
        <Route index path="/timetable" element={<Participate_timetable_ctn />}></Route>
        <Route index path="/participate" element={<Participate_link />}></Route>
        <Route index path="/error" element={<Participate_error_ctn />}></Route>
        <Route
          index
          path="/complete"
          element={<Participate_completed_ctn />}
        ></Route>
        <Route
          index
          path="/meeting-creation"
          element={<MeetingCreationPage />}
        ></Route>
        <Route index path="/privacy" element={<PrivacyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
