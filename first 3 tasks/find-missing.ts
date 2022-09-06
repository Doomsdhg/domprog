function findMissing(array: number[]): number | void {
    const n = array.length + 1;
    for (let i = 1; i <= n; i++){
        if (!array.includes(i)){
            return i;
        }
    }
}
