import { Panel } from "rsuite"
import { CChart } from '@coreui/react-chartjs';

const Dashboard = () => {
    const colors = ["green", "red", "blue", "yellow", "violet"];

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-10 gap-4 max-w-7xl">
                <div className="lg:col-span-6 col-span-10">
                    <Panel header="Connections" bordered shaded>
                        <CChart
                            type="bar"
                            data={{
                                labels: [
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                ],
                                datasets: [
                                    {
                                        label: 'Public connection',
                                        backgroundColor: '#00c230',
                                        data: [10, 30, 28, 35, 14, 25, 22, 31, 15, 27, 15, 26],
                                    },
                                    {
                                        label: 'Private connection',
                                        backgroundColor: '#c20000',
                                        data: [47, 23, 51, 15, 38, 29, 42, 57, 32, 45, 50, 18],
                                    }
                                ],
                            }}
                            labels="months"
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: "rgba(0, 0, 21, 0.175)",
                                        },
                                        ticks: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        },
                                    },
                                    y: {
                                        grid: {
                                            color: "rgba(0, 0, 21, 0.175)",
                                        },
                                        ticks: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        },
                                    },
                                },
                            }}
                        />
                    </Panel>
                </div>
                <div className="lg:col-span-4 col-span-10 ">
                    <Panel header="Contact types" bordered shaded>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['Phonenumber', 'Social media', 'Email', 'Adress'],
                                datasets: [
                                    {
                                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                        data: [40, 20, 80, 10],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        }
                                    }
                                },
                            }}
                        />
                    </Panel>
                </div>
            </div>

            <div className="grid grid-cols-10 gap-4 max-w-7xl">
                <div className="lg:col-span-4 col-span-10">
                    <Panel header="Top 6 month send mail" bordered shaded>
                        <CChart
                            type="polarArea"
                            data={{
                                labels: ["May", "September", "November", "May", "February", "December"],
                                datasets: [
                                    {
                                        data: [11, 16, 7, 3, 14],
                                        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        }
                                    }
                                },
                                scales: {
                                    r: {
                                        grid: {
                                            color: "#d8dbe0",
                                        },
                                    }
                                }
                            }}
                        />
                    </Panel>
                </div>
                <div className="lg:col-span-6 col-span-10 ">
                    <Panel header="Schedule - Classification" bordered shaded>
                        <CChart
                            type="line"
                            data={{
                                labels: [
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                ],
                                datasets: [
                                    {
                                        label: "Meeting",
                                        backgroundColor: "rgba(250, 152, 248)",
                                        borderColor: "rgba(250, 152, 248)",
                                        pointBackgroundColor: "rgba(141, 7, 219)",
                                        pointBorderColor: "#8d07db",
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 23, 15, 41]
                                    },
                                    {
                                        label: "Action",
                                        backgroundColor: "rgba(124, 130, 252)",
                                        borderColor: "rgba(124, 130, 252)",
                                        pointBackgroundColor: "rgba(2, 13, 214)",
                                        pointBorderColor: "#020dd6",
                                        data: [50, 12, 28, 29, 7, 25, 12, 70, 60, 45, 20, 47]
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: "rgba(0, 0, 21, 0.175)",
                                        },
                                        ticks: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        },
                                    },
                                    y: {
                                        grid: {
                                            color: "rgba(0, 0, 21, 0.175)",
                                        },
                                        ticks: {
                                            color: "rgba(44, 56, 74, 0.95)",
                                        },
                                    },
                                },
                            }}
                        />
                    </Panel>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard