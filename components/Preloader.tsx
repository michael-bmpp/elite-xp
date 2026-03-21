'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const span1Ref = useRef<HTMLSpanElement>(null)
  const span2Ref = useRef<HTMLSpanElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // 1. Bar fill: scaleX 0 → 1
      tl.fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: 'left center' }
      )

      // 2. Wordmark spans: clip-path reveal from below, staggered
      tl.fromTo(
        [span1Ref.current, span2Ref.current],
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0 0 0 0)',
          duration: 0.85,
          ease: 'power4.out',
          stagger: 0.11,
        }
      )

      // 3. Pause
      tl.to({}, { duration: 0.45 })

      // 4. Wordmark exits up
      tl.to(wordmarkRef.current, {
        y: '-100%',
        duration: 0.55,
        ease: 'power3.in',
      })

      // 5. Entire preloader: clip-path exit
      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.85,
        ease: 'power4.inOut',
      })

      // 6. On complete: call onComplete, set display:none
      tl.call(() => {
        onComplete()
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <div className="preloader" ref={containerRef} style={{ clipPath: 'inset(0 0 0 0)' }}>
      <div className="preloader__wordmark" ref={wordmarkRef}>
        <span ref={span1Ref} style={{ clipPath: 'inset(100% 0 0 0)' }}>
          L&rsquo;
        </span>
        <span ref={span2Ref} style={{ clipPath: 'inset(100% 0 0 0)' }}>
          Elite
        </span>
      </div>
      <div className="preloader__bar">
        <div className="preloader__bar-fill" ref={barFillRef} style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
