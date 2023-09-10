export function makeDeepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}