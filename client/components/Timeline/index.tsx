import React from 'react'

import SwipeableViews from 'react-swipeable-views';
import Timeline from './Timeline'
import SearchActivityTypes from '../SearchActivityTypes'

const OffsetsToShow: number = 20

const shouldShowOffset: (offset: number, showingOffset: number) => boolean =
  (offset, showingOffset) => (
    offset >= showingOffset - 1 &&
    offset <= showingOffset + 1
  )

const Wrapper: React.FC<{}> = () => {
  const [showingOffset, setShowingOffset] = React.useState<number>(OffsetsToShow - 1)

  const offsets = Array(OffsetsToShow).fill(OffsetsToShow).map(
    (_, i)  => OffsetsToShow - i - 1
  )

  return <>
    <SearchActivityTypes />

    <SwipeableViews
      index={offsets.length - 1}
      enableMouseEvents={true}
      onSwitching={(index) => { setShowingOffset(Math.ceil(index)) }}
    >
      {offsets.map((offset) => (
        <>
          {shouldShowOffset(offset, offsets[showingOffset]) && (
            <Timeline key={`timeline-offset-${offset}`} offset={offset} />
          )}
        </>
      ))}
    </SwipeableViews>
  </>
}

export default Wrapper
