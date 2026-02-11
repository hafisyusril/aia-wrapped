export const addCookie = (name: string, value: string, minutes?: number) => {
  if (typeof document === "undefined") return;
  let expires = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; Expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; Path=/";
};

export const getCookie = (name: string) => {
  if (typeof document === "undefined") return null; // Ensure document is defined
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
