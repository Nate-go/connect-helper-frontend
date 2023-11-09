const baseEndpoint = '/tags'

const tagEndpoints = {
    get: baseEndpoint,
    update: baseEndpoint + '/',
    delete: baseEndpoint,
    create: baseEndpoint,
    detail: baseEndpoint + '/',
};

export default tagEndpoints;