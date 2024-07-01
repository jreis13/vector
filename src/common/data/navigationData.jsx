import Login from "src/components/NavMenu/Login"

export const PATHS = [
  { name: "Companies", path: "/companies/" },
  { name: "Ecosystem", path: "/ecosystem/" },
  { name: "Platforms", path: "/platforms/" },
  { name: "Pricing", path: "/pricing/" },
  { name: "About", path: "/about/" },
  { name: "Login", path: "/login/", type: "image", imageComponent: Login },
]

export default PATHS
