import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const {
	CMS_DEV_ADMIN_USER,
	SSO_JWT_PUBLIC_KEY,
	USE_SSO,
} = process.env;
export const SSO_TENANT_STRING = 'Cms';
export const SSO_ADMIN_STRING = 'true';

function useSSO() {
	if (!USE_SSO) throw new Error("There is no USE_SSO field in .env file")
	return /^true/i.test(USE_SSO)
}

function getAuthorizationToken(req: Request) {
	if (!req.headers.authorization) throw new Error("No Authorization header provided")
	return req.headers.authorization?.split(' ')[1];
}

function isCMSAdmin(decryptedToken: jwt.JwtPayload) {
	return decryptedToken.admin === SSO_ADMIN_STRING
		&& decryptedToken.tenant === SSO_TENANT_STRING;
}

export function verifyAuth(req: Request, res: Response, next: NextFunction) {
	try {
		// SSO mode
		const token = getAuthorizationToken(req)
		if (useSSO()) {
			if (!SSO_JWT_PUBLIC_KEY)
				throw new Error("No JWT public key provided")
			const decryptedToken = jwt.verify(token, SSO_JWT_PUBLIC_KEY)
			if (!(typeof decryptedToken !== "string"))
				throw new Error("Error in token verification")
			if (!isCMSAdmin(decryptedToken))
				throw new Error("Not a CMS Admin user");

			req.decryptedUser = decryptedToken;
			next();
		}
		// Development without SSO
		else {
			if (token !== CMS_DEV_ADMIN_USER)
				throw new Error("Invalid development token")
			req.decryptedUser = {
				nombre: 'Admin',
				email: 'admin@uadeflix.com',
				tenant: 'Cms',
				admin: 'true',
			};
			next();
		}
	} catch (error: any) {
		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).send({ message: "La sesión expiró. Vuelva a iniciar sesión." });
		}
		else {
			res.status(401).send({ message: error.message });
		}
	}
}
