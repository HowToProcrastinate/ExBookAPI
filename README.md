# ExBookAPI
API Para el proyecto ExBook

## Enlace al proyecto hosteado en Heroku
[Heroku Rama master](https://ex-book-api.herokuapp.com/)

## Estructura de la información

```
user {
    name,
    email,
    password,
    notes {
        title,
        body
    }
}
```
---
## Rutas
- `/register` :
    - `POST`: Crear un usuario
- `/login` :
    - `GET`: Devuelve el token para la autenticación

## Estas rutas necesitan el token de autenticación
Para enviar el toquen a las siguientes rutas se edebe agregar el header `Authorization` y su valor debe ser `bearer TOKEN`, donde `TOKEN` es el obtenido en la ruta `/login`.

- `/profile`:
    - `GET`: Devuelve el `name, email`
    - `PATCH`: Recibe `name, email, password` y actualiza al usuario

- `/notes`:
    - `GET`: Devuelve todas las notas del usuario autenticado
    - `POST`: Recibe `title, body`, crea una nota y se la añade al usuario autenticado
- `/notes/:id`:
    - `GET`: Devuelve `title, body` de la nota requerida por su `:id`
    - `PATCH`: Recibe `title, body` y actualiza la nota
    - `DELETE`: Elimina la nota a la que pertenece el `:id`