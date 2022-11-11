# UADE - Integración de Aplicaciones - CMS

This repo is part of a distributed system that was made as a part of an university asignature project.

The main idea is to build a streaming service platform. This repo is the microservice which takes care of the content in the platform. It's the content management system.

An admin user is needed to enter the app 🪪

![uadeflix-1](https://user-images.githubusercontent.com/11776905/199602581-ed54ff6b-3275-406c-9b41-ef3c05003817.gif)

Then we can create content (movies) in the platform 🎥

![uadeflix-2](https://user-images.githubusercontent.com/11776905/199602621-36b2084e-ccd4-46a8-9448-460d2f4aad71.gif)

In this project, the contents were organized in carousels (the same as other streaming platform services). So, the first step is to create a carousel, and then add movies to that carousel 👇

![uadeflix-3](https://user-images.githubusercontent.com/11776905/199602631-0b4decc3-997c-46d7-bf4e-87c937b30401.gif)

Everything is settled now. The other microservices (frontend, and back office) can consume the API that this CMS exposes 👌

## Development

To run the server first install dependencies, create database, and then start it:

```sh
npm install
npm run migrate-dev
npm start
```

To run the frontend, change directory to `/client` and run:

```sh
cd client
npm install
```

Now you can run it in two different ways:

```
npm run dev # From the /client folder
npm run frontend # From the root folder
```

## Production

To deploy, just install dependencies, build the app, and run only the server. The server will serve the compiled app directly because all the necessary files are in `/client/dist`.

```sh
npm install
npm run migrate-deploy
npm run build
npm start
```
