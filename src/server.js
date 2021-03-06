const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const compress = require('compression');

exports.initialize = ({ env = 'dev', publicPath }) => {
	const app = express();

	app.use(compress());

	app.use(logger(env));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	// TODO: replace with config property
	// 1 day
	app.use(express.static(publicPath, { maxAge: 86400000 }));

	return {
		useRoutes: routesConfig => {
			routesConfig.forEach(route => {
				// TODO: it's too messy and not obvious => change it
				if (route.auth) {
					app[route.method](route.endpoint, route.auth, route.action);
				}

				app[route.method](route.endpoint, route.action);
			});

			app.use((err, req, res) => {
				console.error(err.stack);
				// TODO: replace with responder
				res.status(500).send({ message: err.message });
			});
		},

		start: (port = 3000) => app.listen(port, () =>
			console.log(`Express server listening on port ${port}`)),
	};
};
