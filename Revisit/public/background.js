function showNotifications(reminder) {
    console.log("Showing notifications for reminder:", reminder);
  
    // Show Chrome desktop notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icon.png'),
      title: 'Reminder',
      message: `Don't forget: ${reminder.note}\nLink: ${reminder.link}`
    });
  
    // Show notification on the current tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        console.log("Sending message to tab:", tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'showTabNotification',
          message: `Don't forget: ${reminder.note}<br><a href="${reminder.link}" target="_blank">Open Link</a>`
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent successfully, response:", response);
          }
        });
  
        // Also try a simple alert
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => { alert('Reminder!'); }
        });
      } else {
        console.error("No active tab found");
      }
    });
  }
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm triggered:", alarm);
    chrome.storage.sync.get(['reminders'], (result) => {
      const reminder = result.reminders.find(r => r.id === alarm.name);
      if (reminder) {
        showNotifications(reminder);
      } else {
        console.log("No reminder found for alarm:", alarm);
      }
    });
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['contentScript.js']
      })
      .then(() => console.log("Content script injected"))
      .catch(err => console.error("Error injecting content script:", err));
    }
  });