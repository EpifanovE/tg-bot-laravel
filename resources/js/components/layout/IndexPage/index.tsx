import React, {FC, ReactElement} from "react";
import {NavLink} from "react-router-dom";
import Row from "../Ui/Row";
import Col from "../Ui/Col";
import Icon from "../Icon";
import Card from "../Ui/Card/Card";
import CardHeader from "../Ui/Card/CardHeader";
import CardBody from "../Ui/Card/CardBody";
import {DataGrid} from "../DataGrid";
import {useTranslation} from "react-i18next";
import {IDataTableColumn} from "../DataGrid/types";

interface IIndexPageProps {
    resource: string
    title: string
    columns: Array<IDataTableColumn>
    filters?: Array<ReactElement>
    actions?: (item: any) => ReactElement
    creating?: boolean
}

const IndexPage: FC<IIndexPageProps> = ({resource, title, columns, filters, actions, creating}) => {

    const {t} = useTranslation();

    return <Row>
        {
            !!creating &&
            <Col width={{"sm": 12}} className="d-flex justify-content-end mb-4">
                <NavLink className="btn btn-success d-flex align-items-center" to={`/${resource}/create`}>
                    <Icon name="plus" className="mr-2"/>
                    {t("buttons.create")}
                </NavLink>
            </Col>
        }
        <Col width={{"sm": 12}}>
            <Card>
                <CardHeader>
                    {title}
                </CardHeader>
                <CardBody>
                    <DataGrid
                        resource={resource}
                        columns={columns}
                        filters={filters}
                        actions={actions}
                    />
                </CardBody>
            </Card>
        </Col>
    </Row>
};

export default IndexPage;
