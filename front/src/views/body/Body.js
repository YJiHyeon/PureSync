import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { DatePicker, Button } from 'components/ui'
import Menu from 'components/body/menu'
import Exercise from 'components/body/exercise'
import Axios from 'axios'
import Summry from 'components/body/summary'

const BodyMenu = () => {

    let today = new Date();
    const toDate = (today)=>{
        //console.log( today );
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        
        if(month<10)
            month = '0'+month;
        if(date<10)
            date = '0'+date;
        
        return year+"-"+month+"-"+date;
    }

    const [selectDate, setSelectDate] = useState(toDate(today));

 
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
                defaultValue={new Date(selectDate)}
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
