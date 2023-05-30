import React, { useEffect, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJs, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip, ArcElement, PointElement, LineElement, Filler } from 'chart.js'
import axios from 'axios'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
    ChartDataLabels,
)

export const BarChart = (props) => {
    console.log("🚀 ~ file: index.js ~ line 23 ~ BarChart ~ data", props.data)
    const { data } = props
    const [chartData, setChartData] = useState({
        datasets: []
    })
    const [cinema, setCinema] = useState([])
    console.log("🚀 ~ file: index.js ~ line 21 ~ BarChart ~ cinema", cinema)
    const fetchCinema = () => {
        axios({
            url: `http://localhost:7000/api/v1/sale/find-all-sale-cinema`,
            method: 'GET'
        })
            .then(res => {
                setCinema(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchCinema()
    }, [])


    const [chartOptions, setChartOptions] = useState({})
    useEffect(() => {
        setChartData({
            labels: data?.map((data) => data.name_cinema),
            datasets: [
                {
                    label: "Available Ticket",
                    data: data?.map((data) => data.total_booking
                    ),
                    backgroundColor: '#0081CF',
                    borderWidth: 1,

                },
            ]
        });
        setChartOptions({
            responsive: true,
            layout: {
                padding: {
                    top: 50
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'top',
                    offset: 1,
                    labels: {
                        title: {
                            font: (context) => {
                                const width = context.chart.width;
                                const size = Math.round(width / 48);

                                return {
                                    family: 'Be Vietnam Pro',
                                    size: size,
                                };
                            },
                        },
                    },
                    formatter: (value, context) => {
                        if ((value) > 0) {
                            const sum = eval(context.dataset.data.join('+'));
                            const percentage = ((value * 100) / sum).toFixed(2) + '%';
                            return `${context.chart.data.labels[context.dataIndex]} \n (${percentage})`;
                        } else {
                            return '';
                        }
                    },
                },

            },
            scales: {
                x: {
                    type: 'category',
                    grid: {
                        color: '#E3E3E3',
                    },
                    ticks: {
                        color: '#717171',
                        font: (context) => {
                            const width = context.chart.width;
                            const size = Math.round(width / 48);
                            return {
                                family: 'Be Vietnam Pro',
                                size: size,
                            };
                        },
                    },

                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#717171',
                        font: (context) => {
                            const width = context.chart.width;
                            const size = Math.round(width / 48);

                            return {
                                family: 'Be Vietnam Pro',
                                size: size,
                            };
                        },
                    },
                },

            },
        })
    }, [cinema, data])
    return (
        <Bar options={chartOptions} data={chartData} />
    )
}

export const LineChart = ({ chartData }) => {
    return (
        <Line data={chartData} />
    )
}

export const PieChart = (props) => {
    const { data } = props
    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({})
    useEffect(() => {
        setChartData({
            labels: data?.map((data) => data.name_cinema),
            datasets: [
                {
                    label: '%',
                    data: data?.map((data) => data.total_price),
                    backgroundColor: [
                        '#FAA613',
                        '#F36B39',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        '#688E26',
                        '#A10702'
                    ],
                    borderWidth: 1
                },

            ]
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            family: 'Be Vietnam Pro',
                            size:
                                typeof window !== 'undefined'
                                    ? window.innerWidth <= 425
                                        ? 10
                                        : window.innerHeight > 425 && window.innerWidth <= 768
                                            ? 16
                                            : window.innerWidth > 768 && window.innerWidth <= 1024
                                                ? 18
                                                : window.innerWidth > 1024 && window.innerWidth <= 1440
                                                    ? 14
                                                    : 16
                                    : 0,
                        },

                    },
                },
                datalabels: {
                    color: 'black',
                    anchor: 'top',
                    labels: {
                        title: {
                            font: (context) => {
                                const width = context.chart.width;
                                const size = Math.round(width / 48);
                                return {
                                    family: 'Be Vietnam Pro',
                                    size: size,
                                };
                            },
                        },
                    },
                    formatter: (value, context) => {
                        if ((value) > 0) {
                            const sum = eval(context.dataset.data.join('+'));
                            const percentage = ((value * 100) / sum).toFixed(2) + '%';
                            return `${context.chart.data.labels[context.dataIndex]} \n (${percentage})`;
                        } else {
                            return '';
                        }
                    },
                },

            },
            scales: {},
        })
    }, [data])
    return (
        <Pie options={chartOptions} data={chartData} />
    )
}