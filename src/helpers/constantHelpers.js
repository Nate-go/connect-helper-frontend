
export const getConstantTitle = (constants, value) => {
    for (const key in constants) {
        if (constants[key] == value) {
            return convertToTitleCase(key);
        }
    }
    return convertToTitleCase(Object.keys(constants)[0]);
};

export const convertToTitleCase = (str) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(' ');
};

export const getConstantData = (constant) => {
    return Object.entries(constant).map(([label, value]) => ({
        label: getConstantTitle(constant, value),
        value
    }));
}
