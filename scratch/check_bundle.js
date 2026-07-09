async function checkHTML() {
  const url = 'https://cs501.vercel.app/';
  try {
    const res = await fetch(url);
    const html = await res.text();
    console.log("=== HTML HEAD SNIPPET ===");
    const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
    if (headMatch) {
      console.log(headMatch[1].slice(0, 2000));
    } else {
      console.log(html.slice(0, 1500));
    }
  } catch (e) {
    console.error(e);
  }
}

checkHTML();
