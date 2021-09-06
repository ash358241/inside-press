import React, { useContext, useState } from "react";
import "./Bulletin.css";
import { ImCross } from "react-icons/im";
import img from "../../../src/img/pexels-justin-shaifer-1222271.jpg";
import { PortalContext } from "../../App";
import { Button } from "react-bootstrap";

const altSummary =
  "Alexander Jäger, Senior Security Engineer of Google, continues in his role as Chief Financial Officer Also available in [PDF](FIRST-Press-Release-20210708.pdf)";

const Bulletin = (props) => {
  console.log(props.bulletin);

  const [portals, setPortals] = useContext(PortalContext);

  const { title, summary, published, image, id, link } = props.bulletin;

  const [news, setNews] = useState(false);

  const deleteBulletin = (id) => {
    const newBulletin = portals.filter((p) => id !== p.id);
    setPortals(newBulletin);
  };

  return (
    <div className="bulletin">
      <div
        className="card"
        onClick={() => setNews(true)}
        style={{ borderRadius: "10px" }}
      >
        <h5 className="title">{title}</h5>
        <p className="summary">{summary || altSummary}</p>
        <p className="date">{published}</p>
        <br />
        <img
          style={{ width: "85%", margin: "0 auto" }}
          src={image || img}
          alt=""
        />
        {news && (
          <Button variant="info" className="m-3" target="blank" href={link}>
            Explore
          </Button>
        )}
      </div>
      <div className="delete">
        <button
          style={{ border: "none", background: "transparent", color: "red" }}
          onClick={() => deleteBulletin(id)}
        >
          <ImCross size="20px" />
        </button>
      </div>
    </div>
  );
};

export default Bulletin;
