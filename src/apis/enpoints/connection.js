const baseEndpoint = '/connections'

const connectionEndpoints = {
    get: baseEndpoint,
    delete: baseEndpoint,
    merge: baseEndpoint + '/merge',
    update: baseEndpoint,
    addTags: baseEndpoint + '/addTags',
    deleteTags: baseEndpoint + '/deleteTags',
    create: baseEndpoint,
    show: baseEndpoint + '/',
    edit: baseEndpoint + '/',
    getContacts: baseEndpoint + '/',
    addUserConnections: baseEndpoint + '/add-user-connections',
    deleteUserConnections: baseEndpoint + '/delete-user-connections',
    getUserConnections: baseEndpoint + '/user-connections/useable'
};

export default connectionEndpoints;