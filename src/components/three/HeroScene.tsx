'use client'

import { Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { RefObject } from 'react'
import { ControllerModel } from './ControllerModel'

/** Canvas do hero: luzes + Environment com Lightformers (sem HDRI externo), pausado fora da tela. */
export function HeroScene({ progress, active }: { progress: RefObject<number>; active: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0.3, 6.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#5b93e6" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.5} position={[0, 4, -4]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#2a6fd6" position={[-5, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[4, 4, 1]} />
          <Lightformer form="circle" intensity={1} position={[5, 2, 3]} scale={3} />
        </Environment>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <ControllerModel progress={progress} />
        </Float>
      </Canvas>
    </div>
  )
}
