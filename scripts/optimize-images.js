import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const backupDir = path.join(__dirname, '../src/assets-backup');

// Erstelle Backup-Ordner falls nicht vorhanden
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const nameWithoutExt = path.basename(fileName, ext);
  
  console.log(`Optimizing: ${fileName}...`);
  
  try {
    // Backup erstellen
    const backupPath = path.join(backupDir, fileName);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`  ✓ Backup erstellt: ${fileName}`);
    }
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Für PNG: Konvertiere zu WebP mit hoher Qualität (85%)
    // Für JPG: Komprimiere mit Qualität 85%
    if (ext === '.png') {
      const outputPath = path.join(path.dirname(filePath), `${nameWithoutExt}.webp`);
      await image
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      
      // Original PNG löschen und durch WebP ersetzen
      fs.unlinkSync(filePath);
      console.log(`  ✓ PNG → WebP: ${fileName} → ${nameWithoutExt}.webp`);
      
      return { original: fileName, optimized: `${nameWithoutExt}.webp`, format: 'webp' };
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Temporäre Datei für Output verwenden
      const tempPath = path.join(path.dirname(filePath), `${nameWithoutExt}.tmp`);
      await image
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(tempPath);
      
      // Alte Datei löschen und temporäre Datei umbenennen
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      const stats = fs.statSync(filePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`  ✓ JPG komprimiert: ${fileName} (${sizeMB}MB)`);
      
      return { original: fileName, optimized: fileName, format: 'jpg' };
    }
  } catch (error) {
    console.error(`  ✗ Fehler bei ${fileName}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starte Bildoptimierung...\n');
  
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );
  
  console.log(`Gefundene Bilder: ${imageFiles.length}\n`);
  
  const results = [];
  
  for (const file of imageFiles) {
    const filePath = path.join(assetsDir, file);
    const result = await optimizeImage(filePath);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n✅ Optimierung abgeschlossen!\n');
  console.log('Zusammenfassung:');
  results.forEach(r => {
    console.log(`  - ${r.original} → ${r.optimized} (${r.format})`);
  });
  
  console.log(`\n📦 Originale gesichert in: ${backupDir}`);
}

optimizeAllImages().catch(console.error);

