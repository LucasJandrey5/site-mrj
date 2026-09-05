'use client'

import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, type RefObject } from 'react'
import { MathUtils, type Group } from 'three'

const COLORS = {
  housing: '#1c2230',
  panel: '#e9ecf1',
  screen: '#0f2f4a',
  screenGlow: '#39c0f0',
  pcb: '#0b5b3a',
  copper: '#c98f3c',
  chip: '#141414',
  terminal: '#2f9e6a',
  button: '#3a4252',
  buttonAccent: '#2a6fd6',
  capacitor: '#1f2a44',
} as const

const LED_COLORS = ['#22c55e', '#f59e0b', '#ef4444'] as const
const DISPLAY_LINES = [0.44, 0.32, 0.2, 0.08] as const
const CHIPS: Array<[x: number, y: number, w: number, h: number]> = [
  [-0.6, 0.3, 0.38, 0.38],
  [0.2, 0.38, 0.5, 0.3],
  [0.55, -0.32, 0.3, 0.3],
]
const CAPACITORS: Array<[x: number, y: number]> = [
  [-0.95, -0.42],
  [-0.75, -0.42],
  [-0.55, -0.42],
  [0.95, 0.42],
  [0.95, 0.22],
  [-0.2, -0.45],
]
const TRACES: Array<[x: number, y: number, w: number, h: number]> = [
  [-0.2, 0.05, 0.9, 0.02],
  [0.1, -0.1, 0.02, 0.5],
  [-0.9, 0.05, 0.02, 0.5],
  [0.5, 0.1, 0.4, 0.02],
]

function smoothstep(p: number) {
  return p * p * (3 - 2 * p)
}

/** Controlador de gerador estilizado, em três camadas que se afastam conforme o scroll. */
export function ControllerModel({ progress }: { progress: RefObject<number> }) {
  const root = useRef<Group>(null)
  const front = useRef<Group>(null)
  const back = useRef<Group>(null)

  useFrame((state, delta) => {
    const p = MathUtils.clamp(progress.current, 0, 1)
    const t = state.clock.elapsedTime
    const spread = 0.6 * smoothstep(p)

    if (root.current) {
      const yaw = MathUtils.lerp(-0.35, 0.45, p) + Math.sin(t * 0.4) * 0.04
      const pitch = MathUtils.lerp(0.12, -0.18, p)
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, yaw, 4, delta)
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, pitch, 4, delta)
    }
    if (front.current) front.current.position.z = MathUtils.damp(front.current.position.z, 0.24 + spread, 5, delta)
    if (back.current) back.current.position.z = MathUtils.damp(back.current.position.z, -0.24 - spread, 5, delta)
  })

  return (
    <group ref={root} scale={1.1} rotation={[0.12, -0.35, 0]}>
      {/* Painel frontal: moldura clara, display, teclado e LEDs */}
      <group ref={front} position={[0, 0, 0.24]}>
        <RoundedBox args={[2.6, 1.8, 0.12]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={COLORS.panel} roughness={0.55} metalness={0.05} />
        </RoundedBox>
        <mesh position={[-0.45, 0.25, 0.07]}>
          <boxGeometry args={[1.25, 0.7, 0.02]} />
          <meshStandardMaterial color={COLORS.screen} emissive={COLORS.screenGlow} emissiveIntensity={0.35} roughness={0.3} />
        </mesh>
        {DISPLAY_LINES.map((y, i) => (
          <mesh key={y} position={[-0.62 + i * 0.03, y, 0.085]}>
            <boxGeometry args={[0.72 - i * 0.12, 0.035, 0.005]} />
            <meshStandardMaterial color={COLORS.screenGlow} emissive={COLORS.screenGlow} emissiveIntensity={1.4} />
          </mesh>
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          return (
            <RoundedBox
              key={i}
              args={[0.2, 0.14, 0.05]}
              radius={0.02}
              smoothness={2}
              position={[0.42 + col * 0.26, 0.34 - row * 0.22, 0.085]}
            >
              <meshStandardMaterial color={i === 11 ? COLORS.buttonAccent : COLORS.button} roughness={0.6} />
            </RoundedBox>
          )
        })}
        {LED_COLORS.map((color, i) => (
          <mesh key={color} position={[-1.05 + i * 0.16, -0.62, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      {/* Placa: PCB com CIs, capacitores e trilhas de cobre */}
      <group>
        <mesh>
          <boxGeometry args={[2.4, 1.6, 0.04]} />
          <meshStandardMaterial color={COLORS.pcb} roughness={0.7} />
        </mesh>
        {CHIPS.map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.05]}>
            <boxGeometry args={[w, h, 0.06]} />
            <meshStandardMaterial color={COLORS.chip} roughness={0.4} />
          </mesh>
        ))}
        {CAPACITORS.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.2, 20]} />
            <meshStandardMaterial color={COLORS.capacitor} roughness={0.5} metalness={0.3} />
          </mesh>
        ))}
        {TRACES.map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.025]}>
            <boxGeometry args={[w, h, 0.004]} />
            <meshStandardMaterial color={COLORS.copper} metalness={0.8} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Carcaça traseira com bornes */}
      <group ref={back} position={[0, 0, -0.24]}>
        <RoundedBox args={[2.6, 1.8, 0.36]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={COLORS.housing} roughness={0.5} metalness={0.4} />
        </RoundedBox>
        {Array.from({ length: 10 }, (_, i) => (
          <mesh key={i} position={[-1.1 + i * 0.245, -1.0, 0]}>
            <boxGeometry args={[0.2, 0.22, 0.3]} />
            <meshStandardMaterial color={COLORS.terminal} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
