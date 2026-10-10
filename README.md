# startpage

A minimal new tab page for Chromium that follows the current [Omarchy](https://omarchy.org) theme: a clock, the date and keyboard-driven links over the blurred wallpaper.

## Install

1. Add the folder to Chromium's `--load-extension` list in `~/.config/chromium-flags.conf` (or load it unpacked from `chrome://extensions`).
2. Generate the theme files: `bin/sync-theme`
3. Set your links: `cp links.example.js links.js`, then edit `links.js` (it's gitignored, so your links stay private).
4. Keep it in sync on theme changes:

   ```sh
   printf '#!/bin/bash\nexec "%s/bin/sync-theme"\n' "$PWD" > /tmp/startpage-sync
   omarchy hook install theme-set /tmp/startpage-sync
   ```

## Use

Each link shows a key: press it to open the link, or Shift+key to open it in a new tab. Edit `links.js` to change the links.
