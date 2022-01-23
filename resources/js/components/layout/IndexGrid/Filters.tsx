import React, {cloneElement, useEffect, useState} from "react";
import {IFilterComponentValue, IFiltersProps,} from "./types";
import Card from "../Ui/Card/Card";
import CardBody from "../Ui/Card/CardBody";
import Row from "../Ui/Row";
import Col from "../Ui/Col";
import Button from "../Button";
import CardFooter from "../Ui/Card/CardFooter";
import {useTranslation} from "react-i18next";
import CardHeader from "../Ui/Card/CardHeader";

const Filters = ({filters, onChange, values, size, className} : IFiltersProps) => {

    const {t} = useTranslation();

    const [value, setValue] = useState<{[key: string] : any}>({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setValue(values);
    }, []);

    const handleChangeFilter = (data : IFilterComponentValue) => {
        setValue({
            ...value,
            [data.source] : data.value
        })
    };

    const handleApplyClick = () => {
        onChange(value);
    }

    const handleResetClick = () => {
        setValue({});
        onChange({});
    }

    const handleOpenClick = () => {
        setOpen(!open);
    }

    const filtersEls = filters?.map(
        (filter, index) => cloneElement(filter, {
            key: index,
            onChange: handleChangeFilter,
            value: value && value[filter.props.source] ? value[filter.props.source] : "",
            size: size
        }));

    return <Card className={`${className ? " " + className : ""}`}>
        <CardHeader className={`d-flex justify-content-between align-items-center`}>
            {t("filters")}
            <Button
                onClick={handleOpenClick}
                color={`ghost-primary`}
            >
                {open ? t("buttons.close") : t("buttons.open")}
            </Button>
        </CardHeader>
        {
            open &&
                <>
                    <CardBody className={`pb-1`}>
                        <Row>
                            {filtersEls}
                        </Row>
                    </CardBody>
                    <CardFooter className={`d-flex justify-content-end`}>
                        <div>
                            <Button
                                type={`button`}
                                color={`outline-primary`}
                                onClick={handleResetClick}
                                className={`mr-2`}
                            >
                                {t("buttons.reset")}
                            </Button>
                            <Button
                                type={`button`}
                                color={`primary`}
                                onClick={handleApplyClick}
                            >
                                {t("buttons.apply")}
                            </Button>
                        </div>
                    </CardFooter>
                </>
        }
    </Card>
};

export default Filters;
