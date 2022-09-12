module.exports = {
  contenidosList: async (_, res) => {
    try {
      res.status(200).send({
        contenidos: [
          {id: 1, title: "Algún título"},
          {id: 2, title: "Otro título"},
        ]
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  landingPagesList: async (_, res) => {
    try {
      res.status(200).send({
        contenidos: [
          {id: 1, title: "Algún landing page"},
          {id: 2, title: "Otro landing page..."},
        ]
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
