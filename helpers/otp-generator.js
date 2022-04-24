const singleDigitGenerator = () => {
  const digit = Math.floor(Math.random() * 10 + 1) % 10;
  return digit.toString();
};

export const optionsGenerator = (to, from, subject, otp, message) => {
  const options = {
    from,
    to,
    subject,
    text: "OTP: " + otp + " " + message,
  };
  return options;
};

export const verifyOtp = (data, userOtp) => {
  //change logic based on the timestamp
  const { EMAIL: email, OTP: otp, TIME_STAMP: timeStamp } = data;
  if (otp === parseInt(userOtp)) return true;
  return false;
};

const otpGenerator = () => {
  const otp =
    singleDigitGenerator() +
    singleDigitGenerator() +
    singleDigitGenerator() +
    singleDigitGenerator();

  return String(otp);
};

export default otpGenerator;
