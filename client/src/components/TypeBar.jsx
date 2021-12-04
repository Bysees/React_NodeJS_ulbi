import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'

const TypeBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <ListGroup as='ul'>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        as='li'
        active={!device.selectedType?.id}
        onClick={() => device.setSelectedType({})}>
        Вся техника
      </ListGroup.Item>
      {device.types.map((type) => {
        return (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            key={type.id}
            as='li'
            active={device.selectedType.id === type.id}
            onClick={() => device.setSelectedType(type)}>
            {type.name}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
})

export default TypeBar
