# UADE - Integración de Aplicaciones - CMS

This repo is part of a distributed system that was made as a part of an university asignature project.

The main idea is to build a streaming service platform. This repo is the microservice which takes care of the content in the platform. It's the content management system.

An admin user is needed to enter the app 🪪

![uadeflix-1](https://user-images.githubusercontent.com/11776905/201707921-0fd78eef-1582-4d33-89a3-ec09f7735cc8.gif)

Then we can create content (movies) in the platform 🎥

![uadeflix-2](https://user-images.githubusercontent.com/11776905/199602621-36b2084e-ccd4-46a8-9448-460d2f4aad71.gif)

In this project, the contents were organized in carousels (the same as other streaming platform services). So, the first step is to create a carousel, and then add movies to that carousel 👇

![uadeflix-3](https://user-images.githubusercontent.com/11776905/201707939-3cd51fa3-1c1a-4e8f-aa6a-da404774ecf4.gif)

Everything is settled now. The other microservices (frontend, and back office) can consume the API that this CMS exposes 👌

## I just want to see the app

If you just want to see this app deployed with example data, this is the easiest way:

```
docker-compose up
```

If this is the first time running the app, in another terminal populate the database with:
```
docker-compose exec web /bin/sh -c "npx prisma db seed"
```

Now you can log in with the example default credentials:

* `admin`
* `uade2022`
## Development

First, you need a running DB, and set the `.env` variable `DATABASE_URL` to connect to it.

In `.env.sample` everything is configured to run a development environment with a postgres DB with
user `postgres`, password `postgres`, in `localhost:5432` and database name `cms`. Just copy that file and rename it to `.env` so the app can start. Of course, you can change this.

Once you have a running DB, start the backend with:

```sh
npm install
npm run migrate-dev
npm run dev
```

Then run the frontend:

```
# From the root folder
npm run frontend
```

That's all. Now you have the backend and the frontend running.
## Production

You can run it with:

```sh
npm install
npm run build
npm run deploy
```
