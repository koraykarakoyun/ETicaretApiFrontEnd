export const authanticated = (activeAccountType,role) => ({
    type: "authanticated",
    activeAccount:activeAccountType,
    role:role
})


export const notauthanticated = () => ({
    type: "notauthanticated",
    activeAccount:"none"
})

