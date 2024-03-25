import "./NewRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState,useEffect } from "react";
import { roomInputs } from "../../formSource";
import useF from "../../Hooks/useF";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";


const NewRoom = () => {
  const [info, setinfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [files, setFiles] = useState("");
  const [rooms, setrooms] = useState([]);
  const navigate=useNavigate()
  const handlechange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  

  


  const { user} = useContext(AuthContext);
  const userid = user._id
  const { data, loading, error } = useF(`/users/hotels/${userid}`);
  const handleclick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dqycmx4a0/image/upload",
            data
          );
          const { url } = uploadResponse.data;
          return url;
        })
      );
      const newRoom = {
        ...info,
        photos: list
      }
      await axios.post(`/rooms/${hotelId}`,newRoom)

    } 
    catch (err){
      console.log(err)
    }
  };

  useEffect(() => {
    // Mettre à jour la valeur de sethotelid avec la première valeur de e.target.value
    if (data.length > 0) {
      setHotelId(data[0]._id);
    }
  }, [data]); // Assurez-vous que cela se produit lorsque data change

  console.log(info)
  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top"></div>
        <div className="bottom">
          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handlechange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleclick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;