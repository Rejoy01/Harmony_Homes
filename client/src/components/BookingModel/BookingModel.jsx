import React, { useState } from 'react'
import { Modal, Button } from '@mantine/core'

import {DatePicker} from '@mantine/dates'
const BookingModel = ({opened,setOpened,email,propertyId}) => {
    const [value,setValue] = useState(null)
  return (
   <Modal
    opened = {opened}
    onClose={()=>setOpened(false)}
    title="Select you date of visit"
    centered
   >
    <div className="flexColCenter">
        <DatePicker onChange={setValue} value={value} minDate={new Date()} />
        <Button disabled={!value}>
            Book Visit
        </Button>
    </div>
   </Modal>
  )
}

export default BookingModel
