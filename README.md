# UADE - Integración de Aplicaciones - CMS

This repo is part of a distributed system that was made as a part of an university subject project.

The main idea is to build a streaming service platform. This repo is the microservice which takes care of the content in the platform. It's the content management system.

An admin user is needed to enter the app 🪪

![cms-1-preview](https://user-images.githubusercontent.com/11776905/196658699-f0c6dce7-fa25-4584-bfd8-d57e461b60b9.gif)

Then we can create content (movies) in the platform 🎥

![cms-2-preview](https://user-images.githubusercontent.com/11776905/196658806-907aeb05-730d-49df-80b7-b46a8a0bb97c.gif)

In this project, the contents were organized in carousels (the same as other streaming platform services). So, the first step is to create a carousel, and then add movies to that carousel 👇

![cms-3-preview](https://user-images.githubusercontent.com/11776905/196658978-28c7594b-794d-4ee8-9785-20936f6165d7.gif)

Everything is settled now. The other microservices (frontend, and back office) can consume the API that this CMS exposes 👌

## Development

To run the server first install dependencies and then start it:

```sh
npm install
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
npm run build
npm start
```
