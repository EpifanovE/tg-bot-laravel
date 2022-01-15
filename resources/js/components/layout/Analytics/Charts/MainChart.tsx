import React, {FC, useEffect, useRef, useState} from "react";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip, BarElement} from "chart.js";
import {stringify} from 'query-string';
import moment, {Moment} from "moment";
import CardBody from "../../Ui/Card/CardBody";
import {Chart} from "react-chartjs-2";
import Card from "../../Ui/Card/Card";
import {useApi} from "../../../../hooks/useApi";
import PeriodBar from "./PeriodBar";
import {useDebouncedEffect} from "../../../../hooks/useDebounceEffect";
import {errorAlert} from "../../../../utils/alerts";
import {useTranslation} from "react-i18next";

ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Tooltip,
    BarElement
);

interface IMainChartProps {
    resource: string
    type: "line" | "bar"
    period: Period
    periodBar?: boolean
    title?: string
    aspectRatio?: number
    from?: Moment | string
    to?: Moment | string
    step?: "day" | "month"
    queryParams?: {[key: string] : string | Moment}
    label?: string
}


export type Period = "week" | "month" | "year" | "customPeriod";

export type Step = "day" | "month";

const MainChart: FC<IMainChartProps> = ({resource, type, periodBar, period: periodProp,
                                            title, aspectRatio, from: fromProp,
                                            to: toProp, step: stepProp, queryParams, label}) => {

    const chartRef = useRef<ChartJS>(null);

    const {t} = useTranslation();

    const api = useApi();

    const [labels, setLabels] = useState<Array<string>>([]);
    const [values, setValues] = useState<Array<number>>([]);

    const [period, setPeriod] = useState<Period>();
    const [from, setFrom] = useState<Moment | string>(moment().startOf('month'));
    const [to, setTo] = useState<Moment | string>(moment());
    const [step, setStep] = useState<Step>("day");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPeriod(periodProp);
    }, [periodProp]);

    useEffect(() => {
        if (fromProp) {
            setFrom(fromProp);
        }
    }, [fromProp]);

    useEffect(() => {
        if (toProp) {
            setTo(toProp);
        }
    }, [toProp]);

    useEffect(() => {
        if (stepProp) {
            setStep(stepProp);
        }
    }, [stepProp]);

    useEffect(() => {
        fetchData();
    }, [period, from, to, step]);

    useDebouncedEffect(() => {
        fetchData();
    }, 500, [queryParams]);

    const fetchData = () => {
        if (!period) return;

        if (loading) return;

        setLoading(true);

        let query = {}

        query["key"] = period;

        if (period === "customPeriod") {
            query["from"] = from;
            query["to"] = to;
            query["step"] = step;
        }

        if (queryParams) {
            query = {
                ...query,
                ...queryParams
            }
        }

        const queryStr = "?" + stringify(query);

        api
            .request<{ labels: Array<string>, data: Array<number> }>({
                endpoint: `analytics/${resource}${queryStr}`,
                method: "get",
            })
            .then(response => {
                setValues(response.data.data);

                setLabels(response.data.labels);
            })
            .finally(() => {
                setLoading(false)
            });
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

    const handlePeriodChange = (value: Period) => {
        setPeriod(value);
    }

    const handleFromChange = (value: Moment | string) => {
        setFrom(value);
    }

    const handleToChange = (value: Moment | string) => {
        setTo(value)
    }

    const handleStepChange = (value: Array<string>) => {
        setStep(value[0] as Step);
    }

    return <Card>
        <CardBody>
            <div className="d-flex justify-content-between mb-4">
                {
                    title &&
                    <div>
                        <h4 className="card-title mb-0">{title}</h4>
                    </div>
                }
                {
                    periodBar &&
                    <div className="btn-toolbar ml-auto d-none d-md-block">
                        <PeriodBar
                            value={period || "month"}
                            onChange={handlePeriodChange}
                            from={from}
                            to={to}
                            step={step}
                            onFromChange={handleFromChange}
                            onToChange={handleToChange}
                            onStepChange={handleStepChange}
                        />
                    </div>
                }
            </div>
            <Chart type={`${type}`} data={data} ref={chartRef} options={options} />
        </CardBody>
    </Card>
}

export default MainChart;
