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
