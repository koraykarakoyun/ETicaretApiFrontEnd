import { notify } from "./Notify";

export const api = (method_type = null, origin = "localhost", port = "7098", controller, action, id = null, formData = null) => {

    if (method_type == "GET") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            })
                .then(response => response.json())
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            }).then(response => response.json())
        }

    }

    if (method_type == "POST") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(response => response.json())
                .then((response) => {
                    if (response.status == 400) {
                        if (response.errors.Name != null) {
                            notify(response.errors.Name[0]);
                        }
                        else if (response.errors.Price != null) {
                            notify(response.errors.Price[0]);
                        }
                        else if (response.errors.Stock != null) {
                            notify(response.errors.Stock[0]);
                        }
                    }
                });


        }

    }

    if (method_type == "PUT") {
        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
                body: JSON.stringify(formData)
            }).then(response => response.json())
        }

    }

    if (method_type == "DELETE") {
        if (id == null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,

            }).then(response => response.json());
        }

        if (id != null) {
            return fetch(`https://${origin}:${port}/api/${controller}/${action}/${id}`, {
                headers: new Headers({ 'content-type': 'application/json' }),
                method: method_type,
            }).then(response => response.json());
        }

    }



}