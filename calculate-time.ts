import { performance } from "perf_hooks";

function measure(target: Function, context) {
  if (context.kind === "method") {
    return function (...args: any[]) {
      const start = performance.now()  
      const result = target.apply(this, args)
      const end = performance.now()

      console.log(`Execution time: ${end - start} milliseconds`)
      return result
    }
  }
}

class Rocket {
  @measure
  launch() {
    console.log("Launching in 3... 2... 1... 🚀")
  }
}

const rocket = new Rocket()
rocket.launch()
