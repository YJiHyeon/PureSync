import React from 'react'
import { DatePicker, Button } from 'components/ui'
import  Menu  from 'components/body/menu'
import Exercise from 'components/body/exercise'

const BodyMenu = () => {
    return (
    <>
    <div>BodyMenu</div>
    <DatePicker placeholder="Pick a date" />
    <br />
    <Menu />
    <br /><br /><br />
    <hr />
    <br />
    <Exercise />
    </>
    )
}

export default BodyMenu
