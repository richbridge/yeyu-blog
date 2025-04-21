'use client'

import { motion, useScroll } from 'motion/react'

type HexChar =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'

type SixDigitHex =
  `#${HexChar}${HexChar}${HexChar}${HexChar}${HexChar}${HexChar}`

export default function ScrollIndicator({
  backgroundColor = `#7886C7`,
}: {
  backgroundColor?: SixDigitHex
}) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 11,
        originX: 0,
        backgroundColor,
        zIndex: 10,
      }}
    />
  )
}
