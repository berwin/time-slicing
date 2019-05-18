export default function ts (gen) {
  if (typeof gen === 'function') gen = gen()
  if (!gen || typeof gen.next !== 'function') return

  return function next () {
    const start = performance.now()
    let res = null
    do {
      res = gen.next()
    } while(!res.done && performance.now() - start < 25);

    if (res.done) return
    setTimeout(next)
  }
}
