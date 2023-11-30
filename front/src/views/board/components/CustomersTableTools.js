import React, { useRef } from 'react';
import { Button } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData, setFilterData } from '../store/dataSlice';
import cloneDeep from 'lodash/cloneDeep';
import { useNavigate } from 'react-router-dom';

const CustomersTableTools = () => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const navigate = useNavigate();
    const tableData = useSelector((state) => state.crmCustomers.data.tableData);

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData);
        newTableData.query = val;
        newTableData.pageIndex = 1;

        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData);
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData);
        }
    };

    const fetchData = (data) => {
        dispatch(setTableData(data));
    };

    const onClearAll = () => {
        
        navigate('/board/write');
    
    };

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    글쓰기
                </Button>
            </div>
        </div>
    );
};

export default CustomersTableTools;