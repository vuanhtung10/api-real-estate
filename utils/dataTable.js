const getDataTableParams = function(req) {
    let {
      start, length
    } = req.body
    const {
      draw, order, columns, search
    } = req.body
    const keyword = search ? search.value : ''
    start = parseInt(start, 10)
    length = parseInt(length, 10)
  
    let orderBy = null
    let orderType = null
    if (order) {
      const num = order[0].column
      orderBy = columns[num].data
      orderType = order[0].dir
    }
  
    return {
      start,
      length,
      draw,
      orderBy,
      orderType,
      keyword,
    }
}
exports.getDataTableParams = getDataTableParams;