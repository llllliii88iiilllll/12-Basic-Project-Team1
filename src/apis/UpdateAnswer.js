import { BASE_URL } from "./ApiConfig";

// 수정된 답변을 서버에 PUT 요청으로 전송
export const updateAnswer = async (questionId, content, isRejected) => {
  try {
    const response = await fetch(`${BASE_URL}/answers/${questionId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answerText: content,
        isRejected: isRejected,
        updatedAt: new Date().toISOString(), // 수정 시간 추가
      }),
    });

    if (!response.ok) {
      throw new Error("답변 수정 실패");
    }

    const updatedAnswer = await response.json();
    return updatedAnswer;
  } catch (error) {
    console.error("답변 수정 오류:", error);
    throw error;
  }
};
