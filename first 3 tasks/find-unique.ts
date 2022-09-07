function findUnique(array: number[]): number[] {
    return array.filter((number: number) => {
        return array.lastIndexOf(number) === array.indexOf(number);
    })
}
