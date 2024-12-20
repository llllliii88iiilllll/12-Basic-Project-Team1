import { BASE_URL } from "./ApiConfig";

export const postReaction = async (questionId, reactionType) => {
  try {
    const response = await fetch(
      `${BASE_URL}/questions/${questionId}/reaction/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: reactionType }),
      }
    );

    if (response.ok) {
      // 응답이 성공적인 경우, 응답 본문을 반환
      return await response.json();
    } else {
      // 응답이 실패한 경우, 서버에서 반환한 에러 메시지를 출력
      const errorData = await response.json();
      console.error("API 오류 응답:", errorData);
      throw new Error(
        `반응 처리 실패: ${errorData.message || "알 수 없는 오류"}`
      );
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error; // 오류를 상위 호출로 전달
  }
};
