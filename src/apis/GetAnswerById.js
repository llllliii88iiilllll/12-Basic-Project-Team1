import { BASE_URL } from "./ApiConfig";

export const getAnswerById = async (answerId) => {
  try {
    const response = await fetch(`${BASE_URL}/answers/${answerId}/`);

    if (!response.ok) {
      throw new Error(`HTTP 에러! 상태 코드: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Answer ID ${answerId} 데이터를 불러오지 못했습니다.`, error);
    throw error;
  }
};
