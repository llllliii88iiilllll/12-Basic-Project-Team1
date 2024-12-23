// utils/timeUtils.js
export const getRelativeTime = (dateString) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diff = now.getTime() - targetDate.getTime(); // 밀리초 단위 차이 계산

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 0) return `방금 전`; // 음수일 경우 처리
  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
};
