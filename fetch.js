const fetch = require('node-fetch');
async function run() {
  const res = await fetch('https://breathetoheal.nu/pages/tarieven');
  const text = await res.text();
  console.log(text.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 3000));
}
run();
