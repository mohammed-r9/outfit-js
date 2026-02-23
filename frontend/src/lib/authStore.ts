import { atom } from "jotai"

const auth = sessionStorage.getItem("auth")
export const isAuth = atom<boolean>(auth === "true" ? true : false)
