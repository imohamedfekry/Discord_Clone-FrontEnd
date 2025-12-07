export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  me: {
    meProfile: "/users/@me",
  },
  friends: {
    list: "/users/friends",
    requests: "/users/friends/requests",
    respond: "/users/friends/respond",
    cancel: "/users/friends/cancel",
    remove: "/users/friends/remove",
  },
  relations: {
    base: "/users/relations",
    blocked: "/users/relations/blocked",
  },
};
