import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import useF from "../../Hooks/useF";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";


// Import other necessary dependencies

const Datatable2 = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setlist] = useState([]);
  const { user } = useContext(AuthContext);
  const userid = user._id;
  const { data, loading, error } = useF(`/users/hotels/${userid}`);

  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      let updatedList = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].rooms) {
          updatedList = updatedList.concat(
            data[i].rooms.map((room) => ({
              ...room,
              hotelId: data[i]._id,
            }))
          );
        }
      }
      setlist(updatedList);
    }
  }, [data]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleDelete = async () => {
          const { _id, hotelId } = params.row; // Destructure _id and hotelId
          console.log("Hotel ID:", hotelId); // Log the hotelId
          try {
            await axios.delete(`/rooms/${_id}/${hotelId}`);
            setlist(list.filter((item) => item._id !== _id));
          } catch (error) {
            console.error("Error deleting:", error);
          }
        };
        const handleview = async ()=>{
         
          const {_id} =params.row
          const response = await axios.get(`/rooms/${_id}`);
          console.log(response.data)

        }

        return (
          <div className="cellAction">
            <Link to={`/rooms/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={handleview}>View</div>
            </Link>
            <div className="deleteButton" onClick={handleDelete}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // ...

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable2;

