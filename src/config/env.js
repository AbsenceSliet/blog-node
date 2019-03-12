let baseUrl = '';
let routerMode = 'hash';
if (process.env.NODE_ENV == 'development') {
    baseUrl = '';
} else {
    baseUrl = '';
}

export {
    baseUrl,
    routerMode,
}