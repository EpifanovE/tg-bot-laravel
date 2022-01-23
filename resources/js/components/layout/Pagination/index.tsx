import React, {FC} from "react";
import {Size} from "../../../types/app";

interface IPaginationProps {
    current: number
    onClick: (page: number) => void
    lastPage?: number
    size?: Size
    disabled?: boolean
}

interface INumberItem {
    key: number
    value: string
}

const Pagination: FC<IPaginationProps> = (props) => {

    const {
        current,
        onClick,
        lastPage,
        size,
        disabled,
    } = props;

    const neighbours = 2;

    const getNumbers = () : Array<INumberItem> => {
        return [
            ...getPrevNumbers(),
            {key: current, value: `${current}`},
            ...getNextNumbers()
        ];
    };

    const getPrevNumbers = () : Array<INumberItem> => {
        let numbers: Array<INumberItem> = [];

        if (current > neighbours + 1) {
            numbers = [{key: 1, value: "1"}];
            if (current - (neighbours + 1) > 1) {
                numbers = [...numbers, {key: 2, value: '...'}];
            }
            for (let i = 0; i < neighbours; i++) {
                numbers = [...numbers, {key: current - neighbours + i, value: `${current - neighbours + i}`}];
            }
        } else {
            for (let i = 1; i < current; i++) {
                numbers = [...numbers, {key: i, value: `${i}`}];
            }
        }

        return numbers;
    };

    const getNextNumbers = () : Array<INumberItem> => {
        let numbers: Array<INumberItem> = [];

        if (lastPage && current < lastPage - neighbours) {
            for (let i = 0; i < neighbours; i++) {
                numbers = [...numbers, {key: current + i + 1, value: `${current + i + 1}`}];
            }
            if (current < (lastPage - neighbours - 1)) {
                numbers = [...numbers, {key: lastPage - 1, value: '...'}];
            }
            numbers = [...numbers, {key: lastPage, value: `${lastPage}`}];
        } else {
            for (let i = 1; i <= neighbours; i++) {
                if (lastPage && current + i <= lastPage) {
                    numbers = [...numbers, {key: current + i, value: `${current + i}`}];
                }
            }
        }
        return numbers;
    };

    const handleClick = (page: string) => {
        if (page !== "...") {
            onClick(parseInt(page));
        }
    };

    const handlePrevClick = () => {
        if (current > 1) {
            onClick(current - 1);
        }
    };

    const handleNextClick = () => {
        if (lastPage && current < lastPage) {
            onClick(current + 1);
        }
    };

    const pagesElements = getNumbers().map(number => {
        const classes = `page-item${(current === number.key ? ' active' : '')}${(number.value === "..." ? ' disabled' : '')}`;

        return <li
            className={classes}
            key={number.key}
        >
            {
                number.key === current ?
                    <span className="page-link">{number.value}</span> :
                    <button className="page-link" onClick={e => {e.preventDefault();handleClick(number.value)}} disabled={disabled}>
                        {number.value}
                    </button>
            }
        </li>;
    });

    return <ul className={`pagination${size ? " pagination-" + size : ""}`}>
        <li className={`page-item${(current === 1) ? " disabled" : ""}`}>
            <button
                className="page-link"
                onClick={handlePrevClick}
                disabled={current === 1 || disabled}
            >
                &laquo;
            </button>
        </li>
            {pagesElements}
        <li className={`page-item${(!!lastPage && (current === lastPage)) ? " disabled" : ""}`}>
            <button
                className="page-link"
                onClick={handleNextClick}
                disabled={!!lastPage && (current === lastPage) || disabled}
            >
                &raquo;
            </button>
        </li>
    </ul>
};

export default Pagination
