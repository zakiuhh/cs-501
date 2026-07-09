async function testProductionBundle() {
  const assets = [
    '/assets/index-D3OZAEYb.js',
    '/assets/index-Dy8QsnPF.js',
    '/assets/export-CwkZLhtY.js',
    '/assets/progress-19PhY8PK.js'
  ];

  const targetUrl = 'https://bfourptzkxalhloedhxj.supabase.co';
  let found = false;

  for (const asset of assets) {
    const url = `https://cs501.vercel.app${asset}`;
    try {
      console.log(`Downloading and checking: ${url}`);
      const res = await fetch(url);
      const content = await res.text();
      if (content.includes(targetUrl)) {
        console.log(`=> FOUND Supabase URL in asset: ${url}`);
        found = true;
      }
      // Let's also check if it contains 'sb_publishable_TwwY1tIoPrZXijug6jSqsw_GD-5GCWd'
      if (content.includes('sb_publishable_TwwY1tIoPrZXijug6jSqsw_GD-5GCWd')) {
        console.log(`=> FOUND Supabase Anon Key in asset: ${url}`);
        found = true;
      }
    } catch (e) {
      console.error(`Error fetching ${url}:`, e);
    }
  }

  if (!found) {
    console.log("=> WARNING: Supabase credentials were NOT found in the bundles.");
  }
}

testProductionBundle();
