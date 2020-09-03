import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';

import {
  LIST_ACTIVITY_TYPES,
  LIST_ACTIVITY_TYPE_ATTRIBUTES,
} from '../../apollo/queries'

import withData from '../../apollo/withData'

import Layout from '../../components/Layout'
import ActivityTypeAttributeForm from '../../components/ActivityTypeAttributeForm'

import Box from '../../system/Box'

enum View {
  Timeline = 0,
  Add,
  Trends,
}

const ActivityTypeDetails: React.FC<{ activityTypeId }> = ({ url: { query: { activityTypeId } } }) => {
  const {
    loading: activityTypeLoading,
    data: activityTypeData,
  } = useQuery(
    LIST_ACTIVITY_TYPES,
    { variables: { id: activityTypeId } },
  )

  const {
    loading: activityTypeAttributesLoading,
    data: activityTypeAttributesData,
    refetch,
  } = useQuery(
    LIST_ACTIVITY_TYPE_ATTRIBUTES,
    { variables: { activityTypeId } },
  )

  if (activityTypeLoading || activityTypeAttributesLoading) return "Loading..."

  const { listActivityTypes } = activityTypeData
  const { name: activityTypeName } = listActivityTypes[0]

  const { listActivityTypeAttributes: activityTypeAttributes } = activityTypeAttributesData

  return <Layout>
    <Link href="/">Home</Link>
    <div>
      {activityTypeName}
    </div>

    <h2>Dimensions</h2>

    {activityTypeAttributes.map(({ id, name, value }) => (
      <ActivityTypeAttributeForm
        activityTypeId={activityTypeId}
        id={id}
        name={name}
        value={value}
        onSubmit={() => refetch()}
      />
    ))}

    <hr />

    <h2>Add new dimension</h2>
    <ActivityTypeAttributeForm
      activityTypeId={activityTypeId}
      onSubmit={() => refetch()}
    />
  </Layout>
}

export default withData(ActivityTypeDetails)
