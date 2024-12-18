import { BASE_URL } from "./ApiConfig";

export async function getSubjects({ limit, offset, sort }) {
  const query = `limit=${limit}&offset=${offset}&sort=${sort}`;
  const fullUrl = `${BASE_URL}/subjects/?${query}`;

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
