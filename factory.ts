function fill(value: number) {
    return function(_, context) {
        if (context.kind === "field") {
            return function (initialValue: number) {
            return value + initialValue
            }
        }
    }
}

class Rocket {
    @fill(20)
    fuel: number = 50
}

const rocket = new Rocket()
console.log(rocket.fuel)