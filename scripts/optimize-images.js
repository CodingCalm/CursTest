import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  try {
    const files = await imagemin(['public/images/*.png'], {
      destination: 'public/images',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 1
        })
      ]
    });

    console.log('Bilder optimerade:', files.map(f => f.destinationPath));
  } catch (error) {
    console.error('Fel vid optimering:', error);
  }
}

optimizeImages();
