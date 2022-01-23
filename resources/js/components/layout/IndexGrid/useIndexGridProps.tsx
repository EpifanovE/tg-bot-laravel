import React, {useEffect, useState} from "react";
import {DEFAULT_PAGE} from "./constants";

const useIndexGridProps = (initData?: { filter?: { [key: string]: any } }) => {

    const [page, setPage] = useState(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<string>();
    const [sort, setSort] = useState<{ field: string, order: string }>();
    const [filter, setFilter] = useState<{ [key: string]: any } | undefined>(initData?.filter);

    const changeFilter = () => {

    };

    return {
        page,
        perPage,
        sort,
        filter,
        setPage,
        setPerPage,
        setSort,
        setFilter,
        changeFilter,
    }

};

export default useIndexGridProps;
