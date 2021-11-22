console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msgId === 'getTotal') {
    console.log('Getting Total');
    chrome.storage.local.get(['total'], function (items) {
      console.log('items:', items);
    });
  }
});
