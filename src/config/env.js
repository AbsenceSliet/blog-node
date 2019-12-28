let baseUrl = '';
let routerMode = 'hash';
if (process.env.NODE_ENV == 'development') {
    baseUrl = '';
} else {
    baseUrl = '';
}
const RELEASE_VERSION = "blog@1.0.1";
process.env.RELEASE_VERSION = RELEASE_VERSION;

export {
    baseUrl,
    routerMode,
    RELEASE_VERSION
}