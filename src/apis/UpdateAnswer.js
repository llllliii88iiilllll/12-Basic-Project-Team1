import { BASE_URL } from "./ApiConfig";

export const updateAnswer = async (answerId, content, isRejected) => {
  try {
    const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content, // 수정된 답변 내용
        isRejected: isRejected.toString(), // isRejected를 문자열로 변환하여 전송
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // 오류 메시지 확인
      throw new Error(`답변 수정 실패: ${errorText}`);
    }

    const updatedAnswer = await response.json();
    return updatedAnswer;
  } catch (error) {
    console.error("답변 수정 오류:", error);
    throw error;
  }
};
