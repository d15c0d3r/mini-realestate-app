export const initialErrorState = {
  email: "",
  name: "",
  contact: "",
  password: "",
  retypePasswod: "",
};

export const EMAIL = "email";
export const NAME = "name";
export const CONTACT = "contact";
export const PASSWORD = "password";
export const RETYPEPASSWORD = "retypePassword";

const errorReducer = (errorState, action) => {
  const { type, payload } = action;
  console.log(errorState.retypePasswod);
  if (type === EMAIL) {
    return {
      ...errorState,
      email: payload,
    };
  }
  if (type === NAME) {
    return {
      ...errorState,
      name: payload,
    };
  }
  if (type === CONTACT) {
    return {
      ...errorState,
      contact: payload,
    };
  }
  if (type === PASSWORD) {
    return {
      ...errorState,
      password: payload,
    };
  }
  if (type === RETYPEPASSWORD) {
    return {
      ...errorState,
      retypePasswod: payload,
    };
  }
  return {
    ...errorState,
  };
};

export default errorReducer;
