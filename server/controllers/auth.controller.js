module.exports = {
  login: async (req, res) => {
    try {
      const ignoreSSO = process.env.USE_SSO.toLowerCase() === 'false';
      const { email, password } = req.body;
      const {CMS_DEV_ADMIN_USER, CMS_DEV_ADMIN_PASSWORD} = process.env;
      if(ignoreSSO) {
        if(email !== CMS_DEV_ADMIN_USER || password !== CMS_DEV_ADMIN_PASSWORD) {
          res.status(401).send({message: 'Incorrect credentials'});
          return;
        }
        res.status(200).send({token: `${CMS_DEV_ADMIN_USER}`});
      } else {
        // Use SSO Login here
        throw new Error("Not implemented");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  logout: async (req, res) => {
    try {
      const ignoreSSO = process.env.USE_SSO.toLowerCase() === 'false';
      if(ignoreSSO) {
        res.status(200).send({message: 'Logout ok.'});
      } else {
        // Use SSO Login here
        throw new Error("Not implemented");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
