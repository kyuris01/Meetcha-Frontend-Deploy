import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiCall } from "@/utils/apiCall";
import styles from "./MeetingLinkPage.module.scss";

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
    apiCall(`/meeting/code/${encodeURIComponent(code)}`, "GET", null, true)
      .then((res) => {
        if (!res) {
          navigate("/error");
          return;
        }

        if (res.code === 400) {
          navigate("/complete");
        } else if (res.code === 200) {
          navigate(`/timetable?meetingId=${res.data.meetingId}&pagenum=2`);
        } else {
          navigate("/error");
        }
      })
      .catch(() => {
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
