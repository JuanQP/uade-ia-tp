const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const initialGenres = [
  { description: "Acción" },
  { description: "Aventura" },
  { description: "Comedia" },
  { description: "Fantasía" },
  { description: "Histórico" },
  { description: "Terror" },
  { description: "Romance" },
  { description: "Ciencia Ficción" },
];

const initialMaturityRatings = [
  { description: "G - General Audiences" },
  { description: "PG - Parental Guidance Suggested" },
  { description: "PG13 - Parents Strongly Cautioned" },
  { description: "R - Restricted" },
  { description: "NC-17 - Adults Only" },
];

const movies = [
  {
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    description: "El futuro de la civilización descansa en el destino del Anillo Único, que se ha perdido durante siglos. Fuerzas poderosas son implacables en su búsqueda. Pero el destino lo ha puesto en manos de un joven Hobbit llamado Frodo Baggins (Elijah Wood), quien hereda el Anillo y se convierte en leyenda. Una tarea desalentadora le espera a Frodo cuando se convierte en el Portador del Anillo: destruir el Anillo Único en los fuegos del Monte del Destino donde fue forjado.",
    year: 2001,
    duration: 178,
    director: "Peter Jackson",
    cast: "Viggo Mortensen, Elijah Wood",
    writer: "Peter Jackson",
    urlImage: "https://i.ibb.co/h8WyN6W/lotr1-horizontal.png",
    verticalUrlImage: "https://i.ibb.co/kmG8GWC/lotr1-vertical.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    maturityRatingId: 3,
    genres: {
      create: [
        { genre: { connect: { id: 2 } } },
        { genre: { connect: { id: 4 } } },
      ]
    },
  },
  {
    title: "El Señor de los Anillos: Las Dos Torres",
    description: "La secuela de \"El Señor de los Anillos: La Comunidad del Anillo\", nominada al Globo de Oro y ganadora del Premio AFI, \"Las Dos Torres\" sigue la búsqueda continua de Frodo (Elijah Wood) y la Comunidad para destruir el Anillo Único. . Frodo y Sam (Sean Astin) descubren que el misterioso Gollum los sigue. Aragorn (Viggo Mortensen), el arquero elfo Legolas y Gimli el enano se encuentran con el asediado reino de Rohan, cuyo otrora gran rey Theoden ha caído bajo el hechizo mortal de Saruman.",
    year: 2002,
    duration: 179,
    director: "Peter Jackson",
    cast: "Elijah Wood, Viggo Mortensen",
    writer: "Peter Jackson",
    urlImage: "https://i.ibb.co/RcbyXQW/twoposter.png",
    verticalUrlImage: "https://i.ibb.co/Xs1f4TY/lotr.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    maturityRatingId: 3,
    genres: {
      create: [
        { genre: { connect: { id: 2 } } },
        { genre: { connect: { id: 4 } } },
      ]
    },
  },
  {
    title: "El Señor de los Anillos: El Retorno del Rey",
    description: "La culminación de casi 10 años de trabajo y la conclusión de la épica trilogía de Peter Jackson basada en el atemporal J.R.R. El clásico de Tolkien, \"El Señor de los Anillos: El Retorno del Rey\" presenta el enfrentamiento final entre las fuerzas del bien y del mal que luchan por el control del futuro de la Tierra Media. Los hobbits Frodo y Sam llegan a Mordor en su búsqueda para destruir el \"anillo único\", mientras que Aragorn lidera las fuerzas del bien contra el malvado ejército de Sauron en la ciudad de piedra de Minas Tirith.",
    year: 2004,
    duration: 201,
    director: "Peter Jackson",
    cast: "Viggo Mortensen, Elijah Wood",
    writer: "Peter Jackson",
    urlImage: "https://wallpapercave.com/wp/wp4119586.jpg",
    verticalUrlImage: "https://i.ibb.co/BcbNfCN/lotr3-v.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    maturityRatingId: 3,
    genres: {
      create: [
        { genre: { connect: { id: 2 } } },
        { genre: { connect: { id: 4 } } },
      ]
    },
  }
]

const carousel = {
  title: "Tolkien movies",
  contents: {
    create: [
      { content: { connect: { id: 1 } }, order: 1 },
      { content: { connect: { id: 2 } }, order: 2 },
      { content: { connect: { id: 3 } }, order: 3 },
    ]
  }
}

async function main() {

  for (const genre of initialGenres) {
    await prisma.genre.create({
      data: genre,
    })
  }
  for (const maturityRating of initialMaturityRatings) {
    await prisma.maturityRating.create({
      data: maturityRating,
    })
  }
  for (const movie of movies) {
    await prisma.content.create({
      data: movie,
    })
  }

  await prisma.carousel.create({
    data: carousel,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
