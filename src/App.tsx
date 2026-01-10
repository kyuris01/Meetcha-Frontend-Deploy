import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./pages/login/components/LoginContainer";
import LoginCompleteContainer from "./pages/login_complete/components/LoginCompleteContainer";
import BackgroundPage from "./pages/background/BackgroundPage";
import MemoirMeetingAll from "./pages/memoir/MemoirMeeting/MemoirMeetingAll";
import MemoirWriteCtn from "./pages/memoir/MemoirWrite/MemoirWiteCtn";
import MemoirCompleteCtn from "./pages/memoir/MemoirComplete/MemoirCompleteCtn";
import MeetingCreationPage from "./pages/meeting/create/MeetingCreationPage";
import MeetingDetailPage from "./pages/meeting/detail/MeetingDetailPage";
import MeetingAlternativePage from "./pages/meeting/alternative/MeetingAlternativePage";
import MeetingSharePage from "./pages/meeting/share/MeetingSharePage";
import SchedulePage from "./pages/schedule/SchedulePage";
import MeetingPage from "./pages/meeting/MeetingPage";

import ParticipateTimetableCtn from "./pages/participate/Participate_timetable/ParticipateTimetableCtn";

import ParticipateLink from "./pages/participate/Participate_link/ParticipateLinkCtn";

import ParticipateCompletedCtn from "./pages/participate/Participate_complete/ParticipateCompletedCtn";

import ParticipateErrorCtn from "./pages/participate/Participate_error/ParticipateErrorCtn";

import MyPage from "./pages/mypage/MyPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";

import LandingBackground from "./pages/landing/LandingBackground";
import MeetingLinkPage from "./pages/meeting/link/MeetingLinkPage";
import { AlreadyAuthRedirect } from "./components/AlreadyAuthRedirect";

import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/landingPage" replace />} />
        <Route element={<AlreadyAuthRedirect />}>
          <Route path="/landingPage" element={<LandingBackground />} />
          <Route path="/login" element={<LoginContainer />} />
        </Route>
        <Route path="/login-complete" element={<LoginCompleteContainer />}></Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/alternative/:id" element={<MeetingAlternativePage />}></Route>
          <Route path="/meeting/detail" element={<MeetingDetailPage />}></Route>
          <Route path="/" element={<BackgroundPage />}>
            <Route index element={<SchedulePage />} />
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="/memoir" element={<MemoirMeetingAll />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Route>
          <Route path="/memoir-write" element={<MemoirWriteCtn />}></Route>
          <Route path="/memoir-complete" element={<MemoirCompleteCtn />}></Route>
          <Route path="/timetable" element={<ParticipateTimetableCtn />}></Route>
          <Route path="/participate" element={<ParticipateLink />}></Route>
          <Route path="/error" element={<ParticipateErrorCtn />}></Route>
          <Route path="/complete" element={<ParticipateCompletedCtn />}></Route>
          <Route path="/meeting-creation" element={<MeetingCreationPage />}></Route>
          <Route path="/privacy" element={<PrivacyPage />}></Route>
          <Route path="/meeting/share/:meetingId" element={<MeetingSharePage />} />
          <Route path="/meeting/link" element={<MeetingLinkPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
