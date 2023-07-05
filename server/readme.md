<p align="center">
  <img src="https://i.ibb.co/nzSRTxK/logo.png" width="240" alt="Telco Store Logo" />
</p>

# Telco Store

Aplicación web completamente funcional de un ecommerce de artículos de telecomunicaciones.

![demo](images/demo.gif) <br/>

---

## Características

Organización del proyecto en capas: **router, controller, service y database**.

### Fábrica abstracta

Toma el tercer argumento de la línea de comandos para crear DAOS de productos y carritos según la persistencia deseada. También se incorporó el patrón singletón en cada clase constructora para evitar que se creen múltiples instancias de los DAOS.

### Websockets

Chat de consultas en tiempo real con WebSockets.

### Normalizr

Mensajes del chat normalizados en el servidor y desnormalizados en el cliente para optimizar recursos.

### Logger

Muestra en consola los métodos de petición HTTP y sus rutas.<br/>
Guarda en archivos `.log` los errores y las rutas erróneas.

### Passport

Login implementado con passport local el cual almacena los datos en cookies con un ttl de 60 segundos. Los usuarios son almacenados y leídos de MongoDB.

### Nodemailer y Twilio

Envío de email y mensaje de WhatsApp al administrador con los datos de la compra realizada.<br/>
Envío de SMS al usuario registrado indicando que el pedido fue recibido.<br/>
Envío de email al administrador con los datos del nuevo usuario registrado.

### Faker

Tabla con productos generados al azar.

### Otros

Visualización de los datos del usuario loggeado mediante un modal en la navbar, filtro de productos, maquetado de la página en handlebars, estilos implementados con tailwind.

---

## Endpoints disponibles

| Endpoint                   | Descripción                       |
| -------------------------- | --------------------------------- |
| `/api/usuario/login`       | login del usuario                 |
| `/api/usuario/signup`      | registro del usuario              |
| `/api/productos`           | lista de productos y chat         |
| `/api/productos/:category` | filtro de productos por categoría |
| `/api/productos/test`      | tabla de productos al azar        |
| `/api/carrito/:username`   | carrito del usuario               |

---

## Correr el proyecto localmente:

1. Descargar el repositorio
2. Instalar las dependencias de npm con `npm install`
3. ejecutar `npm run mongo` o `npm run file` para utilizar como persistencia MongoDB o archivos .json respectivamente.

> El script `npm run file` no ejecuta nodemon ya que al guardar el archivo `.json` se renicia el servidor. <br/>
> El archivo `.env` fue pusheado a Github para simplificar el testeo del proyecto.

# Deploy

Deploy en **Railway**

https://entregafinal-production-1642.up.railway.app/api/usuario/login
