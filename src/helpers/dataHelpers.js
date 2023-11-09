export const getIds = (data) => {
    const ids = data.map(element => element.id);
    return ids;
}

export const fillNullValues = (data, fillValue) => {
    if (Array.isArray(data)) {
        return data.map(item => fillNullValues(item, fillValue));
    } else if (data !== null && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, fillNullValues(value, fillValue)])
        );
    } else {
        return data !== null ? data : fillValue;
    }
};

const updateData = (newData, oldData, setData) => {
    const result = { ...oldData };

    for (const key in newData) {
        if (oldObject.hasOwnProperty(key)) {
            result[key] = newObject[key];
        }
    }
    setData(result);

    return result;
};