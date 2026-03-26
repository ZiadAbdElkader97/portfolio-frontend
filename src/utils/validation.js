export function isValidEmail(email) {
  return /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/.test(String(email).trim());
}
