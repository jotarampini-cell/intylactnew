const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const images = [
  { url: 'https://www.intylact.com/wp-content/uploads/2024/03/Dr-2.webp', dest: 'public/team/dr-navarro.webp' },
  { url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop', dest: 'public/community/01.jpg' },
  { url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', dest: 'public/community/02.jpg' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', dest: 'public/community/03.jpg' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', dest: 'public/community/04.jpg' },
  { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', dest: 'public/community/05.jpg' },
  { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', dest: 'public/community/06.jpg' },
  { url: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&auto=format&fit=crop', dest: 'public/community/07.jpg' },
  { url: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=400&auto=format&fit=crop', dest: 'public/community/08.jpg' },
];

Promise.all(images.map(img => download(img.url, img.dest)))
  .then(() => console.log('All extra images downloaded!'))
  .catch(err => console.error('Error downloading images:', err));
