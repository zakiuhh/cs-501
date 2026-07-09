async function testVercel() {
  const urls = [
    'https://cs501.vercel.app/verify',
    'https://cs501.vercel.app/verify/',
    'https://cs501.vercel.app/verify/CS501-048F-A463-E7FD'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status} ${res.statusText}`);
      console.log(`Content-Type: ${res.headers.get('content-type')}`);
      const text = await res.text();
      console.log(`Snippet: ${text.slice(0, 300)}...\n`);
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e);
    }
  }
}

testVercel();
