module.exports = {
  contenidosList: async (_, res) => {
    try {
      res.status(200).send({
        contenidos: contenidosTerror.concat(contenidosSuspenso).concat(contenidosComedia)
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  carruselesList: async (_, res) => {
    try {
      res.status(200).send({
        carruseles: [
          {id: 1, title: "Terror", contenidos: contenidosTerror},
          {id: 2, title: "Suspenso", contenidos: contenidosSuspenso},
          {id: 3, title: "Comedia", contenidos: contenidosComedia},
        ]
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

const contenidosTerror = [
  {
    title: "El conjuro",
    description: "Descripción de ejemplo 1",
    year: 2013,
    duration: 116,
    director: "James Wan",
    cast: "Vera Farmiga y Patrick Wilson",
    writer: "Chad Hayes",
    genres: [
      {
        id: 1, 
        description: "Terror"
      }
    ], 
    MaturityRating: 
    {
      id: 1, 
      description: "R - Restricted"
    }, 
    urlImage: "https://i.pinimg.com/550x/7c/35/df/7c35dfe2a932a5dd558ade30986a28ff.jpg", 
    urlVideo:"https://www.youtube.com/watch?v=_zU1gLWGnpg&ab_channel=WarnerBros.PicturesLatinoam%C3%A9rica"
  },
  {
    title: "La monja",
    description: "Descripción de ejemplo 2",
    year: 2018,
    duration: 96,
    director: "Corin Hardy",
    cast: "Taissa Farmiga y Bonnie Aarons",
    writer: "Gary Dauberman",
    genres: [
      {
        id: 1,
        description: "Terror"
      }
    ], 
    MaturityRating: 
    {
      id: 1,
      description: "NC-17 - Adults Only"
    }, 
    urlImage: "https://i.pinimg.com/236x/ce/3d/68/ce3d6811da999a716a4f76ed795fa832.jpg",
    urlVideo:"https://www.youtube.com/watch?v=eqVjGwYFVqQ&ab_channel=WarnerBros.PicturesLatinoam%C3%A9rica"
  }
];
const contenidosSuspenso = [
  {
    title: "El colleccionista de huesos",
    description: "Descripción de ejemplo 3",
    year: 2000,
    duration: 7080,
    director: "Phillip Noyce",
    cast: "Denzel Washington y Angelina Jolie",
    writer: "Jeffery Deaver",
    genres: 
    [
      {
        id: 2,
        description: "Suspenso"
      }
    ], 
    MaturityRating: 
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.pinimg.com/originals/72/7d/ec/727decb796307b9404ba2bb4b86cb4ed.jpg",
    urlVideo:"https://www.youtube.com/watch?v=uVTbS1wg_wQ&ab_channel=Arkham1888"
  },
  {
    title: "La sospecha",
    description: "Descripción de ejemplo 4",
    year: 2013,
    duration: 9180,
    director: "Denis Villeneuve",
    cast: "Jake Gyllenhaal y Huge Jackman",
    writer: "Aaron Guzikowski",
    genres: 
    [
      {
        id: 2,
        description: "Suspenso"
      }
    ],
    MaturityRating: 
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.pinimg.com/736x/c4/54/8f/c4548f1c58860c6ca97542a0614dc1b3.jpg",
    urlVideo:"https://www.youtube.com/watch?v=v35O1w575UI&ab_channel=AlfaFilmsArgentina"
  }
];
const contenidosComedia = [
  {
    title: "Pinneaple Express",
    description: "Descripción de ejemplo 5",
    year: 2008,
    duration: 7020,
    director: "David Gordon Green",
    cast: "Set Rogen y James Franco",
    writer: "Set Rogen",
    genres: 
    [
      {
        id: 3,
        description: "Comedia"
      }
    ],
    MaturityRating: 
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.pinimg.com/originals/18/66/47/186647e3d2c91b3438811b6f9f0f0636.jpg",
    urlVideo:"https://www.youtube.com/watch?v=UksH0NGHdns&ab_channel=SonyPicturesM%C3%A9xico"
  },
  {
    title: "Mentiroso mentiroso",
    description: "Descripción de ejemplo 6",
    year: 1997,
    duration: 5220,
    director: "Tom Shadyac",
    cast: "Jim Carrey y Jennifer Tilly",
    writer: "Stephen Mazur",
    genres: 
    [
      {
        id: 3, description: "Comedia"
      }
    ],
    MaturityRating: 
    {
      id: 1, description: "G - General Audiences"
    },
    urlImage: "https://i.pinimg.com/736x/a7/5d/8a/a75d8a605519d4e0e460c01a22e66518.jpg",
    urlVideo: "https://www.youtube.com/watch?v=cCXzjto5LtI&ab_channel=ElDespotricadorCin%C3%A9filo"
  }
];
