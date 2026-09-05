import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

// Converte o material bruto do cliente (media-src/) para public/ (spec seção 10).
const PHOTO_SRC = 'media-src/photos'
const PHOTO_OUT = 'public/photos'
const VIDEO_SRC = 'media-src/videos'
const VIDEO_OUT = 'public/videos'

mkdirSync(PHOTO_OUT, { recursive: true })
mkdirSync(VIDEO_OUT, { recursive: true })

if (existsSync(PHOTO_SRC)) {
  for (const file of readdirSync(PHOTO_SRC)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
    const name = basename(file, extname(file))
    await sharp(join(PHOTO_SRC, file))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(PHOTO_OUT, `${name}.webp`))
    console.log(`foto: ${PHOTO_OUT}/${name}.webp`)
  }
}

function hasFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

if (existsSync(VIDEO_SRC)) {
  const videos = readdirSync(VIDEO_SRC).filter((f) => /\.(mp4|mov|m4v)$/i.test(f))
  if (videos.length > 0 && !hasFfmpeg()) {
    console.warn('ffmpeg não encontrado. Instale com `sudo apt install ffmpeg` e rode de novo.')
  } else {
    for (const file of videos) {
      const name = basename(file, extname(file))
      const input = join(VIDEO_SRC, file)
      // Até 12 s, sem áudio, 1280px de largura.
      const common = ['-y', '-i', input, '-t', '12', '-an', '-vf', 'scale=1280:-2:flags=lanczos']
      execFileSync(
        'ffmpeg',
        [...common, '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-movflags', '+faststart', '-pix_fmt', 'yuv420p', join(VIDEO_OUT, `${name}.mp4`)],
        { stdio: 'inherit' },
      )
      execFileSync(
        'ffmpeg',
        [...common, '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', join(VIDEO_OUT, `${name}.webm`)],
        { stdio: 'inherit' },
      )
      const framePng = join(VIDEO_OUT, `${name}.png`)
      execFileSync('ffmpeg', ['-y', '-i', input, '-frames:v', '1', '-vf', 'scale=1280:-2', framePng], { stdio: 'inherit' })
      await sharp(framePng).webp({ quality: 78 }).toFile(join(VIDEO_OUT, `${name}.webp`))
      rmSync(framePng)
      console.log(`vídeo: ${VIDEO_OUT}/${name}.mp4, .webm e poster .webp`)
    }
  }
}
