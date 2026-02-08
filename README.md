# yt-vp9-codec-enforcer
Userscript to disable AV1 video codec on YouTube and force VP9/AVC codec fallback for better compatibility and performance. Patches HTMLMediaElement.canPlayType(), MediaSource.isTypeSupported(), and MediaCapabilities.decodingInfo() to hide AV1 support from the browser.


## Overview

This is a Tampermonkey/Greasemonkey userscript that disables AV1 video codec detection in your browser, forcing YouTube and other video platforms to use VP9 or AVC (H.264) codecs instead.

## Why?

- **Compatibility**: VP9 and AVC are better supported across devices
- **Performance**: Some systems decode VP9/AVC more efficiently than AV1
- **Latency**: Can reduce input lag on certain hardware configurations
- **Control**: Take codec selection into your own hands

## How It Works

The script patches three key browser APIs:

1. **HTMLMediaElement.canPlayType()** - Makes the browser think it cannot play AV1
2. **MediaSource.isTypeSupported()** - Reports AV1 as unsupported for adaptive streaming
3. **MediaCapabilities.decodingInfo()** - Returns false for AV1 decoding capability

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. Click to install: [yt-vp9-codec-enforcer.user.js](https://github.com/HardMeister/yt-vp9-codec-enforcer/raw/main/yt-vp9-codec-enforcer.user.js)

3. Grant permissions when prompted

## Requirements

- A modern browser with Userscript support
- Tampermonkey, Violentmonkey, or Greasemonkey extension
- YouTube account (optional, works on both logged in and anonymous)

## License

MIT License - Feel free to use, modify, and distribute
