import { BASE_URL } from "./ApiConfig";

export const postAnswer = async (questionId, answerContent, isRejected) => {
  const url = `${BASE_URL}/questions/${questionId}/answers/`;
  const requestBody = {
    content: answerContent,
    isRejected: isRejected,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("답변 제출에 실패했습니다.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("답변 제출 중 오류 발생:", error);
    throw error;
  }
};
