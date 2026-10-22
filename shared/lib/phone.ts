/* 입력값에서 숫자만 남긴다. "010-1234-5678" → "01012345678" */
export function toDigits(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

/* 휴대폰 번호 형식인지 확인한다. 010으로 시작하는 10~11자리 */
export function isValidPhone(value: string): boolean {
  return /^01[016789]\d{7,8}$/.test(value);
}

/* 화면 표시용으로 하이픈을 넣는다. "01012345678" → "010-1234-5678" */
export function formatPhone(value: string): string {
  if (value.length === 11)
    return value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  if (value.length === 10)
    return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  return value;
}
