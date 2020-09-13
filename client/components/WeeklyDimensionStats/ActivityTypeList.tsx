import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import { LIST_ACTIVITY_TYPES_WITH_ATTRIBUTE } from '../../apollo/queries'

import {
  ListActivityTypesWithAttribute,
  ListActivityTypesWithAttribute_listActivityTypes as ActivityType,
} from '../../apollo/types/ListActivityTypesWithAttribute'

import Box from '../../system/Box'

const ActivityTypeList: React.FC<{ attributeName: string }> = ({ attributeName }) => {
  const { data }: { data: ListActivityTypesWithAttribute | undefined } = useQuery(LIST_ACTIVITY_TYPES_WITH_ATTRIBUTE, { variables: { attributeName } })

  if (!data) return null

  const { listActivityTypes }: { listActivityTypes: ActivityType[] } = data


  console.log(listActivityTypes)
  return <Box>
    {listActivityTypes.map(({ name, attributeValue }: ActivityType) => (
      <div>{name} ({attributeValue})</div>
    ))}
  </Box>
}

export default ActivityTypeList
