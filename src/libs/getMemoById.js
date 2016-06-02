export default (memos, id) => {
  const memo = memos.filter((memo) => id === memo.id)[0]
  return Object.assign({}, memo)
}
