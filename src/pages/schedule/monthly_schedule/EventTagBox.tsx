import { toast } from "react-toastify";

interface Props {
  eventName: string[];
}

const EventTagBox = ({ eventName }: Props) => {
  return (
    <div
      className="eventTagBox"
      onClick={() => {
        // 바깥 클릭을 한 번만 듣기 위한 핸들러 참조
        let clickAwayHandler: (e: MouseEvent) => void;

        // 토스트를 띄우고 해당 토스트의 id를 받아둠
        const id = toast(
          <div className="eventToast">
            {eventName.map((val, idx) => {
              return <div key={idx}>{val}</div>;
            })}
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
      }}
    >
      {eventName.map((item, index) => {
        if (index === 2) {
          return <div className="eventTag">...</div>;
        } else if (index > 2) {
          return null;
        }
        return (
          <div key={index} className="eventTag" title={item}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default EventTagBox;
