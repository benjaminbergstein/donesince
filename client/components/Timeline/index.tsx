import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import SwipeableViews from 'react-swipeable-views';

import SyncActivityContext from '../../contexts/SyncActivityContext'

import Timeline from './Timeline'
import SearchActivityTypes from '../SearchActivityTypes'

import Box from '../../system/Box'

const OffsetsToShow: number = 365

const shouldShowOffset: (offset: number, showingOffset: number) => boolean =
  (offset, showingOffset) => (
    offset >= showingOffset - 1 &&
    offset <= showingOffset + 1
  )

const OneDay = 1000 * 60 * 60 * 24

const Wrapper: React.FC<{}> = () => {
  const { setDateForRecording } = useContext(SyncActivityContext)
  const today = new Date()
  const [showingOffset, setShowingOffset] = React.useState<number>(OffsetsToShow - 1)
  const [height, setHeight] = useState<string>('auto')
  const boxRef = useRef<HTMLDivElement | null>(null)

  const showingDate = new Date(today.getTime() - ((OffsetsToShow - 1 - showingOffset) * OneDay))

  useEffect(() => {
    setDateForRecording(showingDate)
  }, [showingOffset])

  useLayoutEffect(() => {
    const listener = () => {
      const { current: boxElement } = boxRef
      if (boxElement === null) return
      setHeight(boxElement.offsetHeight.toString() + 'px')
    }

    listener()
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  const offsets = Array(OffsetsToShow).fill(OffsetsToShow).map(
    (_, i)  => OffsetsToShow - i - 1
  )

  return <Box flex="1" display="flex" flexDirection="column" overflowY="hidden">
    <SearchActivityTypes />

    <Box ref={boxRef} display="flex" flex="1" overflowY="hidden">
      <SwipeableViews
        index={offsets.length - 1}
        enableMouseEvents={true}
        onSwitching={(index) => { setShowingOffset(Math.ceil(index)) }}
      >
        {offsets.map((offset) => (
          <Box key={`swipable-view-${offset}`} height={height} overflowY="scroll" overflowX="hidden">
            {shouldShowOffset(offset, offsets[showingOffset]) && (
              <Timeline key={`timeline-offset-${offset}`} date={new Date(today.getTime() - (offset * OneDay))} />
            )}
          </Box>
        ))}
      </SwipeableViews>
    </Box>
  </Box>
}

export default Wrapper
