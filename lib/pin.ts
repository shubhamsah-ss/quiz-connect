export function generatePin(digit: number = 4) {
    
    const randomInt = Math.floor(Math.random()*digit)

    return randomInt
}