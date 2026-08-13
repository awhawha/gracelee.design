'use client'

import { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

// Mesh-gradient backdrop for the homepage hero panel (fills its relative
// parent; the parent clips the rounded corners). Exported from Paper
// (app.paper.design); WebGL renders client-side only, so a solid placeholder
// in the shader's green holds the space — and keeps the white hero text
// readable — until mount.
export function HeroShader() {
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="absolute inset-0 bg-[#41874E]">
      {mounted && (
        <MeshGradient
          speed={reduced ? 0 : 0.84}
          scale={1}
          distortion={0.19}
          swirl={0}
          frame={1876624.6409993276}
          grainMixer={0.38}
          grainOverlay={0.1}
          colors={['#E6E4CD', '#41874E', '#D5C32C', '#39CFD3']}
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  )
}
