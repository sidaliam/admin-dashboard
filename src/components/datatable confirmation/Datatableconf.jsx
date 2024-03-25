import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useF from "../../Hooks/useF";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [formattedUnavailableData, setFormattedUnavailableData] = useState([]);
  const [selectionofroom, setselectionofroom] = useState([]);
  const { user } = useContext(AuthContext);
  const userid = user._id;

  const [selectedRoomIds, setSelectedRoomIds] = useState([]); // Variable d'état pour stocker les ID des chambres sélectionnées

  // Fonction pour gérer les changements de sélection dans le DataGrid

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setFormattedUnavailableData(
        formattedUnavailableData.filter((item) => item._id !== id)
      );
    } catch {}
  };

  const { data: datahotel, loading: lodainghotel } = useF(
    `/users/hotels/${userid}`
  );
  const { data, loading } = useF(`/orders/`);

  const roomIds = [];

  if (datahotel && !lodainghotel) {
    datahotel.forEach((hotel) => {
      if (hotel.rooms) {
        hotel.rooms.forEach((room) => {
          roomIds.push(room._id);
        });
      }
    });
  }

  if (data && !loading) {
    const orderRoomIds = [];

    data.forEach((order) => {
      if (order.room) {
        orderRoomIds.push(order.room);
      }
    });
  }

  if (data && !loading && datahotel && !lodainghotel) {
    const orderRoomIds = data.map((order) => order.room);
    const commonRoomIds = orderRoomIds.filter((roomId) =>
      roomIds.includes(roomId)
    );
  }

  useEffect(() => {
    if (roomIds.length > 0) {
      const fetchRoomOrders = async () => {
        try {
          const response = await axios.get(`/orders/byRoomIds`, {
            params: {
              roomIds: roomIds,
            },
          });

          // Formatage des dates pour chaque commande
          const formattedData = response.data.map((item) => {
            const formattedUnavailable = item.unavailable.map((date) => {
              return new Date(date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
            });
            return {
              ...item,
              unavailable: formattedUnavailable.join(", "),
            };
          });

          // Mettez les données formatées dans le state
          setFormattedUnavailableData(formattedData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des commandes :",
            error
          );
        }
      };

      fetchRoomOrders();
    }
  }, [roomIds]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRoomIds(newSelection);
    const selectedRooms = formattedUnavailableData
      .filter((item) => newSelection.includes(item._id.toString()))
      .map((selectedRow) => selectedRow.room);

    console.log("Rooms sélectionnées : ", selectedRooms);

    setselectionofroom(selectedRooms); // Mettez à jour l'état ici
  };

  const handleclickbutton = async () => {
    // Utilisez selectedRoomContent dans votre logique Axios
    await Promise.all(
      selectionofroom.map(async (roomId) => {
        const res = await axios.put(`rooms/toggleAvailability/${roomId}`);
        return res.data;
      })
    );
  };
  const handleclickbutton2 = async () => {
    // Utilisez selectedRoomContent dans votre logique Axios
    await Promise.all(
      selectionofroom.map(async (roomId) => {
        const res = await axios.put(`rooms/cancel/${roomId}`);
        return res.data;
      })
    );
  };


  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <div className="link" style={{backgroundColor:"green", color:"white"}} onClick={handleclickbutton}>
          Confirmer la commande
        </div>
        <div className="link" style={{backgroundColor:"red", color:"white",border:"1px solid red"}} onClick={handleclickbutton2}>
          Terminer la commande
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={formattedUnavailableData}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        selectionModel={selectedRoomIds} // ID des chambres sélectionnées
        onSelectionModelChange={handleSelectionModelChange} // Gérer les changements de sélection
      />
    </div>
  );
};

export default Datatable;
