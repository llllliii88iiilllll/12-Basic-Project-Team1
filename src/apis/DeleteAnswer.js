import { BASE_URL } from "./ApiConfig";

export const deleteAnswer = async (answerId) => {
  try {
    const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
      method: "DELETE",
    });

    // 상태 코드가 204가 아닐 경우 응답 본문을 확인
    if (response.status !== 204) {
      const errorData = await response.json();
      console.error("삭제 실패:", errorData);
      throw new Error("답변 삭제에 실패했습니다.");
    }

    console.log(`답변 삭제 성공: ${answerId}`);
  } catch (error) {
    console.error("삭제 요청 에러:", error);
    throw error;
  }
};
