export const THEME_KEY = "mfd-theme";

/**
 * Inline script run before first paint:
 *  - applies the saved theme (navy & gold by default; light only if the visitor chose it), so there is no flash;
 *  - marks that JS is available (for scroll reveals);
 *  - marks a stored cookie choice so the server-rendered cookie banner is hidden before it is ever painted.
 */
export const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(localStorage.getItem('${THEME_KEY}')==='light')d.classList.add('light');var c=localStorage.getItem('mfd-cookie-consent');if(c==='accepted'||c==='declined')d.classList.add('consent-set');}catch(e){}})();`;
