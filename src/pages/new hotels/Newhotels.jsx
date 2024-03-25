import "./Newhotels.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useF from "../../Hooks/useF";
import { AuthContext } from "../../context/Authcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Newhotels = () => {
  const [files, setFiles] = useState("");
  const [info, setinfo] = useState({});
  const [rooms, setrooms] = useState([]);
  const { user} = useContext(AuthContext);
  const iduser = user._id
  const navigate=useNavigate()

  const handlechange = (e) => {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
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

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };
      await axios.post(`/hotels/${iduser}`, newHotel);
      navigate("/hotels")
    } catch (err) {
      console.log(err);
    }
  };
  const { data, loading, error } = useF("/rooms");
  const handleselect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setrooms(value);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
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
                <label>Featured</label>
                <select id="featured" onChange={handlechange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selecRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleselect}>
                  {loading
                    ? "loading .."
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room.id}>
                          {room.title}
                        </option>
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

export default Newhotels;
