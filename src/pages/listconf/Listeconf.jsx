import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatableconf from "../../components/datatable confirmation/Datatableconf";
const Listeconf = ({columns}) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatableconf columns={columns} />
      </div>
    </div>
  );
};

export default Listeconf;
