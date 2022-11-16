import { Request, Response } from "express";

export async function contenidosList (_: Request, res: Response) {
  try {
    res.status(200).send({
      results: contenidosTerror.concat(contenidosSuspenso).concat(contenidosComedia)
    });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function contenidoGet (_: Request, res: Response) {
  try {
    res.status(200).send(contenidoIndividual);
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function carruselesList (_: Request, res: Response) {
  try {
    res.status(200).send({
      results: [
        { id: 1, title: "Terror", contenidos: contenidosTerror },
        { id: 2, title: "Suspenso", contenidos: contenidosSuspenso },
        { id: 3, title: "Comedia", contenidos: contenidosComedia },
      ]
    });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function carruselesGet (_: Request, res: Response) {
  try {
    res.status(200).send({ id: 1, title: "Terror", contenidos: contenidosTerror });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

const contenidoIndividual = {
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
  maturityRatingId: 1,
  maturityRating:
  {
    id: 1,
    description: "NC-17 - Adults Only"
  },
  urlImage: "https://i.ibb.co/HH0W4t7/la-monja-horizontal.png",
  verticalUrlImage: "https://i.ibb.co/xGnG5y2/la-monja-vertical.png",
  urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
};

const contenidosTerror = [
  {
    id: 1,
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
    maturityRatingId: 1,
    maturityRating:
    {
      id: 1,
      description: "R - Restricted"
    },
    urlImage: "https://i.ibb.co/brDkXPM/el-conjuro-horizontal.png",
    verticalUrlImage: "https://i.ibb.co/kM3CqnZ/el-conjuro-vertical.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  contenidoIndividual,
];

const contenidosSuspenso = [
  {
    id: 3,
    title: "Asesino sin memoria",
    description: "Alex, un sicario, se convierte en el objetivo de su organización por negarse a cumplir un trabajo. Mientras huye de ellos, el FBI y el servicio de inteligencia mexicano siguen sus pasos, alertados por el reguero de cadáveres que deja por donde va.",
    year: 2022,
    duration: 60,
    director: "Martin Campbell",
    cast: "Juan Cruz",
    writer: "Martin Campbell",
    genres:
      [
        {
          id: 2,
          description: "Suspenso"
        }
      ],
    maturityRatingId: 1,
    maturityRating:
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.ibb.co/gTwK2Wg/asesino-sin-memoria-horizontal.png",
    verticalUrlImage: "https://i.ibb.co/7V3tRrk/asesino-sin-memoria-vertical.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 4,
    title: "Argentina, 1985",
    description: "Durante la década de 1980, un grupo de abogados investiga y lleva a juicio a los responsables de la dictadura cívico-militar argentina.",
    year: 2022,
    duration: 60,
    director: "Santiago Mitre",
    cast: "Ricardo Darin y Pedro Lanzani",
    writer: "Santiago Mitre",
    genres:
      [
        {
          id: 2,
          description: "Suspenso"
        }
      ],
    maturityRatingId: 1,
    maturityRating:
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.ibb.co/BcS6xj5/Argentina-1985.png",
    verticalUrlImage: "https://i.ibb.co/VQxTPfj/argentina-1985-vertical.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  }
];
const contenidosComedia = [
  {
    id: 5,
    title: "Happy Gilmore",
    description: "Todo lo que Happy Gilmore (Adam Sandler) siempre ha querido es ser un jugador de hockey profesional. Pero pronto descubre que en realidad puede tener talento para jugar un deporte completamente diferente: el golf. Cuando su abuela (Frances Bay) se entera de que está a punto de perder su casa, Happy se une a un torneo de golf para tratar de ganar suficiente dinero para comprársela. Con sus poderosas habilidades de conducción y su actitud malhablada, Happy se convierte en un improbable héroe del golf, para gran disgusto de los educados profesionales del golf.",
    year: 1996,
    duration: 93,
    director: "Robert Simonds",
    cast: "Adam Sandler, Richard Kiel, Julie Bowen",
    writer: "Tim Herlihy",
    genres:
      [
        {
          id: 3,
          description: "Comedia"
        }
      ],
    maturityRatingId: 1,
    maturityRating:
    {
      id: 1,
      description: "G - General Audiences"
    },
    urlImage: "https://i.ibb.co/xMbRSRV/happy-gilmore-60b312494b3e8.png",
    verticalUrlImage: "https://i.ibb.co/MZzFqTp/565620-Product-0-I.png",
    urlVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
];
