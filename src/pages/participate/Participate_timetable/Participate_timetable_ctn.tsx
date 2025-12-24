import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Timetable from "./Timetable";
import CountDown from "@/components/CountDown/CountDown";

import LeftChevron from "@/assets/LeftChevron.svg";

import type {
  ParticipateResponse,
  UserScheduleData,
  MeetingInfoData,
} from "@/apis/participate/participateTypes";

import "./Participate_timetabe.scss";

import type {
  SubmitAvailabilityBody,
  ParticipateObject,
} from "@/apis/participate/participateTypes";

import { parseISO } from "date-fns";
import { useGetSettingData } from "./TimetableHooks/ParticipateCtn/useGetSetting";
import { useGetScheduleData } from "./TimetableHooks/ParticipateCtn/useGetSchedule";
import { useHandleSubmitData } from "./TimetableHooks/ParticipateCtn/useHandleSubmit";
import { useGetFinalData } from "./TimetableHooks/ParticipateCtn/useGetFinalData";
const Participate_timetable_ctn = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const meetingId = params.get("meetingId") || "";
  const pageNum = params.get("pagenum");

  const [nickname, setNickname] = useState("");

  const [meetingData, setMeetingData] = useState<MeetingInfoData | null>(null); //참가페이지에 해당하는 미팅 데이터
  const [scheduleData, setScheduleData] = useState<UserScheduleData[]>([]); //사용자의 캘린더 데이터
  const [previousAvailTime, setPreviousAvailTime] = useState<ParticipateResponse | null>(null); //이전에 선택했던 시간 데이터 대안 시간 투표를 위한 데이터

  //이 친구는 선택된 시간 데이터들(startAt,endAt)데이터들의 배열임
  const [selectedTimes, setSelectedTimes] = useState<ParticipateObject[]>([]); //  수정됨: 선택된 시간 저장용 state

  const backtoLink = () => {
    navigate("/schedule");
  };

  const finalPostData: SubmitAvailabilityBody = useGetFinalData(selectedTimes, nickname);

  useGetSettingData(meetingId, pageNum as string, setMeetingData, setPreviousAvailTime);

  useGetScheduleData(meetingData as MeetingInfoData, setScheduleData);

  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  }; //나중에 backend에 post로 보낼예정..

  const handleSubmit = useHandleSubmitData(meetingId, pageNum as string, finalPostData);

  // meetingData가 확보된 뒤에만 본문 렌더
  return (
    <div className="ctn">
      <div className="top_ctn">
        <img src={LeftChevron} alt="LeftChevron" onClick={backtoLink} />
        <p>미팅 참가</p>
      </div>

      <div className="participate_ctn">
        {meetingData && (
          <CountDown label={"참가 마감 시간"} finishTime={parseISO(meetingData.deadline)} />
        )}
        <div className="text_container1">
          <div className="meeting_info_ctn">
            <div className="dividend"></div>
            {meetingData && (
              <div className="meeting_info">
                <p>{meetingData?.title}</p>
                <p>{meetingData?.description}</p>
              </div>
            )}
          </div>

          <input type="text" value={nickname} onChange={handleSetNickname} placeholder="닉네임" />
        </div>

        <div className="timetable">
          <p>
            참여 가능 시간<span>*</span>
          </p>
          <div
            className="timetable_ctn"
            tabIndex={-1}
            onPointerDownCapture={() => {
              const a = document.activeElement as HTMLElement | null;
              if (a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable))
                a.blur();
            }}
          >
            {meetingData && (
              <Timetable
                candidateDates={
                  Array.isArray(meetingData?.candidateDates) ? meetingData?.candidateDates : []
                } //이거는 내가 선택하는 후보날짜
                selectedTimes={selectedTimes}
                setSelectedTimes={setSelectedTimes}
                previousAvailTime={Array.isArray(previousAvailTime) ? previousAvailTime : []}
                scheduleData={scheduleData /* []로 보장됨 */}
              />
            )}
          </div>
        </div>
      </div>

      <div className="button_ctn">
        <button className="button" onClick={handleSubmit}>
          <div className="button_p_ctn">
            <p>참여하기</p>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Participate_timetable_ctn;
