const axios = require('axios');
const jwt = require('jsonwebtoken');
const { SSO_TENANT_STRING, SSO_ADMIN_STRING } = require('../routes/utils');
const DOMAIN = 'uadeflix.com';
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(email !== CMS_DEV_ADMIN_USER || password !== CMS_DEV_ADMIN_PASSWORD) {
          res.status(401).send({message: 'Incorrect credentials', errors: []});
          return;
        }
        res.status(200).send({
          nombre: "Admin",
          email: `admin@${DOMAIN}`,
          tenant: SSO_TENANT_STRING,
          token: `${CMS_DEV_ADMIN_USER}`,
        });
      } else {
        // SSO URL login
        const response = await axios.post(`${SSO_AUTH_BASEURL}/login`, {
          email: `${email}@${DOMAIN}`,
          password,
          tenant: SSO_TENANT_STRING,
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
      if(error.response?.status === 403) {
        res.status(403).send({
          message: error.response.data.error
        });
      } else {
        res.status(400).send({
          message: error.response?.data?.error,
          errors: error.response?.data?.errors ?? [],
        });
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
      res.status(400).send({message: error.message});
    }
  },

  register: async (req, res) => {
    const {
      nombre,
      apellido,
      email,
      password,
    } = req.body;
    try {
      const ignoreSSO = process.env.USE_SSO.toLowerCase() === 'false';
      if(ignoreSSO) {
        res.status(200).send({message: 'Register ok.'});
      } else {
        await axios.post(`${SSO_AUTH_BASEURL}/register`, {
          nombre,
          apellido,
          email,
          password,
          telefono: '',
          tenant: SSO_TENANT_STRING,
          admin: SSO_ADMIN_STRING,
        });
        console.log(`Usuario ${email} creado`);
        res.status(201).send({
          message: 'Usuario creado.',
        });
      }
    } catch (error) {
      res.status(400).send({
        errors: error.response?.data?.errors ?? [],
      });
    }
  },

  verify: async (_, res) => {
    res.status(200).send({ message: 'Ok' });
  },
};
