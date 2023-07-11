import React from 'react'

import Button from '../../shared/components/FormElements/Button'

const ChartItem = (props) => {
  return (
    <React.Fragment>
      <th>{props.id}</th>
      <td>{props.name}</td>
      <td>{props.address}</td>
      <td>{props.birthday}</td>
      <td>{props.checksDate}</td>
      <td>
        <Button>알림 전송</Button>
      </td>
    </React.Fragment>
  )
}

export default ChartItem
