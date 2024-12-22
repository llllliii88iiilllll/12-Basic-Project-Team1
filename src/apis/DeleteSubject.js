import { BASE_URL } from "./ApiConfig";

export const deleteSubject = async (subjectId) => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${subjectId}/`, {
      method: "DELETE",
    });

    if (response.status !== 204) {
      throw new Error("질문 대상 삭제에 실패했습니다.");
    }

    console.log(`질문 대상(ID: ${subjectId}) 삭제 성공`);
  } catch (error) {
    console.error("질문 대상 삭제 실패:", error);
    throw error;
  }
};
