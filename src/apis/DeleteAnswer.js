import { BASE_URL } from "./ApiConfig";

// 답변 삭제 요청 함수
export const deleteAnswer = async (answerId) => {
  try {
    const response = await delete `${BASE_URL}/answerId/${answerId}/`;
    return response.data; // 삭제 성공 후 반환된 데이터
  } catch (error) {
    console.error("답변 삭제 실패:", error);
    throw error; // 에러를 호출한 곳으로 전파
  }
};
