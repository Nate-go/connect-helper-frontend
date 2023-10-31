
export const getConstantTitle = (constants, value) => {
    for (const key in constants) {
        if (constants[key] == value) {
            return key;
        }
    }
    return null;
};
