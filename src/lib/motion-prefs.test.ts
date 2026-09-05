import { describe, expect, it } from 'vitest'
import { isSoftwareRenderer, resolveHeroMode, shouldRender3D, type MotionEnv } from './motion-prefs'

describe('isSoftwareRenderer', () => {
  it('reconhece renderizadores por software', () => {
    expect(isSoftwareRenderer('Google SwiftShader')).toBe(true)
    expect(isSoftwareRenderer('ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)')).toBe(true)
    expect(isSoftwareRenderer('Mesa/X.org, llvmpipe (LLVM 15.0.7, 256 bits)')).toBe(true)
  })
  it('aceita GPUs reais', () => {
    expect(isSoftwareRenderer('ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0)')).toBe(false)
    expect(isSoftwareRenderer('Apple GPU')).toBe(false)
    expect(isSoftwareRenderer('Adreno (TM) 730')).toBe(false)
    expect(isSoftwareRenderer('')).toBe(false)
  })
})

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
