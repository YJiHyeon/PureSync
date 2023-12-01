import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { DatePicker, Button } from 'components/ui'
import Menu from 'components/body/menu'
import Exercise from 'components/body/exercise'
import Axios from 'axios'
import Summry from 'components/body/summary'

const BodyMenu = () => {

    let today = new Date();
    const [selectDate, setSelectDate] = useState(today);


    useEffect(()=>{
        setSelectDate(today);

    }, []);

    const DatePickerClick = (date) => {
        setSelectDate(date);
    }

    return (
        <>
            <DatePicker
                DatePickerClick={DatePickerClick}
                placeholder={selectDate}
                defaultValue={selectDate}
            />
            <br />
            <Menu selectDate={selectDate} />
            <br /><br /><br />
            <hr />
            <br />
            <Exercise selectDate={selectDate} />
            <br />
            <hr />
            <br />
            <Summry selectDate={selectDate} />
        </>
    )
}

export default BodyMenu
