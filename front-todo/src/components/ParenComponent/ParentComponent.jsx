import React, { useState } from "react";
import TaskList from "../MembersTable/TaskList";
import AddMember from "../AddMember/AddMember";

const ParentComponent = () => {
  const [members, setMembers] = useState([]);

  const addMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  return (
    <div>
      <TaskList members={members} />
      <AddMember onAddMember={addMember} members={members} />
    </div>
  );
};

export default ParentComponent;
