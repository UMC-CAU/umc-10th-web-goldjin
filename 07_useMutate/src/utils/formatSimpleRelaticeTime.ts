export const formatSimpleRelativeTime = (published: string | Date| undefined): string => {
    if (!published) return "";
  const publishedDate = new Date(published);
  const now = new Date();
  
  // 두 날짜의 차이 (밀리초 -> 초 단위 변환)
  const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

  // 미래 시간 예외 처리 및 1분 미만은 1분 전으로 처리
  if (diffInSeconds < 60) {
    return "1분 전";
  }

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  // 1. 분 단위 처리 (1시간 미만)
  if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes}분 전`;
  } 
  // 2. 시간 단위 처리 (24시간 미만)
  else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours}시간 전`;
  } 
  // 3. 일 단위 처리 (24시간 이상 전체)
  else {
    const days = Math.floor(diffInSeconds / day);
    return `${days}일 전`;
  }
};