let toString = Object.prototype.toString

function deepCopy(target) {
  let ret = Object.create(null)

  for(let key in target) {
    if(toString.call(target[key]) === '[object Object]') {
      ret[key] = {...target[key]}
      continue
    }
    if(toString.call(target[key]) === '[object Array]') {
      ret[key] = [...target[key]]
      continue
    }
    ret[key] = target[key]
  }
  return ret
}

let foo = {
  foo: 'bar'
}

let a = {
  a: foo,
  b: 1
}

let b = Object.assign({}, a)

console.log(b.a === foo);
