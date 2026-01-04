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


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landingPage" replace />} />
        <Route path="/landingPage" element={<LandingBackground />}></Route>
        <Route index path="/alternative/:id" element={<MeetingAlternativePage />}></Route>
        <Route index path="/meeting/detail" element={<MeetingDetailPage />}></Route>
        <Route path="/login" element={<LoginContainer />}></Route>
        <Route path="/login-complete" element={<LoginCompleteContainer />}></Route>
        <Route path="/" element={<BackgroundPage />}>
          <Route index path="schedule" element={<SchedulePage />} />
          <Route path="meeting" element={<MeetingPage />} />
          <Route index path="/memoir" element={<MemoirMeetingAll />}></Route>
          <Route index path="/mypage" element={<MyPage />}></Route>
        </Route>
        <Route index path="/memoir-write" element={<MemoirWriteCtn />}></Route>
        <Route index path="/memoir-complete" element={<MemoirCompleteCtn />}></Route>
        <Route index path="/timetable" element={<ParticipateTimetableCtn />}></Route>
        <Route index path="/participate" element={<ParticipateLink />}></Route>
        <Route index path="/error" element={<ParticipateErrorCtn />}></Route>
        <Route index path="/complete" element={<ParticipateCompletedCtn />}></Route>
        <Route index path="/meeting-creation" element={<MeetingCreationPage />}></Route>
        <Route index path="/privacy" element={<PrivacyPage />}></Route>
        <Route index path="/meeting/share/:meetingId" element={<MeetingSharePage />} />
        <Route index path="/meeting/link" element={<MeetingLinkPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
