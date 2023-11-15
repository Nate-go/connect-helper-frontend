const baseEndpoint = "/users";

const userEndpoints = {
    getAll: baseEndpoint,
    getUserInformation: baseEndpoint + '/',
    getCoworkers: baseEndpoint + '/coworkers'
};

export default userEndpoints;
