// ==UserScript==
// @name         YouTube: disable AV1 (prefer VP9)
// @namespace    yt-no-av1
// @version      1.0
// @description  Hide AV1 support so YouTube falls back to VP9/AVC
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const isAv1 = (s) => (typeof s === 'string') && /av01/i.test(s);

  // 1) HTMLMediaElement.canPlayType() — используется для проверки поддерживаемых кодеков
  const origCanPlayType = HTMLMediaElement.prototype.canPlayType;
  Object.defineProperty(HTMLMediaElement.prototype, 'canPlayType', {
    value: function (type) {
      if (isAv1(type)) return '';
      return origCanPlayType.call(this, type);
    },
    configurable: true,
    writable: true
  });

  // 2) MediaSource.isTypeSupported() — проверка поддерживаемости для MSE-потоков
  if (window.MediaSource && typeof MediaSource.isTypeSupported === 'function') {
    const origIsTypeSupported = MediaSource.isTypeSupported.bind(MediaSource);
    MediaSource.isTypeSupported = function (type) {
      if (isAv1(type)) return false;
      return origIsTypeSupported(type);
    };
  }

  // 3) MediaCapabilities.decodingInfo() — некоторые сайты/плееры дополнительно спрашивают её
  if (navigator.mediaCapabilities && typeof navigator.mediaCapabilities.decodingInfo === 'function') {
    const origDecodingInfo = navigator.mediaCapabilities.decodingInfo.bind(navigator.mediaCapabilities);
    navigator.mediaCapabilities.decodingInfo = async function (config) {
      const ct = config?.video?.contentType || config?.audio?.contentType || '';
      if (isAv1(ct)) {
        return { supported: false, smooth: false, powerEfficient: false };
      }
      return origDecodingInfo(config);
    };
  }
})();
