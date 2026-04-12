import https from 'https';

const icsUrl = 'https://calendar.google.com/calendar/ical/martin.nieuweadem%40gmail.com/public/basic.ics';
const url = `https://corsproxy.io/?${encodeURIComponent(icsUrl)}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Data preview:', data.substring(0, 500));
  });
}).on('error', err => console.error(err));
