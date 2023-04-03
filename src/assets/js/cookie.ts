interface param {
  name: string,
  value: any,
  domain?: string,
  path?: string,
  day?: number
}

const Cookie = {
  read(name: param['name']): param['value'] {
    const value = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)')
    return value ? decodeURIComponent(value[1]) : null
  },
  write(value: param): void {
    let str = value.name + '=' + encodeURIComponent(value.value)
    if (value.domain) {
      str += '; domain=' + value.domain
    }
    if (value.path) {
      str += '; path=' + value.path
    }
    if (value.day) {
      const time = new Date()
      time.setTime(time.getTime() + value.day * 24 * 60 * 60 * 1000)
      str += '; expires=' + time.toUTCString()
    }
    document.cookie = str
  },
  dispose(name: param['name']): void {
    const str = this.read(name)
    this.write({
      name: name,
      value: str,
      day: -1,
    })
  },
}

window.$cookie = (name, value, options) => {
  if (typeof value === 'undefined') {
    return Cookie.read(name)
  } else {
    if (value === null) {
      return Cookie.dispose(name)
    } else {
      options = options || {}
      options.name = name
      options.value = value
      return Cookie.write(options)
    }
  }
}

export {}
