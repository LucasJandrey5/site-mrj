export interface MotionEnv {
  reducedMotion: boolean
  webgl: boolean
  hardwareConcurrency: number
  isMobile: boolean
}

export type HeroMode = '3d' | 'static'

/** Regra da spec (seção 8): sem reduced motion, com WebGL, e celular só se tiver mais de 4 núcleos. */
export function shouldRender3D(env: MotionEnv): boolean {
  if (env.reducedMotion) return false
  if (!env.webgl) return false
  if (env.isMobile && env.hardwareConcurrency <= 4) return false
  return true
}

/** `?hero=3d` e `?hero=static` forçam o modo (usado pelo script de captura e pelos testes). */
export function resolveHeroMode(search: string, env: MotionEnv): HeroMode {
  const forced = new URLSearchParams(search).get('hero')
  if (forced === '3d') return '3d'
  if (forced === 'static') return 'static'
  return shouldRender3D(env) ? '3d' : 'static'
}

/** Renderizadores por software (SwiftShader, llvmpipe, Mesa offscreen) travam a thread principal: tratar como sem WebGL. */
export function isSoftwareRenderer(renderer: string): boolean {
  return /swiftshader|llvmpipe|softpipe|software|mesa offscreen|microsoft basic render/i.test(renderer)
}

function hasWebGL(win: Window): boolean {
  try {
    const canvas = win.document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    return !isSoftwareRenderer(renderer)
  } catch {
    return false
  }
}

/** Só chamar no cliente (dentro de useEffect ou de um snapshot de useSyncExternalStore). */
export function readMotionEnv(win: Window): MotionEnv {
  const nav = win.navigator
  return {
    reducedMotion: win.matchMedia('(prefers-reduced-motion: reduce)').matches,
    webgl: hasWebGL(win),
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    isMobile: win.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|Mobi/i.test(nav.userAgent),
  }
}
