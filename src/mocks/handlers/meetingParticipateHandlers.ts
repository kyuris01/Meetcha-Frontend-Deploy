import {http,HttpResponse}from 'msw';
import { meetingParticipate } from '../data/meetingParticipate';

export const meetingParticipateHandlers=[
    http.get('/participate_list',({request})=>{
        const url=new URL(request.url);
        const userId=url.searchParams.get('id');
        return HttpResponse.json(meetingParticipate,{status:200});

    }),
];