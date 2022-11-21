import axios from 'axios';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getAuthorizationToken, SSO_ADMIN_STRING, SSO_TENANT_STRING } from '../routes/utils';
const DOMAIN = 'uadeflix.com'
const {
  CMS_DEV_ADMIN_USER,
  CMS_DEV_ADMIN_PASSWORD,
  SSO_AUTH_BASEURL,
  SSO_JWT_PUBLIC_KEY,
  USE_SSO,
} = process.env;

interface SSOResponse {
  data: {
    token: string;
    expiresIn: string;
  }
}

interface User {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  tenant: "Cms";
  admin: "true" | "false";
}

function isUsingSSO() {
  return USE_SSO?.toLowerCase() === 'true'
}

export async function list (req: Request, res: Response) {
  try {
    const { email } = req.decryptedUser;
    const token = getAuthorizationToken(req);
    const response = await axios.get<User[]>(`${SSO_AUTH_BASEURL}/users`, {
      headers: { "Authorization": `Bearer ${token}` },
      data: { email, tenant: SSO_TENANT_STRING },
    });
    const users = response.data.map(u => ({
      email: u.email,
      nombre: u.nombre,
      apellido: u.apellido,
    }))
    res.status(200).send({
      results: users,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (isUsingSSO()) {
      // SSO URL login
      const response = await axios.post<any, SSOResponse>(`${SSO_AUTH_BASEURL}/login`, {
        email: `${email}@${DOMAIN}`,
        password,
        tenant: SSO_TENANT_STRING,
      });
      // Check if token signature is valid here:
      if (!SSO_JWT_PUBLIC_KEY)
        throw new Error("No JWT public key provided")
      const decrypted = jwt.verify(response.data.token, SSO_JWT_PUBLIC_KEY);
      if (typeof decrypted === "string")
        throw new Error("Error verifying token")
      console.log(`Usuario ${decrypted.email} logeado`)
      res.status(200).send({
        ...decrypted,
        token: response.data.token,
      });
    } else {
      // Fake login without SSO
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email !== CMS_DEV_ADMIN_USER || password !== CMS_DEV_ADMIN_PASSWORD) {
        res.status(401).send({ message: 'Incorrect credentials', errors: [] });
        return;
      }
      res.status(200).send({
        nombre: "Admin",
        email: `admin@${DOMAIN}`,
        tenant: SSO_TENANT_STRING,
        token: `${CMS_DEV_ADMIN_USER}`,
      });
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      res.status(403).send({
        message: error.response.data.error
      });
    } else {
      res.status(400).send({
        message: error.response?.data?.error ?? error.message,
        errors: error.response?.data?.errors ?? [],
      });
    }
  }
}

export async function logout(_req: Request, res: Response) {
  try {
    if (isUsingSSO()) {
      res.status(200).send({ message: 'Logout ok.' });
    } else {
      // Use SSO Login here
      res.status(200).send({ message: 'Logout ok.' });
    }
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function register(req: Request, res: Response) {
  const {
    nombre,
    apellido,
    email,
    password,
  } = req.body;
  try {
    if (isUsingSSO()) {
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
    } else {
      res.status(200).send({ message: 'Register ok.' });
    }
  } catch (error: any) {
    res.status(400).send({
      errors: error.response?.data?.errors ?? [],
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if(typeof email !== "string")
      throw new Error("Email was not provided or is invalid")
    if (isUsingSSO()) {
      const data = {
        email,
        tenant: SSO_TENANT_STRING,
      }
      const token = getAuthorizationToken(req)
      await axios.delete(`${SSO_AUTH_BASEURL}/deleteUser`, {
        headers: { "Authorization": `Bearer ${token}` },
        data,
      })
    }
    // If everything was ok, return code 200
    res.status(200).send({ message: 'User removed.' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function verify(req: Request, res: Response) {
  res.status(200).send({
    ...req.decryptedUser,
  });
}
