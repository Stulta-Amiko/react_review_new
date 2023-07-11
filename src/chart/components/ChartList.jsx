import React from 'react'

import ChartItem from './ChartItem'

const ChartList = (props) => {
  return (
    <tbody>
      {props.items.map((client) => (
        <tr>
          <ChartItem
            id={client.id}
            name={client.name}
            address={client.address}
            birthday={client.birthday}
            checksDate={client.checksDate}
          />
        </tr>
      ))}
    </tbody>
  )
}

export default ChartList
