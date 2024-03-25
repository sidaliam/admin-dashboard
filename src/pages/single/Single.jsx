import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import useF from "../../Hooks/useF";

const Single = () => {
  const location = useLocation();
  const idroom = location.pathname.split("/")[2];
  const { data, loading, error } = useF(`/rooms/${idroom}`);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.photos[0]}
                alt=""
                className="itemImg"
              />
              <div className="details">

              <h1 className="itemTitle">{data.marque}</h1>
                <h1 className="itemTitle">{data.modéle}</h1>
                <div className="detailItem">
                  <span className="itemKey"> Couleur :</span>
                  <span className="itemValue"> {data.couleur}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Année:</span>
                  <span className="itemValue">
                  {data.année}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Prix:</span>
                  <span className="itemValue"> {data.price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
