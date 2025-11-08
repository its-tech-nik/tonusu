const secureBrowsers = ["Firefox", "Chrome"];
import { UAParser } from "ua-parser-js";

export const isSecureBrowser = () => {
  const { browser } = UAParser(navigator.userAgent);
  if (browser && browser.name) {
    return secureBrowsers.some((secureBrowser) =>
      // @ts-expect-error - browser.name is not typed
      browser.name.toLowerCase().includes(secureBrowser.toLowerCase()),
    );
  }
  return true;
};
