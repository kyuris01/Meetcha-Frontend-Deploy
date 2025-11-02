import { http, HttpResponse } from "msw";
import { projectsAll } from "../data/projectsAll";

export const projectsAllHandlers = [
  http.get("/projects_all", ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");
    return HttpResponse.json(projectsAll, { status: 200 });
  }),
];
