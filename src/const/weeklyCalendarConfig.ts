import { DateTime } from "luxon";
import { luxonLocalizer } from "react-big-calendar";
import CustomWeekHeader from "../components/domain/schedule/weekly_schedule/CustomWeekHeader";
import { CustomEvent } from "../components/domain/schedule/weekly_schedule/CustomEvent";
import { colorAutoSelector } from "@/utils/colorAutoSelector";

export const localizer = luxonLocalizer(DateTime);

export const calendarConfig = {
  defaultView: "week",
  views: ["week"] as Array<"week">,

  step: 30, // 각 시간 슬롯 간격 (분 단위)
  timeslots: 2, // 한 시간당 몇 개의 슬롯
  longPressThreshold: 200,

  formats: {
    timeGutterFormat: (date: Date) => {
      return DateTime.fromJSDate(date).toFormat("H");
    },
  },

  components: {
    week: {
      header: CustomWeekHeader,
      event: CustomEvent,
    },
  },

  eventPropGetter: (event) => ({
    style: {
      backgroundColor: colorAutoSelector(event.eventId),
      borderRadius: "6px",
      color: "white",
    },
  }),
} as const;
