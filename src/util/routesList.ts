const staticRoutes = {
    landing: "/landing"
}

const authRoutes = {
    register: "/auth/register",
    login: "/auth/login"
}

const boardRoutes = {
    create: "/board/create",
    board: (id: string) => `/board/${id}`
}

export {authRoutes, staticRoutes, boardRoutes}

