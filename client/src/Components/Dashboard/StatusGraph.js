import React from 'react'
import {Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js'
import {Doughnut} from "react-chartjs-2"

ChartJS.register(ArcElement,Tooltip,Legend)


const StatusGraph = () => {
    const data={
        labels:[],
        datasets:[
            {
            label:'poll',data:[6],
            backgroundColor:['#3578FF'],
            borderColor:['#3578FF'],
            circumference:270
            },
            {
                label:'poll',data:[6],
                backgroundColor:['#FF7B0A'],
                borderColor:['#FF7B0A'],
                circumference:300

            },
            {
                label:'poll',data:[6],
                backgroundColor:['#FFCB01'],
                borderColor:['#FFCB01'],
                circumference:315

            },

    ]
    }
    const options={
        // cutout:'85%',
        // radius:5,
        responsive:true,
        plugins:{
        legend:{
            display:false
        }
    }}
  return (
    <div className='h-[270px] w-[270px] '>
        <Doughnut  data={data} options={options}></Doughnut>
    </div>
  )
}

export default StatusGraph
