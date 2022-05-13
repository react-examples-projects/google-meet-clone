# Google Meet Clone
[![Twitter: libardo\_r12](https://img.shields.io/twitter/follow/libardo\_r12.svg?style=social)](https://twitter.com/libardo\_r12)

Un clon de google meet con las funciones básicas como:

- Silenciar a otros participantes

- Silenciar tu micróifono

- Pausar tu transmisión

- Salir de la reunión



El proyecto fue desarrollado usando React y Express para el backend, no posee autenticación ni rutas privadas por lo tanto las interacciones son anónimas con nombres de usuario alteatorio o personalizados.



## Previsualización del proyecto

Puede visitar este proyecto en la siguiente url:





## Comandos para iniciar el proyecto

Primero debe instalar las dependecias de ambas partes el frontend y backend, para ello debe seguir los siguientes comandos.



Instalar dependencias del frontend.

```javascript
npm install
```



Instalar dependencias del backend.

```javascript
cd ./backend
npm install
```



Despues de haber instalado todas las dependencias debe iniciar el backend, pero antes debe de configurar las variables de entorno.

```javascript
API_PORT=5000
NODE_ENV=development
DEV=TRUE

TWILIO_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_API_SECRET=
TWILIO_AUTH_TOKEN=
```



Luego de haber configurado las variables de entorno ya es posible iniciar el servidor en modo desarrollo.

```javascript
npm run dev
```



Iniciar el frontend debe ejecutar el siguiente comando.

```javascript
npm start
```

Ya ambos proyectos deben de estar configurado, no olvide en establecer las variables de configuración en la parte del frontend para realizar las request de forma local.

```javascript
const API_URL = "http://localhost:5000"; // por defecto el port 5000

export const API_GET_TOKEN = (identity, room = "Meet Room") =>
  `${API_URL}/api/twilio/token?identity=${identity}&room=${room}`;


```



## Recursos usados para este proyecto

Ciertos recursos incluidos en este proyecto son de páginas públicas de imágenes.

- https://www.behance.net/

- https://storyset.com/

- https://icon-icons.com/



## Desarrollador

👤 **Libardo Rengifo**

* Website: https://portfolio-znareak.vercel.app/
* Github: [@znareak](https://github.com/znareak)

## Muestra tu apoyo

Otorgame una ⭐️ a este proyecto si te gusto!