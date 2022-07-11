import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { useQuery } from "@apollo/client";

const PostTableWrapper = styled.div`
  flex: 1;
`;

interface PostTableProps {
  query: any;
}

interface DataType {
  title: string;
  image: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    width: "20%",
  },
  {
    title: "Image",
    dataIndex: "image",
    width: "20%",
    render: (t, r) => <img className="post-img" alt="user-img" src={r.image || ""} />,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "20%",
  },
];

const PostTable: FunctionComponent<PostTableProps> = ({ query }) => {
  const [tabListCount, setTabelListCout] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading, refetch } = useQuery(query, {
    variables: { page: currentPage, limit: tabListCount },
  });

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <PostTableWrapper>
      <Table
        columns={columns}
        dataSource={data?.posts?.posts || data?.myPosts?.posts || []}
        rowKey="id"
        pagination={{
          pageSize: tabListCount,
          total: data?.posts?.total || data?.myPosts?.total || 0,
          pageSizeOptions: ["10", "20"],
          showSizeChanger: true,
          onChange: (page, limit) => {
            setCurrentPage(page);
            setTabelListCout(limit);
          },
        }}
        loading={loading}
      />
    </PostTableWrapper>
  );
};

PostTable.propTypes = {};

PostTable.defaultProps = {};

export default PostTable;
