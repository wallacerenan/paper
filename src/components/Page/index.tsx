import Item from 'components/Item'
import { useCallback, useRef, useState } from 'react'
import { Container } from './styles'
import { arrayMoveImmutable as move } from 'array-move'
import { Point } from 'framer-motion'
import { isColliding, getPosition, Position } from 'utils'

const initialColors = [...Array(16).keys()].map(
  index => `hsl(${360 * (index * 0.196)}, 60%, 60%)`
)

const Page: React.FC = () => {
  const [items, setItems] = useState(initialColors)

  const positions = useRef<Position[]>([])

  const setPosition = useCallback((index: number, position: Position) => {
    positions.current[index] = position
  }, [])

  const moveItem = (currentIndex: number, currentPoint: Point) => {
    const currentPosition = getPosition(
      positions.current[currentIndex],
      currentPoint
    )

    const collidingIndices = []

    for (
      let positionIndex = 0;
      positionIndex < positions.current.length;
      positionIndex++
    ) {
      if (currentIndex === positionIndex) {
        continue
      }

      const colliding = isColliding(
        currentPosition,
        positions.current[positionIndex]
      )

      if (colliding) {
        collidingIndices.push(positionIndex)
      }
    }

    if (collidingIndices.length > 0) {
      positions.current = move(
        positions.current,
        currentIndex,
        collidingIndices[0]
      )
      setItems(move(items, currentIndex, collidingIndices[0]))
    }
  }

  return (
    <Container>
      {items.map((item, index) => (
        <Item
          key={item}
          index={index}
          moveItem={moveItem}
          setPosition={setPosition}
          color={item}
        />
      ))}
    </Container>
  )
}

export default Page
