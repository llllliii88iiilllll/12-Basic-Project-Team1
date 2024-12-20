import { BASE_URL } from "./ApiConfig";

export const postQuestion = async ({ subjectId, question }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/subjects/${subjectId}/questions/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: question,
          like: 0, // 초기값 설정
          dislike: 0, // 초기값 설정
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result; // 요청 성공 시 결과 반환
  } catch (error) {
    console.error("질문 전송 중 오류 발생:", error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};
