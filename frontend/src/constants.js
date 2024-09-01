const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const ENDPOINTS = {
    LOGIN: { name: "login", route: "/api/token/" },
    REGISTER: { name: "register", route: "/api/user/create" },
    NEW_REFRESH_TOKEN: {
        name: "new_refresh_token",
        route: "/api/token/refresh",
    },
    HOME: { name: "home", route: "/" },
};

export { ACCESS_TOKEN, REFRESH_TOKEN, ENDPOINTS };
