import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'

const statusColor = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            Edit
        </div>
    )
}

const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/board/view?id=${row.boardSeq}`}
            >
                {row.boardName}
                
            </Link>
        </div>
    )
}



const columns = [
    {
        header: '제목',
        accessorKey: 'name',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
        
    },
    {
        header: '작성일',
        accessorKey: 'email',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                  {/* 여기에 새로운 데이터를 출력하거나 원하는 UI를 추가하세요 */}
                  {row.boardWdate}
                </div>
              );
        },
    },
    {
        header: '작성자',
        accessorKey: 'status',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                  {/* 여기에 새로운 데이터를 출력하거나 원하는 UI를 추가하세요 */}
                  {row.memId}
                </div>
              );
        },
    },
    {
        header: '좋아요',
        accessorKey: 'lastOnline',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                  {/* 여기에 새로운 데이터를 출력하거나 원하는 UI를 추가하세요 */}
                  {row.boardLikescount}
                </div>
              );
        },
    },

]

const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, sort, query, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
