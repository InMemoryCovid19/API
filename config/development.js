const lenv = require('./localenv')
module.exports = {
	env: process.env.NODE_ENV || 'development',
	mongoURL: process.env.MONGOLAB_URL || 'mongodb://',
	port: process.env.PORT || 3000,
	secureMode: process.env.SECURE_MODE || false,
	trustProxy: process.env.TRUST_PROXY || 'no',
    enforceSSL: process.env.ENFORCE_SSL || 'no',
    frontendCacheExpiry: process.env.FRONTEND_CACHE_EXPIRY || '90',
    gitOAuthToken: process.env.GIT_OAUTH_TOKEN || '',
    letsencryptSSLVerificationBody: process.env.LETSENCRYPT_VERIFICATION_BODY || 'xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8._v6aFbaRYWeOmSebtlD-X4Ixf5tPsyULMsXM8HjsK-Q',
    letsencryptSSLVerificationURL: process.env.LETSENCRYPT_VERIFICATION_URL || '/.well-known/acme-challenge/xvArhQBSilF4V30dGUagNAZ96ASipB0b0ex0kXn0za8',
    logMongoURL: process.env.LOG_MONGOLAB_URL || 'mongodb://',
    maxContentLength: process.env.MAX_CONTENT_LENGTH || '9999',
    noFrontendCaching: process.env.NO_CACHE || 'yes',
    rateLimit: process.env.RATE_LIMIT || '1800',
    rateLimitExpiry: process.env.RATE_LIMIT_EXPIRY || '3600000',
    webhookSecret: process.env.SECRET_TOKEN || '',
    github_token: process.env.GITHUB_TOKEN || lenv.GITHUB_TOKEN
};