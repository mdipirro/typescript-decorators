function minimumFuel(fuel: number) {
  return function(target: Function, context) {
      if (context.kind === "method") {
          return function (...args: any[]) {
              if (this.fuel > fuel) {
                  return target.apply(this, args)
              } else {
                  console.log(`Not enough fuel. Required: ${fuel}, got ${this.fuel}`)
              }
          }
      }
  }
}

class Rocket {
  fuel: number = 50

  @minimumFuel(45)
  launch() {
      console.log("Launching in 3... 2... 1... 🚀")
  }
}

const rocket = new Rocket()
rocket.launch()