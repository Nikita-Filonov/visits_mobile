import moment from 'moment';

export const parseStudentQRCode = async (
  qrCodesFromVision: Array,
): boolean | Object => {
  if (qrCodesFromVision.length === 0) {
    return false;
  }

  let payload = qrCodesFromVision[0]?.displayValue;

  try {
    payload = JSON.parse(payload);
  } catch {
    return false;
  }

  if (!payload?.userId) {
    return false;
  }

  return payload;
};

export const isDateTimeValid = (datetime, format = 'DD/MM/YYYY HH:mm:ss') =>
  moment(datetime, format, true).isValid();

export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getEmailOrUsername = async (emailOrUsername: string) => {
  if (validateEmail(emailOrUsername)) {
    return {email: emailOrUsername};
  }
  return {username: emailOrUsername};
};
