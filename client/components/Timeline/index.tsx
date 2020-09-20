import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { useSwipeable } from 'react-swipeable'

import styled from 'styled-components'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import SyncActivityContext from '../../contexts/SyncActivityContext'

import Timeline from './Timeline'
import SearchActivityTypes from '../SearchActivityTypes'

import Box from '../../system/Box'
import Button from '../../system/Button'

const Slider = styled(Box)`
  transition: transform 750ms;
`

const OffsetsToShow: number = 365

const shouldShowOffset: (offset: number, sliderOffset: number) => boolean =
  (offset, sliderOffset) => (
    offset >= sliderOffset - 2 &&
    offset <= sliderOffset + 2
  )

const OneDay = 1000 * 60 * 60 * 24

const DaysVisibleAfterToday = 100

const Wrapper: React.FC<{}> = () => {
  const { setDateForRecording } = useContext(SyncActivityContext)
  const today = new Date()
  const [sliderOffset, setSliderOffset] = React.useState<number>(OffsetsToShow - 1 - DaysVisibleAfterToday)
  const isSwiping = React.useRef<boolean>(false)
  const [[width, height], setDims] = useState<[string, string]>(['100vw', 'auto'])
  const boxRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const showingDate = new Date(today.getTime() - ((OffsetsToShow - 1 - sliderOffset - DaysVisibleAfterToday) * OneDay))

  useEffect(() => {
    setDateForRecording(showingDate)
  }, [sliderOffset])

  useLayoutEffect(() => {
    const listener = () => {
      const { current: boxElement } = boxRef
      if (boxElement === null) return
      setDims([
        boxElement.offsetWidth.toString() + 'px',
        boxElement.offsetHeight.toString() + 'px',
      ])
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

  const throttledAnimateSlide: (deltaX: number, override?: boolean) => void = (deltaX, override = false) => {
    if (sliderRef.current === null) return
    if (isSwiping.current === true || override === true) {
      sliderRef.current.style.transform = `translateX(calc(${width} * -${sliderOffset} - ${deltaX}px))`
    }
  }

  const swipeHandlers = useSwipeable({
    onSwiping: ({ event, deltaX, dir, velocity }) => {
      if (velocity < 0.3) return
      if (dir !== 'Left' && dir !== 'Right') return
      event.preventDefault()
      isSwiping.current = true
      throttledAnimateSlide(deltaX)
    },
    onSwiped: ({ event, dir, deltaX, velocity }) => {
      if (!isSwiping.current === true) return
      if (dir !== 'Left' && dir !== 'Right') return
      event.preventDefault()
      const absDeltaX = Math.abs(deltaX)
      const passedMovementThreshold = absDeltaX > parseInt(width) / 3
      const passedVelocityThreshold = velocity > .7
      const sliderOffsetChange = Math.ceil(velocity / 1.25) * (deltaX > 0 ? 1 : -1)

      isSwiping.current = false

      if (passedMovementThreshold || passedVelocityThreshold) {
        setSliderOffset(sliderOffset + sliderOffsetChange)
      } else {
        throttledAnimateSlide(0, true)
      }
    },
    trackMouse: true,
  })

  const { ref: onRef } = swipeHandlers

  const ourOnRef: (el: HTMLDivElement) => void = el => {
    sliderRef.current = el
    onRef(el)
  }

  return <Box flex="1" display="flex" flexDirection="column" overflowY="hidden">
    <Box ref={boxRef} display="flex" flex="1" overflowY="hidden" overflowX="hidden">
      <Slider
        display="flex"
        flexDirection="row"
        style={{ transform: `translateX(calc(${width} * -${sliderOffset})` }}
        {...swipeHandlers}
        ref={ourOnRef}
      >
        {offsets.map((offset) => (
          <Box overflowY="auto" width={width} height={height} key={`swipable-view-${offset}`}>
            {shouldShowOffset(offset, offsets[sliderOffset]) && (
              <Timeline key={`timeline-offset-${offset}`} date={new Date(today.getTime() - ((offset - DaysVisibleAfterToday) * OneDay))} />
            )}
          </Box>
        ))}
      </Slider>
    </Box>

    <Box padding="0 10px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Box>
        <Button
          theme="borderless"
          onMouseDown={() => { setSliderOffset(sliderOffset - 1) }}
        >
          <FaChevronLeft />
        </Button>
      </Box>
      <Box flex="1"><SearchActivityTypes /></Box>
      <Box>
        <Button
          theme="borderless"
          onClick={() => { setSliderOffset(sliderOffset + 1) }}
        >
          <FaChevronRight />
        </Button>
      </Box>
    </Box>
  </Box>
}

export default Wrapper
