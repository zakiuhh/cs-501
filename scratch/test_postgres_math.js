let hash_val = 0n; // Use BigInt to match PG bigint
const str = "Zaki Ul Hassan" + "CS501-VERIFIED";
for (let i = 0; i < str.length; i++) {
  const c = BigInt(str.charCodeAt(i));
  hash_val = hash_val * 31n + c;
  
  // Emulate the PG modulo:
  hash_val = (hash_val + 2147483648n) % 4294967296n;
  if (hash_val < 0n) {
    hash_val = hash_val + 4294967296n;
  }
  hash_val = hash_val - 2147483648n;
}

// Get absolute value
const abs_hash = hash_val < 0n ? -hash_val : hash_val;
let hex_str = abs_hash.toString(16).toUpperCase().padStart(8, '0');
let hex2_str = ((abs_hash * 31n) % 65536n).toString(16).toUpperCase().padStart(4, '0');

console.log("PG Emulated Hash:", `CS501-${hex_str.slice(0, 4)}-${hex_str.slice(4, 8)}-${hex2_str}`);

// Compare to actual JS hash:
let js_hash = 0;
const js_str = "Zaki Ul Hassan" + "CS501-VERIFIED";
for (let i = 0; i < js_str.length; i++) {
  js_hash = (js_hash << 5) - js_hash + js_str.charCodeAt(i);
  js_hash |= 0;
}
const js_hex = Math.abs(js_hash).toString(16).toUpperCase().padStart(8, "0");
const js_hex2 = (Math.abs(js_hash * 31) % 65536).toString(16).toUpperCase().padStart(4, "0");
console.log("Actual JS Hash:  ", `CS501-${js_hex.slice(0, 4)}-${js_hex.slice(4, 8)}-${js_hex2}`);
