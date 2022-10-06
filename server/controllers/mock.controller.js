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
  {"title": "El conjuro", description: "Descripción de ejemplo 1", year: 2013, duration: 116, director: "James Wan", cast: "Vera Farmiga y Patrick Wilson", writer: "Chad Hayes", genres: [{id: 1, description: "Terror"}], MaturityRating: {id: 1, description: "R - Restricted"}},
  {"title": "La monja", description: "Descripción de ejemplo 2", year: 2018, duration: 96, director: "Corin Hardy", cast: "Taissa Farmiga y Bonnie Aarons", writer: "Gary Dauberman", genres: [{id: 1, description: "Terror"}], MaturityRating: {id: 1, description: "NC-17 - Adults Only"}}
];
const contenidosSuspenso = [
  {"title": "El colleccionista de huesos", description: "Descripción de ejemplo 3", year: 2000, duration: 7080, director: "Phillip Noyce", cast: "Denzel Washington y Angelina Jolie", writer: "Jeffery Deaver", genres: [{id: 2, description: "Suspenso"}], MaturityRating: {id: 1, description: "G - General Audiences"}},
  {"title": "La sospecha", description: "Descripción de ejemplo 4", year: 2013, duration: 9180, director: "Denis Villeneuve", cast: "Jake Gyllenhaal y Huge Jackman", writer: "Aaron Guzikowski", genres: [{id: 2, description: "Suspenso"}], MaturityRating: {id: 1, description: "G - General Audiences"}}
];
const contenidosComedia = [
  {"title": "Pinneaple Express", description: "Descripción de ejemplo 5", year: 2008, duration: 7020, director: "David Gordon Green", cast: "Set Rogen y James Franco", writer: "Set Rogen", genres: [{id: 3, description: "Comedia"}], MaturityRating: {id: 1, description: "G - General Audiences"}},
  {"title": "Mentiroso mentiroso", description: "Descripción de ejemplo 6", year: 1997, duration: 5220, director: "Tom Shadyac", cast: "Jim Carrey y Jennifer Tilly", writer: "Stephen Mazur", genres: [{id: 3, description: "Comedia"}], MaturityRating: {id: 1, description: "G - General Audiences"}}
];
