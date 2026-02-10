import { toast } from "react-toastify";
import type { Event } from "./MonthlyCalendarTile";

interface Props {
  eventNames: Event[];
}

const EventTagBox = ({ eventNames }: Props) => {
  const eventBoxClickHandler = () => {
    // 바깥 클릭을 한 번만 듣기 위한 핸들러 참조
    let clickAwayHandler: (e: MouseEvent) => void;

    // 토스트를 띄우고 해당 토스트의 id를 받아둠
    const id = toast(
      <div className="eventToast">
        {eventNames.length !== 0 ? (
          eventNames.map((val) => {
            return <span key={val.id}>{val.name}</span>;
          })
        ) : (
          <div>일정이 없습니다</div>
        )}
      </div>,
      {
        containerId: "clickClose",
        autoClose: false,
        closeOnClick: false,

        // 열릴 때 문서 클릭(캡처 단계) 한 번만 감시
        onOpen: () => {
          clickAwayHandler = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            // 토스트 내부 클릭이면 무시
            if (el.closest(".Toastify__toast")) return;

            // 바깥 클릭이면 닫고 리스너 해제
            toast.dismiss(id);
            document.removeEventListener("click", clickAwayHandler, true);
          };

          // 현재 클릭 이벤트(토스트를 연 클릭)에 바로 걸리지 않도록 지연
          setTimeout(() => {
            document.addEventListener("click", clickAwayHandler, { capture: true });
          }, 0);
        },

        // 혹시 다른 방식으로 닫혀도 리스너 정리
        onClose: () => {
          if (clickAwayHandler) {
            document.removeEventListener("click", clickAwayHandler, true);
          }
        },
      }
    );
  };

  return (
    <div className="eventTagBox" onClick={eventBoxClickHandler}>
      {eventNames.map((item, index) => {
        if (index === 2) {
          return (
            <div className="eventTag" key={index}>
              ...
            </div>
          );
        } else if (index > 2) {
          return null;
        }
        return (
          <div key={index} className="eventTag" title={item.name}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default EventTagBox;
