export function findFirstMatchByPriority(array, ...callbacks) {
    for (const cb of callbacks) {
        for (const item of array) {
            if (cb(item)) {
                return item
            }
        }
    }
    
    return undefined
}