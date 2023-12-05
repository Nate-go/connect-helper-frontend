import * as jwt_decode from 'jwt-decode';

export const getIds = (data) => {
    if(!data) return [];
    const ids = data.map(element => element.id);
    return ids;
}

export const fillNullValues = (data, fillValue) => {
    if (Array.isArray(data)) {
        return data.map(item => fillNullValues(item, fillValue));
    } else if (data !== null && typeof(data) === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, fillNullValues(value, fillValue)])
        );
    } else {
        return data !== null ? data : fillValue;
    }
};

export const updateData = (newData, oldData, setData) => {
    const result = { ...oldData };

    for (const key in newData) {
        if (oldData.hasOwnProperty(key)) {
            result[key] = newData[key];
        }
    }
    setData(result);

    return result;
};

export const decodeToken = (jwtCode) => {
    try {
        const decodedToken = jwt_decode.jwtDecode(jwtCode);
        return decodedToken;
    } catch (error) {
        return null;
    }
};

export const checkObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const jsonToObject = (data) => {
    return JSON.parse(JSON.stringify(data));
}