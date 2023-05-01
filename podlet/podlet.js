const {startPodService} = require("@fintlabs/fint-podium-react-podlet");
const packageJson = require("./package.json");
const PODLET_NAME = process.env.PODLET_NAME || packageJson.name;

startPodService(PODLET_NAME, `${__dirname}/asset-manifest.json`);