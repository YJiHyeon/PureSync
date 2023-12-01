import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'

const SummaryChart = (props) => {
    const data = [
        {
            name: '섭취 칼로리',
            data: [props.totalMenuKcal],
        },
        {
            name: '소모 칼로리',
            data: [props.exerciseTotal],
        },

    ]
    const toDate = (today)=>{
 
        let year = today.getFullYear();
         let month = today.getMonth() + 1;
         let date = today.getDate();
         
         if(month<10)
             month = '0'+month;
         if(date<10)
             date = '0'+date;
         
         return year+"-"+month+"-"+date;
     }

    return (
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [toDate(props.selectDate)], // 오늘 날짜
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} kcal`,
                    },
                },
            }}
            series={data}
            height={300}
            width={800}
            type="bar"
        />
    )
}

export default SummaryChart
