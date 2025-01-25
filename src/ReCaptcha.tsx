import React, { useRef, useEffect, useCallback } from "react";

interface ReCaptchaProps {
  sitekey: string;
  onChange?: (token: string | null) => void;
  theme?: "light" | "dark";
  size?: "normal" | "compact" | "invisible";
  tabindex?: number;
  onExpired?: () => void;
  onErrored?: () => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({
  sitekey,
  onChange,
  theme = "light",
  size = "normal",
  tabindex = 0,
  onExpired,
  onErrored,
}) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | undefined>(undefined);

  const renderCaptcha = useCallback(() => {
    if (window.grecaptcha && captchaRef.current && widgetId.current === undefined) {
      widgetId.current = window.grecaptcha.render(captchaRef.current, {
        sitekey,
        callback: onChange,
        theme,
        size,
        tabindex,
        "expired-callback": onExpired,
        "error-callback": onErrored,
      });
    }
  }, [sitekey, onChange, theme, size, tabindex, onExpired, onErrored]);

  useEffect(() => {
    renderCaptcha();
  }, [renderCaptcha]);

  return <div ref={captchaRef}></div>;
};

export default ReCaptcha;
export type { ReCaptchaProps }; // Explicitly export the type