import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../Components/Serve/SupplyChain/Header";
import relationship_img from "../../Utils/images/Sell/esale/relationship.png";
import member_icon from "../../Utils/images/Sell/esale/life/member_icon.png";
import ScrollableTabsButton from "../../Components/ScrollableTabsButton";
import Tab_content from "../../Components/Sell/Esale/Relations/Tab_content";
import Relations_tab_content from "../../Components/Sell/Esale/Relations/Relations_tab_content";
import Relation_Details from "../../Components/Sell/Esale/Relations/Relation_Details";

function MemberRelations() {
  const [selectedRelationDetail, setSelectedRelationDetail] = useState(null);

  const handleCardClick = (relation) => {
    setSelectedRelationDetail(relation);
  };

  console.log(selectedRelationDetail);

  const tabsData = [
    {
      id: 1,
      name: "Couples",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Couples"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 2,
      name: "Siblings",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Siblings"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 3,
      name: "Children",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Children"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 4,
      name: "Parents",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Parents"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 5,
      name: "Neighbors",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Neighbors"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 6,
      name: "All Buddies",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="All Buddies"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 7,
      name: "Direct Friends",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Direct Friends"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 8,
      name: "Recommended People",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Recommended People"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 9,
      name: "Others",
      content: selectedRelationDetail ? (
        <Relation_Details
          data={selectedRelationDetail}
          goBack={() => setSelectedRelationDetail(null)}
        />
      ) : (
        <Relations_tab_content
          relation="Others"
          onCardClick={handleCardClick}
        />
      ),
    },
    {
      id: 10,
      name: "Create your relation",
      content: (
        <Tab_content
          relation="recommended_people"
          onCardClick={handleCardClick}
        />
      ),
    },
  ];

  return (
    <Box className="member_relations_wrapper">
      <Box className="row">
        <Header
          icon_1={relationship_img}
          icon_2={member_icon}
          icon_1_link="../../sell/esale"
          icon_2_link="../../sell/user"
          title="Relations"
          title_container={true}
          redirectTo="../../sell/esale"
        />

        <Box className="col">
          <ScrollableTabsButton
            data={tabsData}
            scrollbarThumb2="var(--brown)"
            verticalTabs={true}
            hideScrollBtn={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MemberRelations;
