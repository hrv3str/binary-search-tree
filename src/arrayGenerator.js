const generateArray = () => {
    const minLength = 10;
    const maxLength = 15;
    const minValue = 100;
    const maxValue = 999;

    const arrLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const output = [];

    for (let i = 0; i < arrLength; i++) {
        const number = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        output.push(number);
    }

    return output;
}

export default generateArray;