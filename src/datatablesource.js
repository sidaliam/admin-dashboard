export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "country",
    headerName: "Country",
    width: 230,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  }
];
export const HotelColumns = [
  { field: "_id", headerName: "ID", width: 270 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },

  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 100,

  },
  {
    field: "cheapestPrice",
    headerName: "Price",
    width: 100,

  },
  {
    field: "maxPeople",
    headerName: "Maximum people",
    width: 100,

  }
];

