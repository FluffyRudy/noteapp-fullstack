const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const ENDPOINTS = {
    LOGIN: { name: "login", route: "/api/token/" },
    REGISTER: { name: "register", route: "/api/user/create/" },
    NEW_REFRESH_TOKEN: {
        name: "new_refresh_token",
        route: "/api/token/refresh/",
    },
    HOME: { name: "home", route: "/" },
    NOTE_LIST: { name: "note_list", route: "/api/notes/" },
    NOTE_CREATE: { name: "note_create", route: "/api/notes/create/" },
    NOTE_DELETE: { name: "note_delete", route: "api/notes/delete/" },
};

export { ACCESS_TOKEN, ENDPOINTS, REFRESH_TOKEN };
