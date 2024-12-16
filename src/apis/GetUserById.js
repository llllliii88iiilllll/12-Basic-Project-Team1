import { BASE_URL } from "./ApiConfig";

export const getUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/subjects/${id}/`);
  if (!response.ok) {
    throw new Error("사용자 데이터를 불러오는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
};
