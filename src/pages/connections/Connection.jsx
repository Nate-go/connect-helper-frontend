import { Grid, Row, Col, Panel } from 'rsuite';
import { ConnectionTags, ConnectionStatuses } from '@/components/connections';
import { useState, useEffect } from 'react';

import { BaseTable } from '@components/table';
import useApi from '@/hooks/useApi';
import {connectionEndpoints} from '@/apis'
import PaginationDefault from '@/constants/PaginationDefault';
import { BasePagination, BaseLoader } from '@/components';

const Connection = () => {
    const [tags, setTags] = useState([]);
    const [pagination, setPagination] = useState({
        page: PaginationDefault.PAGE,
        limit: PaginationDefault.LIMIT,
    });
    const [sort, setSort] = useState({
        order: PaginationDefault.ORDER,
        column: PaginationDefault.COLUMN
    });
    const [statuses, setStatuses] = useState([]);
    const [fetch, setFetch] = useState(true);
    const { data: connectionData, loading: connectionLoading, error, callApi: handleGetConnections } = useApi();

    useEffect(() => {
        handleGetConnections(connectionEndpoints.get, {
            params: {
                ...pagination,
                ...sort,
                tags,
                statuses
            }
        })
    }, [fetch]);

    const handleTags = (newTags) => {
        setTags(newTags);
        setPagination(1, pagination.limit);
        setFetch(!fetch);
    }

    const handleStatuses = (newStatuses) => {
        setStatuses(newStatuses);
        setPagination(1, pagination.limit);
        setFetch(!fetch);
    }

    const handlePagination = (page, limit) => {
        setPagination({
            page,
            limit,
        })
        setFetch(!fetch);
    };

    const handleSort = (column, order) => {
        setSort({
            order,
            column
        })
        setFetch(!fetch);
    };

    return (
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={24} sm={5} md={5}>
                    <Panel header='Filter' shaded className='w-full h-full'>
                        <div className='flex flex-col w-full h-full gap-4'>
                            <ConnectionTags setTags={handleTags} />
                            <ConnectionStatuses setStatuses={handleStatuses} />

                        </div>
                    </Panel>
                </Col>
                <Col xs={24} sm={19} md={19}>
                    <div className='w-full h-full'>
                        <Panel header='Connections' shaded className='w-full h-full'>
                            {connectionData?.data ?     
                            <>
                                <BaseTable items={connectionData.data.items} dataLoading={connectionLoading} handleSort={handleSort} />
                                <BasePagination pagination={connectionData.data.pagination} handlePagination={handlePagination} />
                            </> : <BaseLoader/>
                            }
                        </Panel>
                    </div>
                </Col>
            </Row>
        </Grid>

    );
};

export default Connection