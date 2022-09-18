module.exports = {
  contenidosList: async (_, res) => {
    try {
      res.status(200).send({
        data: contenidosTerror.concat(contenidosSuspenso).concat(contenidosComedia)
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  carruselesList: async (_, res) => {
    try {
      res.status(200).send({
        data: [
          {id: 1, title: "Terror", contenidos: contenidosTerror},
          {id: 2, title: "Suspenso", contenidos: contenidosSuspenso},
          {id: 2, title: "Comedia", contenidos: contenidosComedia},
        ]
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

const contenidosTerror = [
  {"title": "El conjuro", description: "Descripción de ejemplo 1", year: 2013, duration: 6960, director: "James Wan", cast: "Vera Farmiga y Patrick Wilson", writer: "Chad Hayes", genres: "Terror", maturity_rating: "+16"},
  {"title": "La monja", description: "Descripción de ejemplo 2", year: 2018, duration: 5760, director: "Corin Hardy", cast: "Taissa Farmiga y Bonnie Aarons", writer: "Gary Dauberman", genres: "Terror", maturity_rating: "+18"}
];
const contenidosSuspenso = [
  {"title": "El colleccionista de huesos", description: "Descripción de ejemplo 3", year: 2000, duration: 7080, director: "Phillip Noyce", cast: "Denzel Washington y Angelina Jolie", writer: "Jeffery Deaver", genres: "Suspenso", maturity_rating: "ATP"},
  {"title": "La sospecha", description: "Descripción de ejemplo 4", year: 2013, duration: 9180, director: "Denis Villeneuve", cast: "Jake Gyllenhaal y Huge Jackman", writer: "Aaron Guzikowski", genres: "Suspenso", maturity_rating: "ATP"}
];
const contenidosComedia = [
  {"title": "Pinneaple Express", description: "Descripción de ejemplo 5", year: 2008, duration: 7020, director: "David Gordon Green", cast: "Set Rogen y James Franco", writer: "Set Rogen", genres: "Comedia", maturity_rating: "ATP"},
  {"title": "Mentiroso mentiroso", description: "Descripción de ejemplo 6", year: 1997, duration: 5220, director: "Tom Shadyac", cast: "Jim Carrey y Jennifer Tilly", writer: "Stephen Mazur", genres: "Comedia", maturity_rating: "ATP"}
];
