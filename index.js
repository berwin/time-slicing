export default function ts (gen) {
  if (typeof gen === 'function') gen = gen()
  if (!gen || typeof gen.next !== 'function') return

  (function next () {
    const res = gen.next()
    if (res.done) return
    setTimeout(next)
  })()
}
