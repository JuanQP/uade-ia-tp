# UADE - Integración de Aplicaciones - CMS

## Entorno de desarrollo

Para correr el servidor tenemos que instalar primero las dependencias del servidor, y ejecutarlo

```sh
npm install
npm start
```

Para el frontend, hay que entrar a la carpeta client y correr:

```sh
cd client
npm install
npm run dev
```

## Producción

En el caso de que queramos deployear la app, instalamos las dependencias, compilamos, y corremos el servidor únicamente, ya que durante la compilación la aplicación de React crea todos los archivos necesarios para ser servidos por el servidor de Node en la carpeta `/client/dist`

```sh
npm install
npm run build
npm start
```
