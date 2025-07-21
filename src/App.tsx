import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./pages/login/components/LoginContainer";
import LoginCompleteContainer from "./pages/login_complete/components/LoginCompleteContainer";
import BackgroundPage from "./pages/background/BackgroundPage";
import Memoir_meeting_All from "./pages/memoir/Memoir_meeting/Memoir_meeting_All";
import Memoir_write_ctn from "./pages/memoir/Memoir_write/Memoir_write_ctn";
import Memoir_complete_ctn from "./pages/memoir/Memoir_complete/Memoir_complete_ctn";
import MeetingCreationPage from "./pages/meeting/create/MeetingCreationPage";
import MeetingDetailPage from "./pages/meeting/detail/MeetingDetailPage";
import MeetingAlternativePage from "./pages/meeting/alternative/MeetingAlternativePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/alternative/:id" element={<MeetingAlternativePage />}></Route>
        <Route index path="/detail" element={<MeetingDetailPage />}></Route>
        <Route index path="/login" element={<LoginContainer />}></Route>
        <Route
          index
          path="/login_complete"
          element={<LoginCompleteContainer />}
        ></Route>
        <Route index path="/" element={<BackgroundPage />}></Route>
        <Route index path="/memoir" element={<Memoir_meeting_All />}></Route>
        <Route index path="/memoir-write" element={<Memoir_write_ctn/>}></Route>
        <Route index path="/memoir-complete" element={<Memoir_complete_ctn/>}></Route>
        <Route index path="/meeting-creation" element={<MeetingCreationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
