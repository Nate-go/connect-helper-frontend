const baseEndpoint = "/users";

const userEndpoints = {
    get: baseEndpoint,
    getUserInformation: baseEndpoint + '/',
    getCoworkers: baseEndpoint + '/coworkers',
    invites: baseEndpoint + '/invites',
    delete: baseEndpoint
};

export default userEndpoints;
