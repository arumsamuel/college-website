// College Website - Download royalty-free campus media to local assets.
// All media is saved locally under public/assets/media/{images,videos}/{section}/ — no hotlinking.
// Organized by section: home, about, admissions, academics, student-life, news, campus.

const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'assets', 'media');

const sections = ['home', 'about', 'admissions', 'academics', 'student-life', 'news', 'campus'];
const imgSectionDir = section => path.join(baseDir, 'images', section);
const vidSectionDir = section => path.join(baseDir, 'videos', section);

// Ensure all directories exist
async function ensureDirs() {
  for (const s of sections) {
    fs.mkdirSync(imgSectionDir(s), { recursive: true });
  }
  fs.mkdirSync(vidSectionDir('intro'), { recursive: true });
  fs.mkdirSync(vidSectionDir('campus'), { recursive: true });
}

const media = [
  // Home hero slides
  { name: 'home/hero-1.jpg', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=85' },
  { name: 'home/hero-2.jpg', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=85' },
  { name: 'home/hero-3.jpg', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=85' },
  // About
  { name: 'about/campus-1.jpg', url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900&q=85' },
  { name: 'about/leadership.jpg', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85' },
  // Admissions
  { name: 'admissions/admissions-1.jpg', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=85' },
  // Academics
  { name: 'academics/library.jpg', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=85' },
  { name: 'academics/lecture.jpg', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85' },
  // Student life
  { name: 'student-life/sports-1.jpg', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85' },
  { name: 'student-life/clubs.jpg', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85' },
  { name: 'student-life/housing.jpg', url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=85' },
  // News
  { name: 'news/news-1.jpg', url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85' },
  // Campus generic
  { name: 'campus/campus-1.jpg', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=85' },
  { name: 'campus/campus-2.jpg', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=85' },
  { name: 'campus/campus-3.jpg', url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=900&q=85' },
  // Intro video (campus tour)
  { name: 'videos/intro/campus-intro.mp4', url: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4', isVideo: true }
];

// Map a media item name to a full path under the appropriate top-level folder.
// Images live in images/{section}/..., videos in videos/{section}/...
function resolvePath(item) {
  if (item.isVideo) {
    // name is e.g. 'videos/intro/campus-intro.mp4'
    const rel = item.name.replace(/^videos\//, '');
    return path.join(baseDir, 'videos', rel);
  }
  // name is e.g. 'home/hero-1.jpg' -> images/home/hero-1.jpg
  return path.join(baseDir, 'images', item.name);
}

function download(item) {
  return new Promise(resolve => {
    const filePath = resolvePath(item);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const file = fs.createWriteStream(filePath);
    https.get(item.url, { timeout: 60000 }, res => {
      if (res.statusCode !== 200) {
        console.error('Failed: ' + item.name + ' HTTP ' + res.statusCode);
        file.close();
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('OK: ' + item.name);
        resolve(true);
      });
    }).on('error', err => {
      console.error('ERR: ' + item.name + ' - ' + err.message);
      resolve(false);
    });
  });
}

async function main() {
  await ensureDirs();
  console.log('Downloading media into ' + baseDir + ' ...');
  let ok = 0;
  for (const item of media) {
    const pathToCheck = resolvePath(item);
    if (fs.existsSync(pathToCheck)) {
      console.log('SKIP (exists): ' + item.name);
      ok++;
      continue;
    }
    const success = await download(item);
    if (success) ok++;
  }
  console.log('Media download complete! ' + ok + '/' + media.length + ' files present locally.');
}

main();
