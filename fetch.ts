async function run() {
  const res = await fetch('https://breathetoheal.nu/pages/tarieven');
  const text = await res.text();
  
  // Extract the main content area if possible, or just strip tags
  const bodyMatch = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainContent = bodyMatch ? bodyMatch[1] : text;
  
  const cleanText = mainContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  console.log(cleanText.substring(0, 3000));
}
run();
