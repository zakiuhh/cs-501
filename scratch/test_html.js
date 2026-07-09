async function testHTML() {
  const url = 'https://cs501.vercel.app/verify/CS501-048F-A463-E7FD';
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    console.log("=== CHECKING VERIFY ID ROUTE ===");
    console.log("Includes 'Certificate Verification' (search page):", html.includes("Certificate Verification"));
    console.log("Includes 'Credential Details' (details page):", html.includes("Credential Details"));
    console.log("Includes 'Verification Failed':", html.includes("Verification Failed"));
    
    // Let's print the title and metadata tags in the HTML
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
    if (titleMatch) console.log("Title tag:", titleMatch[1]);
    
    // Let's also print some HTML body contents if available
    const bodyMatch = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
      console.log("Body snippet:", bodyMatch[1].slice(0, 1000));
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

testHTML();
