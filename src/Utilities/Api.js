

export const api = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null, formData = null, token = null) => {

    if (token != null) {
        if (method_type == "GET") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }),
                    method: method_type,

                }
                )
                    .then(response => response.json())

            }

            if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }),
                    method: method_type,
                }).then(response => response.json())
            }

        }

        if (method_type == "POST") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json())



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
                }).then(response => response.json())
            }

            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json())
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
                }).then(response => response.json());
            }

            if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': 'Bearer ' + token,

                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json());
            }

        }
    }


    else {
        if (method_type == "GET") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json',
                    }),
                    method: method_type

                }
                )
                    .then(response => response.json())

            }

            if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,
                }).then(response => response.json())
            }

        }

        if (method_type == "POST") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json())



            }

        }

        if (method_type == "PUT") {
            if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json())
            }

            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,
                    body: JSON.stringify(formData)
                }).then(response => response.json())
            }

        }

        if (method_type == "DELETE") {
            if (id == null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,

                }).then(response => response.json());
            }

            if (id != null) {
                return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                    method: method_type,
                }).then(response => response.json());
            }

        }
    }






}