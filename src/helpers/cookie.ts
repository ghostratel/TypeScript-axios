export const cookie = {
  read(name: string): string | null {
    const cookies = document.cookie.split('; ')
    const reg = new RegExp('^' + name + '=(.*)')
    for (let kv of cookies) {
      if (kv.match(reg)) {
        return kv.match(reg)![1]
      }
    }
    return null
  }
}
