const { createClient } = require('@supabase/supabase-js');

const url = 'https://bfourptzkxalhloedhxj.supabase.co';
const key = 'sb_publishable_TwwY1tIoPrZXijug6jSqsw_GD-5GCWd';
const supabase = createClient(url, key);

function getVerificationId(name) {
  let hash = 0;
  const str = (name || "Learner") + "CS501-VERIFIED";
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
  const hex2 = (Math.abs(hash * 31) % 65536).toString(16).toUpperCase().padStart(4, "0");
  return `CS501-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex2}`;
}

async function testInsert() {
  const name = "Test User " + Math.floor(Math.random() * 10000);
  const id = getVerificationId(name);
  console.log(`Attempting to insert name: "${name}" with ID: "${id}"...`);
  
  const { data, error } = await supabase.from('certificates').insert([
    {
      id: id,
      name: name,
      course: "C++ Crashed: Interactive Programming Fundamentals (CS501)"
    }
  ]).select();

  if (error) {
    console.error('Supabase Insert FAILED:', error);
  } else {
    console.log('Supabase Insert SUCCEEDED:', data);
  }
}

testInsert();
