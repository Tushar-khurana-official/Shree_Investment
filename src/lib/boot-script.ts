/**
 * Inline script run before first paint: marks that JS is available (for scroll reveals), and marks a stored
 * cookie choice so the server-rendered cookie banner is hidden before it is ever painted.
 */
export const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var c=localStorage.getItem('mfd-cookie-consent');if(c==='accepted'||c==='declined')d.classList.add('consent-set');}catch(e){}})();`;
