import { describe, expect, it } from 'vitest'
import { resolveHeroMode, shouldRender3D, type MotionEnv } from './motion-prefs'

const desktop: MotionEnv = { reducedMotion: false, webgl: true, hardwareConcurrency: 8, isMobile: false }

describe('shouldRender3D', () => {
  it('desktop com WebGL e sem reduced motion renderiza 3D', () => {
    expect(shouldRender3D(desktop)).toBe(true)
  })
  it('reduced motion desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, reducedMotion: true })).toBe(false)
  })
  it('sem WebGL desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, webgl: false })).toBe(false)
  })
  it('celular fraco (até 4 núcleos) desliga o 3D', () => {
    expect(shouldRender3D({ ...desktop, isMobile: true, hardwareConcurrency: 4 })).toBe(false)
  })
  it('celular forte mantém o 3D', () => {
    expect(shouldRender3D({ ...desktop, isMobile: true, hardwareConcurrency: 8 })).toBe(true)
  })
})

describe('resolveHeroMode', () => {
  it('?hero=3d força o 3D mesmo com reduced motion', () => {
    expect(resolveHeroMode('?hero=3d', { ...desktop, reducedMotion: true })).toBe('3d')
  })
  it('?hero=static força a imagem', () => {
    expect(resolveHeroMode('?hero=static', desktop)).toBe('static')
  })
  it('sem parâmetro segue o ambiente', () => {
    expect(resolveHeroMode('', desktop)).toBe('3d')
    expect(resolveHeroMode('', { ...desktop, webgl: false })).toBe('static')
  })
})
