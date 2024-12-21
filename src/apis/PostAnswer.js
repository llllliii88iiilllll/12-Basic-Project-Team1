import { BASE_URL } from "./ApiConfig";

export const postAnswer = async (questionId, { content, isRejected }) => {
  try {
    const response = await fetch(
        `${BASE_URL}/questions/${questionId}/answers/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: answer,
                    isRejected,
                }),
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("답변 생성 요청 실패:", error);
        throw error;
    }
};