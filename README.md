# yt-vp9-codec-enforcer
Userscript to disable AV1 video codec on YouTube and force VP9/AVC codec fallback for better compatibility and performance. Patches HTMLMediaElement.canPlayType(), MediaSource.isTypeSupported(), and MediaCapabilities.decodingInfo() to hide AV1 support from the browser.
