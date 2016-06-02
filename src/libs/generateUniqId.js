import uuid from 'uuid'

export default (memos) => {
  let uniqId = ''

  do {
    uniqId = uuid.v4()
  } while (memos.some((memo) => uniqId === memo.id))

  return uniqId
}
