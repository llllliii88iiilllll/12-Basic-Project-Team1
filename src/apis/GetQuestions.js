import { BASE_URL } from "./ApiConfig";

export const getQuestionsBySubjectId = async (subjectId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/subjects/${subjectId}/questions/`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("질문 데이터를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
