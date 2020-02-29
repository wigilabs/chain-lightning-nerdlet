class Utils {

  calculateP(a) {
    let n = a.length
    let count = 0

    for (var i = 0; i < n; i++)
      if(a[i].value) count ++

    return count / n * 100
  }
}

export default new Utils()