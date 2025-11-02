import { meetingHandlers } from "./meetingHandlers";
import { http } from "msw";
import { projectsAllHandlers } from "./projectsAllHandler";
import { meetingParticipateHandlers } from "./meetingParticipateHandlers";
export const handlers = [...meetingHandlers, ...projectsAllHandlers, ...meetingParticipateHandlers];
