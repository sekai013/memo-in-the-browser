chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({
    memoData: {}
  })
  chrome.contextMenus.create({
    id: 'cutMemo',
    title: 'Cut Memo',
    enabled: false
  })
  chrome.contextMenus.create({
    id: 'copyMemo',
    title: 'Copy Memo',
    enabled: false
  })
  chrome.contextMenus.create({
    id: 'pasteMemo',
    title: 'Paste Memo',
    enabled: false
  })
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.getSelected((tab) => {
      chrome.tabs.sendMessage(tab.id, { type: info.menuItemId })
    })
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'saveAction':
      console.log(sender.url, message.actions)
      chrome.storage.sync.get('memoData', (storage) => {
        chrome.storage.sync.set({
          memoData: Object.assign({}, storage.memoData, {
            [sender.url]: message.actions
          })
        })
      })
      return true
    case 'loadAction':
      chrome.storage.sync.get('memoData', (storage) => {
        sendResponse({ actions: storage.memoData[sender.url] || [] })
      })
      return true
    case 'enableCutAndCopy':
      chrome.contextMenus.update('cutMemo', {
        enabled: true
      })
      chrome.contextMenus.update('copyMemo', {
        enabled: true
      })
      return true
    case 'disableCutAndCopy':
      chrome.contextMenus.update('cutMemo', {
        enabled: false
      })
      chrome.contextMenus.update('copyMemo', {
        enabled: false
      })
      return true
    case 'enablePaste':
      chrome.contextMenus.update('pasteMemo', {
        enabled: true
      })
      return true
    case 'disablePaste':
      chrome.contextMenus.update('pasteMemo', {
        enabled: false
      })
      return true
    default:
      return false
  }
})
