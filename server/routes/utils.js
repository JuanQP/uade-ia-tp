function useSSO(process) {
	return /^true/i.test(process.env.USE_SSO);
}

function getAuthorizationToken(req) {
	return req.headers.authorization?.split(' ')[1];
}

function verifyAuth(req, res, next) {
	const { CMS_DEV_ADMIN_USER } = process.env;
	try {
		// SSO mode
		if(useSSO(process)) {
			throw new Error("Not implemented yet");
		}
		// Development without SSO
		else {
			if(getAuthorizationToken(req) === CMS_DEV_ADMIN_USER) {
				next();
				return;
			}
			throw new Error("Invalid development token");
		}
	} catch (error) {
		res.status(401).send({message: error.message});
	}
}

module.exports = {
  verifyAuth,
};
