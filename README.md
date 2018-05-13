# ExBookAPI
API Para el proyecto ExBook

## Enlace al proyecto hosteado en Heroku
[Heroku Rama master](https://ex-book-api.herokuapp.com/)

## Datos de entrada / salida

```js
note {
    title,
    body
}
```
---
## Rutas

- `/notes` :
    - `POST`: Crear una nota
    - `GET`: Listado de todas las notas
- `/notes/:id` :
    - `GET`: Muestra la información de esa nota
    - `PATCH`: Actualiza una nota
    - `DELETE`: Elimina la nota
