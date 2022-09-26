export const addLoginInfo = (email,password) => ({
    type: "add",
    data:{
        email:email,
        password,password
    }
  
})


export const removeLogınInfo = (email,password) => ({
    type: "remove",
    data:{
        email:email,
        password,password
    }
    
})