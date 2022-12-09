import { distance } from '@popmotion/popcorn'
import { Point } from 'framer-motion'

export function isColliding(source: Point, sample: Point): boolean {
  return distance(source, sample) < 45
}

export type MergedPointAndPosition = Position & Point

export type Position = {
  width: number
  height: number
  x: number
  y: number
}

export function getPosition(position: Position, point: Point): Point {
  return {
    x: point.x - position.width / 2,
    y: point.y - position.height / 2,
  }
}
