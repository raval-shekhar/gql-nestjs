import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import PostTable from "components/common/PostTable";
import { getPostsQuery, getMyPostsQuery } from "apollo/query/posts";
import AddPostForm from "components/common/AddPostForm";

const MainLayoutWrapper = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  gap: 50px;
  .post-img {
    width: 40px;
    height: 40px;
  }
  .tabs {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .tab {
    padding: 5px;
    border: 1px solid;
    border-radius: 10px;
    min-width: 200px;
    text-align: center;
    cursor: pointer;
  }
  .selcted-tab {
    background: #948ea1b5;
    font-weight: bold;
    border: none;
    padding: 6px 5px;
  }
`;

interface MainLayoutProps {}

const TABS = [
  {
    title: "All Posts",
    id: "all",
  },
  {
    title: "My Posts",
    id: "mypost",
  },
  {
    title: "Create",
    id: "create",
  },
];

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  return (
    <MainLayoutWrapper>
      <div className="tabs">
        {TABS.map((tab) => (
          <div
            className={`tab ${tab.id === selectedTab ? "selcted-tab" : ""}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {selectedTab === 'all' &&<PostTable query={getPostsQuery}/>}
      {selectedTab === 'mypost' &&<PostTable query={getMyPostsQuery}/>}
      {selectedTab === 'create' && <AddPostForm/>}
    </MainLayoutWrapper>
  );
};

MainLayout.propTypes = {};

MainLayout.defaultProps = {};

export default MainLayout;
