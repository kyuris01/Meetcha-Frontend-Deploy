import { AnimatePresence, motion, useDragControls } from "framer-motion";
import ScheduleCrudPage from "../schedule_crud/ScheduleCrudPage";
import ReactDOM from "react-dom";

export default function ScheduleSlidePanel({
  open,
  clickedSpan,
  slideType,
  clickedSchedule,
  setCrudOpen,
  onClose,
}) {
  const dragControls = useDragControls();

  const handlePointerDown = (e) => {
    if (e.target.closest(".time-picker-no-drag")) {
      e.stopPropagation();
    }
  };

  const slideUp = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="backdrop" onClick={onClose} />

          <motion.div
            className="slideUpContainer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onPointerDown={handlePointerDown}
            drag="y"
            dragControls={dragControls}
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 1000 }}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.y > window.innerHeight * 0.2) {
                onClose();
              }
            }}
          >
            <ScheduleCrudPage
              clickedSpan={clickedSpan}
              slideType={slideType}
              data={clickedSchedule}
              setCrudOpen={setCrudOpen}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(slideUp, document.getElementById("root")!);
}
