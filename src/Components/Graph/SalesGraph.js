import React, { useEffect, useState } from 'react'
import ApexCharts from 'apexcharts';
import adminApi from '../../Utils/admin-axios'



function SalesGraph() {
  
  const [date,setDate] = useState([]);
  const [salesPerDay,setSalesPerDay] = useState([]);
  const [profitPerDay,setProfitPerDay] =  useState([]); 
  const [salesPerweek,setSalesPerWeek] = useState()

  const getorderData = async () => {
    try {
      const response = await adminApi.get('/admin/get-sales-info');
      if (response.data.success) {
        setDate(response.data.date);
        setSalesPerDay(response.data.totalSalesPerDay);
        setProfitPerDay(response.data.totalProfitPerDay);
        setSalesPerWeek(response.data.totalSalesprevSevenDays);
        let options = {
  
          xaxis: {
            show: true,
            categories:  response.data.date || date,
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
              }
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },   
          yaxis: {
            show: true,
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
              },
              formatter: function (value) {
                return '₹ ' + value;
              }
            }
          },
          series: [
            {
              name: "Sales", 
              data: response.data.totalSalesPerDay || salesPerDay,
              color: "#1A56DB",
            },
            {
              name: "Profit",
              data: response.data.totalProfitPerDay  || profitPerDay,
              color: "#7E3BF2",
            },
          ],
          chart: {
            sparkline: {
              enabled: false
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            enabled: true,
            x: {
              show: false,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.55,
              opacityTo: 0,
              shade: "#1C64F2",
              gradientToColors: ["#1C64F2"],
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 6,
          }, 
          legend: {   
            show: false
          },
          grid: {
            show: false,
          },
        };
    
        if (document.getElementById("labels-chart") && typeof ApexCharts !== 'undefined') {
          const chart = new ApexCharts(document.getElementById("labels-chart"), options);
          chart.render();
        }




      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getorderData()
  }, [])
              
  console.log(date);
  console.log(salesPerDay);
  console.log(profitPerDay);




  return (
    <>
      <div className="  w-full  bg-white  shadow  dark:bg-gray-900">
        <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2"> ₹ {salesPerweek}</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales Prev Seven Days </p>
          </div>
   
        </div>
        <div id="labels-chart" className="px-2.5"></div>
        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
        
        </div>
      </div>
    </>
  )
}

export default SalesGraph
