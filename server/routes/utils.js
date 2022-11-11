const jwt = require('jsonwebtoken');
const {
	CMS_DEV_ADMIN_USER,
  SSO_JWT_PUBLIC_KEY,
  USE_SSO,
} = process.env;

const SSO_TENANT_STRING = 'Cms';
const SSO_ADMIN_STRING = 'true';

function useSSO() {
	return /^true/i.test(USE_SSO);
}

function getAuthorizationToken(req) {
	return req.headers.authorization?.split(' ')[1];
}

function isCMSAdmin(decryptedToken) {
	return decryptedToken.admin === SSO_ADMIN_STRING
		&& decryptedToken.tenant === SSO_TENANT_STRING;
}

function verifyAuth(req, res, next) {
	const token = getAuthorizationToken(req)
	try {
		// SSO mode
		if(useSSO()) {
			const decryptedToken = jwt.verify(token, SSO_JWT_PUBLIC_KEY);
			if(!isCMSAdmin(decryptedToken)) return new Error("Not a CMS Admin user");
			req.decryptedUser = decryptedToken;
			next();
			return;
		}
		// Development without SSO
		else {
			if(token === CMS_DEV_ADMIN_USER) {
				req.decryptedUser = {
					nombre: 'Admin',
					email: 'admin@uadeflix.com',
					tenant: 'Cms',
					admin: 'true',
				};
				next();
				return;
			}
			throw new Error("Invalid development token");
		}
	} catch (error) {
		if(error instanceof jwt.TokenExpiredError) {
			res.status(401).send({message: "La sesión expiró. Vuelva a iniciar sesión."});
		}
		else {
			res.status(401).send({message: error.message});
		}
	}
}

module.exports = {
  verifyAuth,
	SSO_TENANT_STRING,
	SSO_ADMIN_STRING,
};
