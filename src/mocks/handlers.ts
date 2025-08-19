import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user/schedule", ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    // console.log("쿼리 파라미터:", { from, to });

    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "일정 조회 성공",
      data: [
        {
          eventId: "abc123xyz",
          title: "회의",
          startAt: "2025-08-01T14:00:00",
          endAt: "2025-08-01T15:00:00",
          recurrence: "BIWEEKLY", // or "매일", "매월", "NONE"
        },
        {
          eventId: "def456uvw",
          title: "점심 시간",
          startAt: "2025-08-02T12:00:00",
          endAt: "2025-08-02T13:00:00",
          recurrence: "WEEKLY", // or "매일", "매월", "NONE"
        },
      ],
    });
  }),
  http.get<{ meetingId: string }>("/meeting-lists/:meetingId", ({ params }) => {
    const { meetingId } = params;
    console.log("meetingId: ", meetingId);
    let data;
    switch (meetingId) {
      case "a8f2b6f7-43a7-4a83-b57e-7dc99c3a9d3d":
        data = {
          isSuccess: true,
          code: 200,
          message: "미팅 상세 조회 성공",
          data: {
            meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c3a9d3d",
            title: "전공 기초 프로젝트",
            description: "1학년 전공 기초 팀 프로젝트를 위한 회의",
            meetingStatus: "MATCHING",
            deadline: "2024-05-31T13:00:00+09:00",
            durationMinutes: 120,
            meetingCode: "adf73f37",
            participants: [
              {
                participantId: "u1a2b3c",
                nickname: "이은지",
                profileImageUrl: "https://picsum.photos/200?random=1",
              },
              {
                participantId: "u4d5e6f",
                nickname: "박진수",
                profileImageUrl: "https://picsum.photos/200?random=1",
              },
            ],
            finalSchedule: {
              type: "confirmed",
              startAt: "2024-05-27T13:00:00+09:00",
              endAt: "2024-05-27T15:00:00+09:00",
            },
          },
        };
        break;
      case "a8f2b6f7-43a7-4a83-b57e-7dc99c67cn13":
        data = {
          isSuccess: true,
          code: 200,
          message: "미팅 상세 조회 성공",
          data: {
            meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c67cn13",
            title: "모바일 프로그래밍",
            description: "앱 개발 결과물 시연 및 피드백 회의",
            meetingStatus: "MATCHING",
            deadline: "2025-08-01T13:00:00+09:00",
            durationMinutes: 120,
            meetingCode: "adf73f37",
            participants: [
              {
                participantId: "p123abc",
                nickname: "정유진",
                profileImageUrl: "https://example.com/images/p123abc.png",
              },
              {
                participantId: "p456def",
                nickname: "오세훈",
                profileImageUrl: "https://example.com/images/p456def.png",
              },
            ],
            finalSchedule: {
              type: "success",
              startAt: "2024-08-03T13:00:00+09:00",
              endAt: "2024-08-03T15:00:00+09:00",
            },
          },
        };
        break;
      case "6c3d43e4-2de2-4bd7-8b92-5c1c2e3bc18e":
        data = {
          isSuccess: true,
          code: 200,
          message: "미팅 상세 조회 성공",
          data: {
            meetingId: "6c3d43e4-2de2-4bd7-8b92-5c1c2e3bc18e",
            title: "코딩 스터디",
            description: "알고리즘 문제풀이 정기 모임",
            meetingStatus: "MATCH_FAILED",
            deadline: "2024-06-01T13:00:00+09:00",
            durationMinutes: 90,
            meetingCode: "adf73f37",
            participants: [],
            finalSchedule: {
              type: "fail",
              startAt: null,
              endAt: null,
            },
          },
        };
        break;
      case "6c3d1111-2de2-4bd7-8b92-5c1c2e3bc18e":
        data = {
          isSuccess: true,
          code: 200,
          message: "미팅 상세 조회 성공",
          data: {
            meetingId: "6c3d1111-2de2-4bd7-8b92-5c1c2e3bc18e",
            title: "자바스크립트 스터디",
            description: "자바스크립트 심화 주제 스터디",
            meetingStatus: "BEFORE",
            deadline: "2024-06-01T13:00:00+09:00",
            durationMinutes: 90,
            meetingCode: "adf73f37",
            participants: [
              {
                participantId: "p789ghi",
                nickname: "김다정",
                profileImageUrl: "https://picsum.photos/200?random=1",
              },
              {
                participantId: "p111ghi",
                nickname: "김준표",
                profileImageUrl: "https://picsum.photos/200?random=1",
              },
              {
                participantId: "p222ghi",
                nickname: "이우진",
                profileImageUrl: "https://picsum.photos/200?random=1",
              },
            ],
            finalSchedule: {
              type: "pending",
              startAt: null,
              endAt: null,
            },
          },
        };
        break;
    }

    return HttpResponse.json(data);
  }),
  http.get("/meeting-lists", ({ request }) => {
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "유저 미팅 목록 조회 성공",
      data: [
        {
          meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c3a9d3d",
          title: "전공 기초 프로젝트",
          deadline: "2024-05-31T13:00:00+09:00",
          confirmedTime: "2024-05-27T13:00:00+09:00",
          durationMinutes: 120,
          meetingStatus: "MATCHING",
        },
        {
          meetingId: "a8f2b6f7-43a7-4a83-b57e-7dc99c67cn13",
          title: "모바일 프로그래밍",
          deadline: "2025-08-01T13:00:00+09:00",
          confirmedTime: "2024-08-03T13:00:00+09:00",
          durationMinutes: 120,
          meetingStatus: "MATCH_FAILED",
        },
        {
          meetingId: "6c3d43e4-2de2-4bd7-8b92-5c1c2e3bc18e",
          title: "코딩 스터디",
          deadline: "2024-06-01T13:00:00+09:00",
          confirmedTime: null,
          durationMinutes: 90,
          meetingStatus: "BEFORE",
        },
        {
          meetingId: "6c3d1111-2de2-4bd7-8b92-5c1c2e3bc18e",
          title: "자바스크립트 스터디",
          deadline: "2024-06-01T13:00:00+09:00",
          confirmedTime: null,
          durationMinutes: 90,
          meetingStatus: "매칭 중",
        },
      ],
    });
  }),
  http.get<{ meetingId: string }>("/meeting-lists/:meetingId/alternative-times", ({ params }) => {
    const { meetingId } = params;
    console.log(meetingId);

    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "대안시간 후보 조회 성공",
      data: {
        alternativeTimes: [
          {
            startTime: "2025-07-25T14:00:00",
            endTime: "2025-07-25T14:30:00",
            adjustedDurationMinutes: 30,
            includedUserNames: ["김철수", "이영희"],
            excludedUserNames: ["홍길동"],
            checked: true,
          },
          {
            startTime: "2025-07-25T15:00:00",
            endTime: "2025-07-25T15:30:00",
            adjustedDurationMinutes: 30,
            includedUserNames: ["김철수"],
            excludedUserNames: ["이영희", "홍길동"],
            checked: false,
          },
        ],
        userSelectedTime: "2025-07-25T14:00:00",
      },
    });
  }),
];
