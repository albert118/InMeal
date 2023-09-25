const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENVIRONMENTS = ['dev', 'prod'];

module.exports = args => {
	const { env } = args;

	if (!ENVIRONMENTS.includes(env)) {
		console.error(`${env} is an invalid environment (use one of ${ENVIRONMENTS})`);
		return null;
	}

	const envConfig = require(`./webpack.${env}.js`);
	const config = merge(commonConfig, envConfig);
	return config;
};
