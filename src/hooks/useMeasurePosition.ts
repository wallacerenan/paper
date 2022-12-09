import { useEffect, useRef } from 'react'
import { Position } from 'utils'

function getBoundsWithoutTransform(element: HTMLElement): DOMRect {
  const transform = element.style.transform
  element.style.transform = ''
  const bounds = element.getBoundingClientRect()
  element.style.transform = transform
  return bounds
}

function getBox(node: HTMLElement): Position {
  const bounds = getBoundsWithoutTransform(node)

  return {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
  }
}

export function useMeasurePosition(update: (position: Position) => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    update(getBox(ref.current as HTMLDivElement))
  })

  return ref
}
