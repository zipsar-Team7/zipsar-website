import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  'zipsar@init:~$ ./boot.sh',
  '> mounting interfaces        [OK]',
  '> launching zipsar...',
]

const CHAR_DELAY = 28   // ms per character
const LINE_PAUSE = 180  // ms pause between lines
const END_PAUSE  = 700  // ms pause before exit animation

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  // lines fully printed so far
  const [printedLines, setPrintedLines] = useState<string[]>([])
  // the line currently being typed
  const [currentPartial, setCurrentPartial] = useState('')
  // whether we're in the slide-out phase
  const [exiting, setExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0

    const tick = (cb: () => void, delay: number) => {
      const id = window.setTimeout(cb, delay)
      return id
    }

    const typeChar = () => {
      if (cancelled) return
      const line = BOOT_LINES[lineIdx]
      if (charIdx < line.length) {
        charIdx++
        setCurrentPartial(line.slice(0, charIdx))
        tick(typeChar, CHAR_DELAY)
      } else {
        // line done — commit it
        const finished = BOOT_LINES[lineIdx]
        setPrintedLines(prev => [...prev, finished])
        setCurrentPartial('')
        lineIdx++
        if (lineIdx < BOOT_LINES.length) {
          charIdx = 0
          tick(typeChar, LINE_PAUSE)
        } else {
          // all lines printed — wait, then exit
          tick(() => {
            if (cancelled) return
            setExiting(true)
          }, END_PAUSE)
        }
      }
    }

    tick(typeChar, 300)
    return () => { cancelled = true }
  }, [])

  // when exit animation ends, call onComplete
  const handleAnimEnd = () => {
    if (exiting) onComplete()
  }

  return (
    <div
      ref={containerRef}
      className={`terminal-loader${exiting ? ' terminal-loader--exit' : ''}`}
      onAnimationEnd={handleAnimEnd}
    >
      <div className="terminal-window">
        {/* Title bar */}
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: '#FF5F57' }} />
          <span className="terminal-dot" style={{ background: '#FEBC2E' }} />
          <span className="terminal-dot" style={{ background: '#28C840' }} />
          <span className="terminal-bar-title">zipsar — bash</span>
        </div>

        {/* Body */}
        <div className="terminal-body">
          {printedLines.map((line, i) => (
            <div key={i} className="terminal-line terminal-line--done">
              {line.startsWith('>') ? (
                <>
                  <span className="terminal-arrow">{line.slice(0, 1)}</span>
                  <span>{line.slice(1)}</span>
                </>
              ) : (
                <span className="terminal-prompt">{line}</span>
              )}
            </div>
          ))}

          {/* Currently-typing line */}
          {currentPartial !== '' && (
            <div className="terminal-line terminal-line--active">
              {currentPartial.startsWith('>') ? (
                <>
                  <span className="terminal-arrow">{currentPartial.slice(0, 1)}</span>
                  <span>{currentPartial.slice(1)}</span>
                </>
              ) : (
                <span className="terminal-prompt">{currentPartial}</span>
              )}
              <span className="terminal-cursor">█</span>
            </div>
          )}

          {/* Idle cursor when nothing is printing yet */}
          {currentPartial === '' && printedLines.length === 0 && (
            <div className="terminal-line terminal-line--active">
              <span className="terminal-cursor">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
