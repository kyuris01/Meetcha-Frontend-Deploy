import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./MeetingLinkPage.module.scss";
import { requestLinkCheckFunc } from "@/apis/participate/participate_link/linkAPI";
import { UnauthorizedError } from "@/errors/errors";
import { getMeetingShareLink } from "@/utils/meetingShare";

const MeetingLinkPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate("/error");
      return;
    }

    // 미팅 코드 검증 및 리다이렉트
    requestLinkCheckFunc(code)
      .then((res) => {
        if (res.code === 200) {
          navigate(`/timetable?meetingId=${res.data.meetingId}&pagenum=2`);
        }
      })
      .catch((error) => {
        if (error instanceof UnauthorizedError) {
          alert("로그인이 필요합니다!");
          sessionStorage.setItem("reservedNavigate", getMeetingShareLink(code));
          navigate("/login");
          return;
        }
        navigate("/error");
      });
  }, [searchParams, navigate]);

  return (
    <div className={styles.meetingLinkPage}>
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>미팅 정보를 확인하는 중...</p>
      </div>
    </div>
  );
};

export default MeetingLinkPage;
