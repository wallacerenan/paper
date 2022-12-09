import { Point } from 'framer-motion'
import { useMeasurePosition } from 'hooks/useMeasurePosition'
import { useState } from 'react'
import { Position } from 'utils'
import { Container } from './styles'

const onTop = { zIndex: 1 }
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
}

type Props = {
  index: number
  setPosition: (index: number, position: Position) => void
  moveItem: (currentIndex: number, currentPoint: Point) => void
  color: string
}

const Item: React.FC<Props> = ({
  children,
  index,
  setPosition,
  moveItem,
  color,
}) => {
  const [dragging, setDragging] = useState(false)

  const ref = useMeasurePosition(pos => setPosition(index, pos))

  return (
    <Container
      drag
      ref={ref}
      layoutId={color}
      animate={dragging ? onTop : flat}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={1}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      onDragStart={() => {
        setDragging(true)
      }}
      onDragEnd={() => {
        setDragging(false)
      }}
      onDrag={(_, info) => {
        if (dragging) {
          moveItem(index, info.point)
        }
      }}
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </Container>
  )
}

export default Item
