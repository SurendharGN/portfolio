import sharp from 'sharp'
import { readdirSync, statSync, renameSync, unlinkSync, writeFileSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const QUALITY = 75

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

async function main() {
  let total = 0, totalSaved = 0
  for (const file of walk(publicDir)) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue
    const stat = statSync(file)
    if (stat.size < 2e6 && ext !== '.png') continue

    const buf = await sharp(file, { limitInputPixels: false })
      .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true })
      .png({ quality: QUALITY })
      .toBuffer()

    const originalSize = stat.size
    if (buf.length >= originalSize) continue

    const tmp = file + '.tmp'
    writeFileSync(tmp, buf)
    unlinkSync(file)
    renameSync(tmp, file)

    const saved = originalSize - buf.length
    total += originalSize
    totalSaved += saved
    console.log(`${file.replace(publicDir + '\\', '')}: ${(originalSize/1e6).toFixed(1)}MB → ${(buf.length/1e6).toFixed(1)}MB (${(saved/originalSize*100).toFixed(1)}%)`)
  }
  console.log(`\nTotal: ${(total/1e6).toFixed(1)}MB → ${((total-totalSaved)/1e6).toFixed(1)}MB (${(totalSaved/total*100).toFixed(1)}% saved)`)
}

main()
