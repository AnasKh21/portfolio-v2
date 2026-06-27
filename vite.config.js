import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to copy required assets on build start
const copyAssetsPlugin = () => {
  return {
    name: 'copy-assets',
    buildStart() {
      try {
        const srcPhoto = '/home/anas/portfolio/anas-portfolio/public/images/anas.jpg';
        const destPhoto = '/home/anas/portfolio/portfolio-v2/public/anas_photo.jpeg';
        const srcCv = '/home/anas/portfolio/portfolio-v2/Anas_KHAYAR_FR_CV.pdf';
        const destCv = '/home/anas/portfolio/portfolio-v2/public/Anas_KHAYAR_FR_CV.pdf';

        // Ensure target directory exists
        const destDir = path.dirname(destPhoto);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        if (fs.existsSync(srcPhoto)) {
          fs.copyFileSync(srcPhoto, destPhoto);
          console.log('Copied photo successfully');
        } else {
          console.error('Source photo does not exist:', srcPhoto);
        }

        if (fs.existsSync(srcCv)) {
          fs.copyFileSync(srcCv, destCv);
          console.log('Copied CV successfully');
        } else {
          console.error('Source CV does not exist:', srcCv);
        }
      } catch (err) {
        console.error('Error copying assets:', err);
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyAssetsPlugin()],
})
