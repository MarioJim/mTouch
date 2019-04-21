/* eslint-disable no-undef */
/* eslint-disable func-names */
// Google Analytics
(function(i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-136702959-1', 'auto');
ga('send', 'pageview');
ga('set', 'anonymizeIp', true);

// Inspectlet
(function() {
  window.__insp = window.__insp || [];
  __insp.push(['wid', 1286863774]);
  const ldinsp = function() {
    if (typeof window.__inspld !== 'undefined') return;
    window.__inspld = 1;
    const insp = document.createElement('script');
    insp.type = 'text/javascript';
    insp.async = true;
    insp.id = 'inspsync';
    insp.src = `${
      document.location.protocol == 'https:' ? 'https' : 'http'
    }://cdn.inspectlet.com/inspectlet.js?wid=1286863774&r=${Math.floor(new Date().getTime() / 3600000)}`;
    const x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(insp, x);
  };
  setTimeout(ldinsp, 0);
})();
