import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

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
  const [[width, height], setDims] = useState<[string, string]>(['auto', 'auto'])
  const boxRef = useRef<HTMLDivElement | null>(null)

  const showingDate = new Date(today.getTime() - ((OffsetsToShow - 1 - sliderOffset) * OneDay))

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

  return <Box flex="1" display="flex" flexDirection="column" overflowY="hidden">
    <Box ref={boxRef} display="flex" flex="1" overflowY="hidden" overflowX="hidden">
      <Slider
        display="flex"
        flexDirection="row"
        style={{ transform: `translateX(calc(${width} * -${sliderOffset}))` }}
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
          theme="white"
          onMouseDown={() => { setSliderOffset(sliderOffset - 1) }}
        >
          <FaChevronLeft />
        </Button>
      </Box>
      <Box flex="1"><SearchActivityTypes /></Box>
      <Box>
        <Button
          theme="white"
          onClick={() => { setSliderOffset(sliderOffset + 1) }}
        >
          <FaChevronRight />
        </Button>
      </Box>
    </Box>
  </Box>
}

export default Wrapper
