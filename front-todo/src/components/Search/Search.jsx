import React, { useState } from "react";
import "./search.css";
const Search = ({ handleSearch, searchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <div>
      <input
        type="text"
        placeholder="Search members"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
// import AddMember from "../AddMember/AddMember";
// const Search = ({ members }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMembers, setFilteredMembers] = useState([]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     const filtered = members.filter((member) =>
//       member.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredMembers(filtered);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search members"
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       {/* <div>
//         {filteredMembers.length > 0
//           ? filteredMembers.map((member) => (
//               <AddMember key={member.id} member={member} />
//             ))
//           : members.map((member) => (
//               <AddMember key={member.id} member={member} />
//             ))}
//       </div> */}
//     </div>
//   );
// };
// export default Search;
