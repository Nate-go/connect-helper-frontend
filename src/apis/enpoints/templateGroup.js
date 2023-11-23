const baseEndpoint = '/template-groups'

const templateGroupEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    update: baseEndpoint,
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
    getTemplates: baseEndpoint + '/'
};

export default templateGroupEndpoints;