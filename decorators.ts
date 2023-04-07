function WithFuel(target: typeof Rocket, context): typeof Rocket | void {
  if (context.kind === "class") {
    return class extends target {
      fuel: number = 50
      isEmpty(): boolean {
        return this.fuel == 0
      }
    }
  }
}

function deprecatedMethod(target: Function, context) {
  if (context.kind === "method") {
    return function (...args: any[]) {
      console.log(`${context.name} is deprecated and will be removed in a future version.`)
      return target.apply(this, args)
    }
  }
}

function deprecatedProperty(_: any, context) {
  if (context.kind === "field") {
    return function (initialValue: any) {
      console.log(`${context.name} is deprecated and will be removed in a future version.`)
      return initialValue
    }
  }
}

function deprecated(target, context) {
  const kind = context.kind

  const msg = `${context.name} is deprecated and will be removed in a future version.`

  if (kind === "method" || kind === "getter" || kind === "setter") {
    return function (...args: any[]) {
      console.log(msg)
      return target.apply(this, args)
    }
  } else if (kind === "field") {
    return function (initialValue: any) {
      console.log(msg)
      return initialValue
    }
  }
}

@WithFuel
class Rocket {
  @deprecated
  fuel: number = 75

  @deprecated
  isReadyForLaunch(): Boolean {
    return !(this as any).isEmpty()
  }
}

const rocket = new Rocket()
console.log(rocket.fuel)
console.log(`Is the rocket empty? ${(rocket as any).isEmpty()}`)
console.log(`Is the rocket ready for launch? ${rocket.isReadyForLaunch()}`)
