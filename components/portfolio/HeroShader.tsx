'use client'

import { useEffect, useState } from 'react'

import { MeshGradient } from '@paper-design/shaders-react'

const defaultColors = ['#E6E4CD', '#41874E', '#D5C32C', '#39CFD3']

type HeroShaderProps = {
  colors?: string[]
  fallback?: string
}

function canUseWebGL2() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2'))
  } catch {
    return false
  }
}

// Mesh-gradient backdrop. Fills its relative parent. WebGL renders
// client-side only, so a solid fallback holds the space until mount —
// and stays if the GPU context isn't available.
export function HeroShader({
  colors = defaultColors,
  fallback = '#41874E',
}: HeroShaderProps) {
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [webgl, setWebgl] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setWebgl(canUseWebGL2())
  }, [])

  return (
    <div className="absolute inset-0" style={{ backgroundColor: fallback }}>
      {mounted && webgl && (
        <MeshGradient
          speed={reduced ? 0 : 0.84}
          scale={1}
          distortion={0.19}
          swirl={0}
          frame={1876624.6409993276}
          grainMixer={0.38}
          grainOverlay={0.1}
          colors={colors}
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  )
}
