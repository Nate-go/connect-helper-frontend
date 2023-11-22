const baseEndpoint = '/templates'

const templateEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    update: baseEndpoint,
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
};

export default templateEndpoints;