function findUnique(array: number[]): number[] {
    const set = new Set(array);
    return [...new Set(array)];
}
