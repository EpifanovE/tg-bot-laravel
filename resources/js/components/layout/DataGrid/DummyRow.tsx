import React, {FC} from "react";
import Dummy from "./Dummy";
import {IDummyRowProps} from "./types";
import Checkbox from "../../inputs/Checkbox";

const DummyRow: FC<IDummyRowProps> = ({columns, actions, checkbox}) => {
    const rowEls = columns.map((column) => <td key={column.key}><Dummy /></td>);
    return <tr>
        {
            checkbox &&
            <td>
                <Checkbox checked={false} onChange={() => {}}/>
            </td>
        }
        {rowEls}
        {
            actions &&
            <td>
                <Dummy />
            </td>
        }
    </tr>
};

export default DummyRow;
