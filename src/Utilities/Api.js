import { useEffect } from "react";
import { store } from "../index"
const statuscodeControl = (res, method_type, origin, port, controller, action, id, formData) => {
    if (res.status == 200) {
        return res.json();
    }
    else if (res.status == 401) {
        return refreshTokenApi(method_type, origin, port, controller, action, id, formData);
    }
    else if (res.status == 500) {
        return res.json();
    }
}

const refreshTokenApi = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null, formData = null) => {
    //-----------------

    let refreshtoken = localStorage.getItem("refreshtoken");
    let data = {
        "refreshToken": String(refreshtoken)
    }

    return fetch(`https://localhost:7098/api/auth/refreshtokenlogin`, {
        headers: new Headers({
            'content-type': 'application/json',
        }),
        method: "POST",
        body: JSON.stringify(data)
    }
    ).then(function (res) {
        return res.json()
    }).then(response => {
        localStorage.setItem("token", response.token.accessToken);
        localStorage.setItem("refreshtoken", response.token.refreshToken);
    }).then(() => {


        if (method_type == "GET") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }),
                    method: method_type,

                }).then(res => {
                    return res.json();
                })
            }
            else if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }),
                    method: method_type,

                }).then(res => {
                    return res.json();
                })

            }
        }

        else {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(res => {
                    return res.json();
                })
            }
            else if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(res => {
                    return res.json();
                })

            }
        }




    })
    //------

}


export const api = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null, formData = null) => {

    let token = "";

    if (store.getState().auth.isAuth) {

        if (store.getState().auth.activeAccount == "internal") {
            token = localStorage.getItem("token");

        }

        else if (store.getState().auth.activeAccount == "google") {
            token = localStorage.getItem("googletoken");

        }
        else if (store.getState().auth.activeAccount == "facebook") {
            token = localStorage.getItem("facebooktoken");

        }
    }


    if (method_type == "GET") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,

                }),
                method: method_type,

            }
            ).then(function (res) {
                return statuscodeControl(res, method_type, origin, port, controller, action, null);
            }
            )

        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }),
                method: method_type,
            }).then(function (res) {
                return res.json()
            }
            )
        }

    }

    if (method_type == "POST") {
        if (id == null) {

            if (action == "upload") {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    body: formData,
                    method: method_type
                }
                ).then(res => res.json())
            }

            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(function (res) {
                return res.json();
            }
            )
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }),
                body: JSON.stringify(formData),
                method: method_type,
            }).then(function (res) {
                return res.json();
            }
            )
        }
    }

    if (method_type == "PUT") {
        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,

                }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(function (res) {
                return statuscodeControl(res, method_type, origin, port, controller, action, null, formData);
            }
            )
        }

        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,

                }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(function (res) {
                return statuscodeControl(res, method_type, origin, port, controller, action, null, formData);

            }
            )
        }

    }

    if (method_type == "DELETE") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,

                }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(function (res) {
                return statuscodeControl(res, method_type, origin, port, controller, action, null, formData);
            }
            )
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,


                }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(function (res) {
                return statuscodeControl(res, method_type, origin, port, controller, action, null, formData);
            }
            )
        }

    }



}


