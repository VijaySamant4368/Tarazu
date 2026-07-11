export const addrchangeURL = {
  'amazon': {
    url: 'https://www.amazon.in/portal-migration/hz/glow/address-change?actionSource=glow',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ zipCode: pin, actionSource: 'glow' })
  },
  'flipkart': {
    url: 'https://www.flipkart.com/api/web/pincode',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'bigbasket': {
    url: 'https://www.bigbasket.com/co/update-pincode/',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: (pin) => `pincode=${pin}`
  },
  'blinkit': {
    url: 'https://blinkit.com/api/v2/location',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'zepto': {
    url: 'https://api.zeptonow.com/api/v1/address',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'jiomart': {
    url: 'https://www.jiomart.com/mst/pin/check',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'pharmeasy': {
    url: 'https://pharmeasy.in/api/pincode/serviceability',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  '1mg': {
    url: 'https://www.1mg.com/api/v3/pincode/check',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'myntra': {
    url: 'https://www.myntra.com/gateway/v2/pincode/serviceability',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'ajio': {
    url: 'https://www.ajio.com/api/pincode/check',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'croma': {
    url: 'https://www.croma.com/api/v1/pincode/check',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  },
  'tatacliq': {
    url: 'https://www.tatacliq.com/api/v1/pincode/check',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: (pin) => JSON.stringify({ pincode: pin })
  }
};

export const sendAddressChangeReq = (siteId, webViewRef, submittedAddress) => {
  const siteConfig = addrchangeURL[siteId];
  if (!siteConfig || !webViewRef || !webViewRef.current) return;

  const { url, method = 'POST', headers = {}, body } = siteConfig;
  const bodyStr = typeof body === 'function' ? body(submittedAddress) : '';

  webViewRef.current.injectJavaScript(`
    fetch('${url}', {
      method: '${method}',
      headers: ${JSON.stringify(headers)},
      body: ${JSON.stringify(bodyStr)}
    })
    .then(res => res.text())
    .then(data => console.log('Address changed for ' + '${siteId}', data))
    .catch(err => console.error('Error changing address for ' + '${siteId}', err));
    true;
  `);
};
