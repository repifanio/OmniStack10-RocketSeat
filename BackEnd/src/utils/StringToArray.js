module.exports = (StringToArray) => {
    return StringToArray.split(',').map(tech => tech.trim());
} 