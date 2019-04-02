var config = null;

if (process && process.env && process.env.NODE_ENV) {
	config = require(`./${process.env.NODE_ENV}`)
} else {
	config = require('./development')
}

export default config;
