# Radio en vivo (web para iPhone 7)

Web simple y accesible para escuchar radios en vivo desde Safari en un iPhone 7 (o cualquier celular).
Sin frameworks, sin instalación: es HTML, CSS y JavaScript.

## Cómo usarla en el iPhone

1. Publicá la carpeta en Internet con HTTPS (ver más abajo), o abrila desde una PC en la misma Wi-Fi.
2. En Safari del iPhone, entrá a la dirección.
3. Tocá una radio de la lista y luego "Reproducir".
   - Safari no permite reproducir audio sin un toque del usuario, por eso hay que tocar "Reproducir".

### Agregar a la pantalla de inicio (recomendado)

Para que se vea como una app:

1. Abrí la web en Safari.
2. Tocá el botón "Compartir" (cuadrado con flecha).
3. Elegí "Agregar a pantalla de inicio".

## Cómo cambiar o agregar radios

Editá el archivo `radios.js`. Cada radio es un objeto con estos campos:

    { id: 'identificador', name: 'Nombre', description: 'Texto chico (opcional)', url: 'https://...' }

Para agregar una radio, copiá una línea y cambiala. Para quitar, borrá la línea (dejando las comas bien).

### IMPORTANTE: HTTPS vs HTTP

Si publicás la web en Internet (GitHub Pages, Netlify, Vercel, etc.) la página queda en HTTPS.
En ese caso los streams deben ser HTTPS: si una radio usa `http://`, Safari la bloquea y no suena.

- Probá siempre la URL en Safari antes de dejarla.
- Muchas radios argentinas transmiten en HTTP. Opciones:
  1. Buscar si la radio ofrece stream en HTTPS.
  2. Servir la web por HTTP en la misma red local (ver abajo).

### Usar en la red local (sin HTTPS)

Si preferís usar streams HTTP, serví la carpeta desde una PC en la misma Wi-Fi y entrá con la IP local:

    python3 -m http.server 8080

Luego en el iPhone: http://IP-DE-LA-PC:8080

Esto permite streams HTTP, pero solo funciona dentro de tu casa/red.

## Recomendaciones de diseño (persona mayor)

- Texto grande y botones grandes para tocar sin equivocarse.
- Alto contraste (fondo claro, texto oscuro).
- El volumen se controla con los botones físicos del teléfono.

## Problemas comunes

- "No se pudo reproducir": la URL del stream puede estar caída o ser HTTP bloqueado por HTTPS. Probá otra radio.
- La radio se corta: conexión a Internet inestable. Usá Wi-Fi.
- No suena al abrir: tocá "Reproducir". Safari exige interacción del usuario.
- El control de volumen en pantalla no funciona en iPhone: es normal, iOS maneja el volumen con los botones físicos.
