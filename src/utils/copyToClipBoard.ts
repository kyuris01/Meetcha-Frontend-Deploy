export const copyToClipboard = async (text: string) => {
  try {
    // 최신 브라우저
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 레거시 fallback
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      return true;
    } catch {
      return false;
    }
  }
};
