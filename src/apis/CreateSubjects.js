import { BASE_URL } from "./ApiConfig";

export const createSubject = async (name) => {
  const response = await fetch(`${BASE_URL}/subjects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("주제 생성에 실패했습니다. 다시 시도해주세요.");
  }

  return response.json();
};
