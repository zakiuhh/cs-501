const url = 'https://bfourptzkxalhloedhxj.supabase.co/rest/v1/certificates?select=*';
const key = 'sb_publishable_TwwY1tIoPrZXijug6jSqsw_GD-5GCWd';

fetch(url, {
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`
  }
})
.then(res => {
  console.log('Status:', res.status);
  return res.json();
})
.then(data => {
  console.log('Successfully fetched certificates from Supabase:');
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => console.error('Error querying Supabase:', err));
