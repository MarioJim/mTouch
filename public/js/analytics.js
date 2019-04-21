// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-136702959-1');

// Inspectlet
(function() {
  window.__insp = window.__insp || [];
  __insp.push(['wid', 1286863774]);
const ldinsp = function(){
    if (typeof window.__inspld !== 'undefined') return;
    window.__inspld = 1;
    let insp = document.createElement('script');
    insp.type = 'text/javascript';
    insp.async = true;
    insp.id = 'inspsync';
    insp.src =
      `${'https:' == document.location.protocol ? 'https' : 'http' 
      }://cdn.inspectlet.com/inspectlet.js?wid=1286863774&r=${ 
      Math.floor(new Date().getTime() / 3600000)}`;
    let x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(insp, x);
  };
  setTimeout(ldinsp, 0);
})();
