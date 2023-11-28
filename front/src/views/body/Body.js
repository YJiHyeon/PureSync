import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { DatePicker, Button } from 'components/ui'
import Menu from 'components/body/menu'
import Exercise from 'components/body/exercise'
import Axios from 'axios'

const BodyMenu = () => {

    // 오늘날짜
    let today = new Date();
    
    const [selectDate, setSelectDate] = useState(today);
    const [menuList, setMenuList] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);


    const dataLoad = () => {

        Axios.get(`http://127.0.0.1:9000/api/menu/list?mem_seq=1&menu_date=${selectDate}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((res) => {
                console.log(res);
            })
    }

    const DatePickerClick = (date) => {
        setSelectDate(date);
        dataLoad();
    }

    useEffect(() => {
        console.log("menu에서 useEffect()호출");
        dataLoad();
    }, [menuList], [exerciseList] );

    return (
        <>
            <div>BodyMenu</div>
            <DatePicker placeholder="날짜를 선택하세요" DatePickerClick={DatePickerClick} />
            <br />
            <Menu selectDate={selectDate} />
            <br /><br /><br />
            <hr />
            <br />
            <Exercise selectDate={selectDate} />
        </>
    )
}

export default BodyMenu
