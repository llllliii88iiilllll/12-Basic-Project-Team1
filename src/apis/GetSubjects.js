import { BASE_URL } from "./ApiConfig";

// 캐시를 위한 전역 변수
let cachedSubjects = [];

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

// 데이터를 받아와서 로컬에 저장
export async function loadSubjects() {
  try {
    const subjects = await getSubjects({ limit: 1000, offset: 0 }); // 필요한 데이터를 받아옵니다
    if (Array.isArray(subjects.results)) {
      // `results`에 실제 배열이 있는지 확인
      cachedSubjects = subjects.results; // 성공적으로 로드되면 캐시에 저장
      console.log("로드된 데이터:", cachedSubjects); // 로딩된 데이터 확인
    } else {
      console.error("받은 데이터가 배열이 아닙니다:", subjects);
    }
  } catch (err) {
    console.error("데이터 로드 오류:", err);
  }
}

// 로컬 데이터에서 중복 체크
export function checkDuplicateNameLocally(name) {
  console.log("중복 체크 대상 이름:", name); // 입력된 이름 확인
  if (Array.isArray(cachedSubjects)) {
    const isDuplicate = cachedSubjects.some((subject) => subject.name === name);
    console.log("중복 체크 결과:", isDuplicate); // 중복 여부 확인
    return isDuplicate;
  } else {
    console.error("캐시된 데이터가 배열이 아닙니다.");
    return false;
  }
}
