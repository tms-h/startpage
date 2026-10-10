// Chromium opens the first window's tab before a --load-extension extension has
// registered its new tab override, so that tab gets the stock page. Once per
// browser session, reopen the new tabs that were already open so they get ours.
// (chrome.storage.session is cleared when the browser quits.)
chrome.storage.session.get("fixedStartupTabs").then(({ fixedStartupTabs }) => {
  if (fixedStartupTabs) return;
  chrome.storage.session.set({ fixedStartupTabs: true });
  chrome.tabs.query({}).then((tabs) => {
    for (const tab of tabs) {
      if ((tab.pendingUrl || tab.url || "").startsWith("chrome://newtab")) chrome.tabs.update(tab.id, { url: "chrome://newtab/" });
    }
  });
});
