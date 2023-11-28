const baseEndpoint = '/schedules'

const scheduleEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    update: baseEndpoint,
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
};

export default scheduleEndpoints;