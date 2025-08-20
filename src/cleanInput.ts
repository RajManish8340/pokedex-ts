export function cleanInput(input:string): string[] | string {
    const names = input
        .trim()
        .split(/\s+/)
        .map((n) => n.toLowerCase())
        .filter((n) => n.length > 0) // filter emplty strings ""
    
    if (names.length === 0){
        return "please enter the valid names"
    }
    return names
}