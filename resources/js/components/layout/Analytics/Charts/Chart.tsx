import React, {FC, ReactElement, useEffect, useRef, useState} from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineController,
    BarController,
    LineElement,
    PointElement,
    Tooltip,
    BarElement
} from "chart.js";
import moment, {Moment} from "moment";
import CardBody from "../../Ui/Card/CardBody";
import {Chart as ReactChart} from "react-chartjs-2";
import Card from "../../Ui/Card/Card";
import {useApi} from "../../../../hooks/useApi";
import {useTranslation} from "react-i18next";

ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Tooltip,
    BarElement,
    LineController,
    BarController
);

interface IChartProps {
    resource: string
    type: "line" | "bar"
    title?: string
    aspectRatio?: number
    queryParams?: { [key: string]: string | Moment }
    label?: string
    filter?: { [key: string]: any } | null
    filterBar?: ReactElement
}

export type Period = "week" | "month" | "year" | "customPeriod";

export type Step = "day" | "month";

const Chart: FC<IChartProps> = (props) => {

    const {
        resource,
        type,
        title,
        aspectRatio,
        label,
        filter,
        filterBar,
    } = props;

    const chartRef = useRef<ChartJS>(null);

    const {t} = useTranslation();

    const api = useApi();

    const [labels, setLabels] = useState<Array<string>>([]);
    const [values, setValues] = useState<Array<number>>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [filter,]);

    const fetchData = () => {
        if (loading) return;

        setLoading(true);

        api
            .getMany<any>(`analytics/${resource}`, {
                filter: filter || {period: {key: "month"}}
            })
            .then(response => {
                if (response?.data?.data && response?.data?.labels) {
                    setValues(response.data.data);
                    setLabels(response.data.labels);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const data = {
        labels,
        datasets: [
            {
                label: label || t("value"),
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: values,
            },
        ],
    };

    const options = {
        responsive: true,
        aspectRatio: aspectRatio || 3.5,
        legend: {
            display: false
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Card>
        <CardBody>
            <div className="d-flex flex-wrap justify-content-between mb-4">
                {
                    title &&
                    <div className={`mb-3`}>
                        <h4 className="card-title mb-0">{title}</h4>
                    </div>
                }
                {
                    filterBar && <div>{filterBar}</div>
                }
            </div>
            <ReactChart type={`${type}`} data={data} ref={chartRef} options={options}/>
        </CardBody>
    </Card>
}

export default Chart;
