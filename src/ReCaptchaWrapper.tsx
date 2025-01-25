import makeAsyncScript from "react-async-script";
import ReCaptcha, { ReCaptchaProps } from "./ReCaptcha";

const callbackName = "onloadcallback";
const globalName = "grecaptcha";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}

const getReCaptchaURL = (): string =>{
    const dynamicOptions = getOptions();
    const hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
    if (dynamicOptions.enterprise) {
    return `https://${hostname}/recaptcha/enterprise.js?onload=${callbackName}&render=explicit`;
    }
    return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit`;
}

const ReCaptchaWrapper = makeAsyncScript(getReCaptchaURL(),{
    callbackName,
    globalName,
    attributes: getOptions().nonce ? { nonce: getOptions().nonce } : {},
})(ReCaptcha);

export default ReCaptchaWrapper;
export type { ReCaptchaProps }; // Re-export the type for external use
