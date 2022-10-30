export const authanticated = (activeAccountType) => ({
    type: "authanticated",
    activeAccount:activeAccountType
})


export const notauthanticated = () => ({
    type: "notauthanticated",
    activeAccount:"none"
})

