async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (match) {
    console.log(match[1]);
  } else {
    console.log("No match for", url);
  }
}

const urls = [
  "https://ibb.co/tMHrMRSD",
  "https://ibb.co/gbMyzj3R",
  "https://ibb.co/TqbbxvPV",
  "https://ibb.co/YBtpbk6k",
  "https://ibb.co/xSq0ss1f",
  "https://ibb.co/5h4RVqgq",
  "https://ibb.co/KdLgPwn",
  "https://ibb.co/Cs0fbBYS",
  "https://ibb.co/d03KjfDj",
  "https://ibb.co/kgMXFzH3",
  "https://ibb.co/7dvZWsqY",
  "https://ibb.co/607J2XGb",
  "https://ibb.co/B21W4f8T"
];

async function main() {
  for (const url of urls) {
    await scrape(url);
  }
}
main();
