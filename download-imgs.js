const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
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
  { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', dest: 'public/blog/ph-importa.jpg' },
  { url: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop', dest: 'public/blog/probioticos.jpg' },
  { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop', dest: 'public/blog/jornada.jpg' },
  { url: 'https://images.unsplash.com/photo-1522845015757-50bce044e5da?q=80&w=800&auto=format&fit=crop', dest: 'public/blog/rutina.jpg' },
  { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop', dest: 'public/education/probioticos.jpg' },
];

Promise.all(images.map(img => download(img.url, img.dest)))
  .then(() => console.log('All images downloaded!'))
  .catch(err => console.error('Error downloading images:', err));
