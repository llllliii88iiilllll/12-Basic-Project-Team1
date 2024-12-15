import { BASE_URL } from "./ApiConfig";

export async function getSubjects({ limit, offset, sort }) {
  const query = `limit=${limit}&offset=${offset}&sort=${sort}`;
  const response = await fetch(`${BASE_URL}/subjects/?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
