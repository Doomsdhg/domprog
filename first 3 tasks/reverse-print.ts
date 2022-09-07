function reversePrint(linkedList: Record<string, any>): void {
    if (linkedList['next']) {
        reversePrint(linkedList['next'])
        console.log(linkedList['value'])
    } else {
        console.log(linkedList['value'])
    }
}
