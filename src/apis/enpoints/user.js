const baseEndpoint = "/users";

const userEndpoints = {
    getAll: baseEndpoint,
    getUserInformation: baseEndpoint + '/',
    getCoworkers: baseEndpoint + '/coworkers',
    invites: baseEndpoint + '/invites',
};

export default userEndpoints;
