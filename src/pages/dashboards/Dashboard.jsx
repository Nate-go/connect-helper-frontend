import { Panel } from "rsuite"
import { CChart } from '@coreui/react-chartjs';

const Dashboard = () => {
    const colors = ["green", "red", "blue", "yellow", "violet"];

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-10 gap-4 max-w-7xl">
                <div className="lg:col-span-6 col-span-10">
                    <Panel header="Tags - Connections" bordered shaded>
                        <CChart
                            type="bar"
                            data={{
                                labels: [
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                ],
                                datasets: [
                                    {
                                        label: 'GitHub Commits2',
                                        backgroundColor: '#f87945',
                                        data: [40, 80, 39, 40, 10, 39, 12, 20, 40],
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
                    <Panel header="Tags - Connections" bordered shaded>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
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
                <div className="lg:col-span-6 col-span-10 ">
                    <Panel header="Connections - Contacts" bordered shaded>
                        <CChart
                            type="bar"
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'GitHub Commits',
                                        backgroundColor: '#f87979',
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                    },
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
                <div className="lg:col-span-4 col-span-10">
                    <Panel header="Type contact" bordered shaded>
                        <CChart
                            type="polarArea"
                            data={{
                                labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
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
            </div>

            <div className="grid grid-cols-10 gap-4 max-w-7xl">
                <div className="lg:col-span-6 col-span-10">
                    <Panel header="Schedule - Classification" bordered shaded>
                        <CChart
                            type="line"
                            data={{
                                labels: ["January", "February", "March", "April", "May", "June", "July"],
                                datasets: [
                                    {
                                        label: "My First dataset",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "rgba(220, 220, 220, 1)",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#fff",
                                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                                    },
                                    {
                                        label: "My Second dataset",
                                        backgroundColor: "rgba(151, 187, 205, 0.2)",
                                        borderColor: "rgba(151, 187, 205, 1)",
                                        pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                        pointBorderColor: "#fff",
                                        data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
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
                <div className="lg:col-span-4 col-span-10">
                    <Panel header="Mail template" bordered shaded>

                    </Panel>
                </div>
            </div>

        </div>
    )
}

export default Dashboard