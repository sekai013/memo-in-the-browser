chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({
    memoData: {}
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'saveAction':
      console.log(sender.url, message.actions)
      chrome.storage.sync.get('memoData', (storage) => {
        chrome.storage.sync.set({
          memoData: Object.assign({}, storage.memoData, { [sender.url]: message.actions })
        }, () => { console.log('Saved.') })
      })
      return true
    case 'loadAction':
      chrome.storage.sync.get('memoData', (storage) => {
        sendResponse({ actions: storage.memoData[sender.url] || [] })
      })
      return true
      break
    default:
      return false
  }
})
