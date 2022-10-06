const jwt = require('jsonwebtoken');
const {
	CMS_DEV_ADMIN_USER,
  SSO_JWT_PUBLIC_KEY,
  USE_SSO,
} = process.env;

function useSSO() {
	return /^true/i.test(USE_SSO);
}

function getAuthorizationToken(req) {
	return req.headers.authorization?.split(' ')[1];
}

function verifyAuth(req, res, next) {
	const token = getAuthorizationToken(req)
	try {
		// SSO mode
		if(useSSO()) {
			jwt.verify(token, SSO_JWT_PUBLIC_KEY);
			next();
			return;
		}
		// Development without SSO
		else {
			if(token === CMS_DEV_ADMIN_USER) {
				next();
				return;
			}
			throw new Error("Invalid development token");
		}
	} catch (error) {
		if(error instanceof jwt.TokenExpiredError) {
			res.status(401).send({message: "El token expiró. Vuelva a iniciar sesión."});
		}
		else {
			res.status(401).send({message: error.message});
		}
	}
}

module.exports = {
  verifyAuth,
};
