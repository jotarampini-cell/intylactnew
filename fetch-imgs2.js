const fs = require('fs');
fetch('https://www.intylact.com/blog/')
  .then(res => res.text())
  .then(html => {
    const urls = [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      urls.push(match[1]);
    }
    fs.writeFileSync('imgs2.txt', urls.join('\n'));
    console.log('Done, saved to imgs2.txt');
  });
