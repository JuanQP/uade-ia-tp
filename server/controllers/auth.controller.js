const axios = require('axios');
const jwt = require('jsonwebtoken');
const SSO_CMS_TENANT = 'Cms';
const DOMAIN = 'uade.edu.ar';
const {
  CMS_DEV_ADMIN_USER,
  CMS_DEV_ADMIN_PASSWORD,
  SSO_AUTH_BASEURL,
  SSO_JWT_PUBLIC_KEY,
  USE_SSO,
} = process.env;

module.exports = {
  login: async (req, res) => {
    try {
      const ignoreSSO = USE_SSO.toLowerCase() === 'false';
      const { email, password } = req.body;
      if(ignoreSSO) {
        if(email !== CMS_DEV_ADMIN_USER || password !== CMS_DEV_ADMIN_PASSWORD) {
          res.status(401).send({message: 'Incorrect credentials'});
          return;
        }
        res.status(200).send({token: `${CMS_DEV_ADMIN_USER}`});
      } else {
        // SSO URL login
        const response = await axios.post(`${SSO_AUTH_BASEURL}/login`, {
          email: `${email}@${DOMAIN}`,
          password,
          tenant: SSO_CMS_TENANT,
        });
        // Check if token signature is valid here:
        const decrypted = jwt.verify(response.data.token, SSO_JWT_PUBLIC_KEY);
        console.log(`Usuario ${decrypted.email} logeado`)
        res.status(200).send({
          ...decrypted,
          token: response.data.token,
        });
      }
    } catch (error) {
      console.log(error.response);
      if(error.response?.status === 403) {
        res.status(403).send({
          message: error.response.data.error
        });
      } else {
        res.status(400).send(error);
      }
    }
  },

  logout: async (req, res) => {
    try {
      const ignoreSSO = process.env.USE_SSO.toLowerCase() === 'false';
      if(ignoreSSO) {
        res.status(200).send({message: 'Logout ok.'});
      } else {
        // Use SSO Login here
        res.status(200).send({message: 'Logout ok.'});
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
