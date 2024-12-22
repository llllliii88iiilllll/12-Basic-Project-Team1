import { BASE_URL } from "./ApiConfig";

// 질문 삭제 함수
export const deleteQuestion = async (questionId) => {
  try {
    const response = await fetch(`${BASE_URL}/questions/${questionId}/`, {
      method: "DELETE",
    });

    if (response.status !== 204) {
      throw new Error("질문 삭제에 실패했습니다.");
    }

    console.log(`질문 삭제 성공: ${questionId}`);
  } catch (error) {
    console.error("삭제 요청 에러:", error);
    throw error;
  }
};
