import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@apollo/react-hooks';

import {
  LIST_ACTIVITY_TYPES,
  LIST_ACTIVITY_TYPE_ATTRIBUTES,
} from '../../apollo/queries'

import {
  ListActivityTypes,
  ListActivityTypes_listActivityTypes as ActivityType,
} from '../../apollo/types/ListActivityTypes'

import {
  ListActivityTypeAttributes,
  ListActivityTypeAttributes_listActivityTypeAttributes as ActivityTypeAttribute,
} from '../../apollo/types/ListActivityTypeAttributes'

import { withApollo } from '../../apollo/withApollo'

import Layout from '../../components/Layout'
import ActivityTypeAttributeForm from '../../components/ActivityTypeAttributeForm'

interface Props {
  activityTypeId: number
}

const ActivityTypeDetails: NextPage<Props> = ({ activityTypeId }) => {
  const {
    loading: activityTypeLoading,
    data: activityTypeData,
  }: {
    loading: boolean,
    data: ListActivityTypes | undefined,
  }= useQuery(
    LIST_ACTIVITY_TYPES,
    { variables: { id: activityTypeId } },
  )

  const {
    loading: activityTypeAttributesLoading,
    data: activityTypeAttributesData,
    refetch,
  }: {
    loading: boolean,
    data: ListActivityTypeAttributes | undefined,
    refetch: () => {},
  } = useQuery(
    LIST_ACTIVITY_TYPE_ATTRIBUTES,
    { variables: { activityTypeId } },
  )

  if (activityTypeLoading || activityTypeAttributesLoading) return <>Loading...</>


  const { listActivityTypes } = activityTypeData || { listActivityTypes: [] }
  if (listActivityTypes === null) return <>Error!</>

  const { name: activityTypeName }: ActivityType = listActivityTypes[0]

  const { listActivityTypeAttributes: activityTypeAttributes }: ListActivityTypeAttributes = activityTypeAttributesData || { listActivityTypeAttributes: [] }

  return <Layout>
    <Link href="/">Home</Link>
    <div>
      {activityTypeName}
    </div>

    <h2>Dimensions</h2>

    {activityTypeAttributes.map(({ id, name, value }: ActivityTypeAttribute) => (
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

const getInitialProps: (ctx: NextPageContext) => Props = ({ query }: NextPageContext) => {
  const { activityTypeId } = query
  return { activityTypeId: parseInt(
    typeof activityTypeId === 'string' ?
    activityTypeId : activityTypeId[0]
  ) }
}

ActivityTypeDetails.getInitialProps = getInitialProps

export default withApollo({ ssr: true })(ActivityTypeDetails)
