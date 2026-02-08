import type { UserScheduleData } from "@/apis/participate/participateTypes";
import { dateFormatter } from "@/utils/dateFormatter";
import EventTagBox from "./EventTagBox";

export interface Event {
  id: string;
  name: string;
}

const CalendarTile = ({ date, schedules }: { date: Date; schedules: UserScheduleData[] }) => {
  const eventNames: Event[] = [];
  if (schedules) {
    schedules.forEach((schedule) => {
      if (dateFormatter(new Date(schedule.startAt)) === dateFormatter(date)) {
        eventNames.push({ id: schedule.eventId, name: schedule.title });
      }
    });
  }

  return <EventTagBox eventNames={eventNames} />;
};

export default CalendarTile;
