console.log("Content script loaded on:", window.location.href);

function showTabNotification(message) {
  console.log("Showing tab notification:", message);
  const notificationDiv = document.createElement('div');
  notificationDiv.innerHTML = `
    <h3>Reminder</h3>
    <p>${message}</p>
    <button id="closeNotification">Close</button>
  `;
  notificationDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 2147483647;
    max-width: 300px;
  `;
  document.body.appendChild(notificationDiv);

  document.getElementById('closeNotification').addEventListener('click', () => {
    notificationDiv.remove();
  });

  // Automatically remove after 30 seconds if not closed
  setTimeout(() => {
    if (document.body.contains(notificationDiv)) {
      notificationDiv.remove();
    }
  }, 30000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.action === 'showTabNotification') {
    showTabNotification(request.message);
    sendResponse({success: true});
  }
  return true;  // Indicates that the response is sent asynchronously
});