import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';

import { LIST_ACTIVITY_TYPES_WITH_ATTRIBUTE } from '../../apollo/queries'

import {
  ListActivityTypesWithAttribute,
  ListActivityTypesWithAttribute_listActivityTypes as ActivityTypes,
} from '../../apollo/types/ListActivityTypesWithAttribute'

import Box from '../../system/Box'

const ActivityTypeList: React.FC<{ attributeName: string }> = ({ attributeName }) => {
  const { data }: { data: ListActivityTypesWithAttribute } = useQuery(LIST_ACTIVITY_TYPES_WITH_ATTRIBUTE, { variables: { attributeName } })
  const { listActivityTypes }: { listActivityTypes: ActivityTypes } = data || {}

  if (!listActivityTypes) return null

  return <Box>
    {listActivityTypes.map(({ name, attributeValue }) => (
      <div>{name} ({attributeValue})</div>
    ))}
  </Box>
}

export default ActivityTypeList
