export const LoginStart = () => ({
    type:"LOGIN_START",
});
export const Logout = () => ({
    type:"LOGOUT",
});
export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload:user,
});
export const LoginFaliure = (error) => ({
    type:"LOGIN_FAILURE",
    payload:error,
});