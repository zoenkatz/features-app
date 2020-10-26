import React, {useEffect, useState} from 'react';
import {useTable, useSortBy, useGroupBy, usePagination, useResizeColumns, useRowSelect, Hooks, CellProps, HeaderProps} from 'react-table';
import { HeaderCheckbox, RowCheckbox } from './FeaturesTableStyles';
import './FeaturesTable.scss';


const FeaturesTable = ({ columns, data, dispatch, setCurrentPage, pageNumbers, currentPage } : any) => {

    const selectionHook = (hooks: Hooks<any>) => {
        hooks.allColumns.push((columns: any) => [
            {
                id: '_selector',
                disableResizing: true,
                disableGroupBy: true,
                minWidth: 45,
                width: 45,
                maxWidth: 45,
                Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => {

                    return (
                        <HeaderCheckbox {...getToggleAllRowsSelectedProps()}/>
                    )
                },
                Cell: ({ row }: CellProps<any>) => <RowCheckbox {...row.getToggleRowSelectedProps()} />,
            },
            ...columns,
        ]);
        hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
            // fix the parent group of the selection button to not be resizable
            const selectionGroupHeader = headerGroups[0].headers[0]
            selectionGroupHeader.canResize = false
        })
    };

    const hooks = [
        useGroupBy,
        useSortBy,
        usePagination,
        useResizeColumns,
        useRowSelect,
        selectionHook,
    ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({
        columns,
        data,
    }, ...hooks);


    useEffect(() => {
        console.log(selectedRowIds, "selectedRowIds");
        dispatch({type: 'SET_SELECTED_ROW_IDS', payload: { selectedRowIds: selectedRowIds }})
    }, [selectedRowIds]);

    return (
        <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} {...column.getSortByToggleProps()}>{column.render('Header')}<span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span></th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
            <ul id="page-numbers">
                {pageNumbers.map((pageNumber: any) => {
                    return (
                        <li key={pageNumber}>
                            <button id={pageNumber} className={Number(pageNumber) === Number(currentPage) ? 'button-current' : 'next-buttons' } onClick={() => setCurrentPage(Number(pageNumber))}>{pageNumber}</button>
                        </li>
                    );
                })}
            </ul>
        </>
    )
};

export default FeaturesTable;
