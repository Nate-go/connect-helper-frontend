const baseEndpoint = '/email-schedules'

const emailScheduleEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    update: baseEndpoint,
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
};

export default emailScheduleEndpoints;