// mocks/handlers/meetingHandlers.ts
import { http, HttpResponse } from 'msw';
import { meetingList } from '../data/meetinglists';

export const meetingHandlers = [
  http.get('/meeting_list', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id'); // 필요시
    return HttpResponse.json(meetingList, { status: 200 });
  }),
];
