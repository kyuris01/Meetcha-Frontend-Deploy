import { useEffect } from "react";

const isAllowedBrowser = (ua: string): boolean => {
  // 인앱 브라우저 (메신저/SNS 한정 비허용)
  const isInApp =
    /(Instagram|KAKAOTALK|KakaoTalk|FBAN|FB_IAB|FBAV|Line|MicroMessenger|WeChat|Twitter|Snapchat|TikTok|Pinterest|LinkedIn)/i.test(
      ua
    );
  if (isInApp) return false;

  // 주요 브라우저 판별
  const isEdge = /Edg\//i.test(ua); // Chromium Edge
  const isSamsung = /SamsungBrowser/i.test(ua);
  const isFirefox = /Firefox|FxiOS/i.test(ua);
  const isOpera = /OPR\//i.test(ua) || /Opera/i.test(ua);
  const isWhale = /Whale/i.test(ua);
  const isChrome =
    /Chrome|CriOS|Chromium/i.test(ua) && !isEdge && !isSamsung && !isOpera && !isWhale; // iOS Chrome 포함

  // 순수 Safari (비허용)
  const isSafari =
    /Safari/i.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/(Chrome|CriOS|FxiOS|Edg|SamsungBrowser|OPR|Opera|Whale)/i.test(ua);
  if (isSafari) return false;

  // 허용 브라우저
  if (isChrome || isFirefox || isEdge || isSamsung || isOpera || isWhale) return true;
  return false;
};

const ALERT_MESSAGE =
  "이 브라우저는 일부 기능이 호환되지 않을 수 있습니다. Chrome, Edge 그리고 Samsung Browser등을 사용해주세요.";

/**
 * - 인앱 브라우저는 대부분 비허용(스토리지 유지 안돼 로그인 초기화됨)
 * - Safari는 비허용(호환안되는 경우 많음)
 * - 이 통계를 보고 허용/비허용을 판단 해야함
 * @link [국내 브라우저 사용 통계](https://koreanextweb.kisa.or.kr/front/stats/browser/browserUseStats.do)
 */
export const BrowserLimiter = () => {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent;
    if (!isAllowedBrowser(ua)) {
      const href = window.location.href;
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);

      if (isIOS) {
        const toChromeScheme = (url: string) => {
          try {
            const u = new URL(url);
            const scheme = u.protocol === "https:" ? "googlechromes:" : "googlechrome:";
            return scheme + "//" + u.host + u.pathname + u.search + u.hash;
          } catch {
            return "googlechrome://";
          }
        };
        const originalHref = window.location.href;
        // 크롬 스킴으로 열기 시도
        window.location.href = toChromeScheme(href);
        // 설치 안된 경우 감지 (약간의 시간 후에도 페이지가 같으면)
        setTimeout(() => {
          if (window.location.href === originalHref || document.hasFocus()) {
            alert(ALERT_MESSAGE);
          }
        }, 500);
        return;
      }

      if (isAndroid) {
        try {
          const u = new URL(href);
          const scheme = u.protocol.replace(":", "");
          const intent = `intent://${u.host}${u.pathname}${u.search}${u.hash}#Intent;scheme=${scheme};package=com.android.chrome;end;`;
          const originalHref = window.location.href;
          window.location.href = intent;
          // 설치 안된 경우 감지
          setTimeout(() => {
            if (window.location.href === originalHref || document.hasFocus()) {
              alert(ALERT_MESSAGE);
            }
          }, 500);
        } catch {
          alert(ALERT_MESSAGE);
        }
        return;
      }

      // 기타 데스크톱: alert만 표시
      alert(ALERT_MESSAGE);
    }
  }, []);

  return null;
};
