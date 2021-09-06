import React, { useContext, useState } from "react";

import "./Portal.css";
import { ImCross } from "react-icons/im";
import { PortalContext } from "../../App";
import { Button } from "react-bootstrap";

const altImg = "https://www.first.org/_/img/news/hof-kpk-20190731.jpg";

const altSummary =
  "Featuring Dr. Allan Friedman, Director of Cybersecurity Initiatives at National Telecommunications and Information Administration in the US Department of Commerce. Disclaimer: The views expressed by the hosts and guests are their own and their participation on the podcast does not imply an endorsement of them or any entity they represent.";

const Portal = (props) => {
  const [portals, setPortals] = useContext(PortalContext);

  const { title, summary, published, image, id, link } = props.portal;

  const [news, setNews] = useState(false);

  const deletePortal = (id) => {
    const newPortals = portals.filter((p) => id !== p.id);
    setPortals(newPortals);
  };

  return (
    <div className="portal d-flex align-items-center mt-3">
      <div className="content my-3" onClick={() => setNews(true)}>
        <img
          style={{ width: "80px", height: "80px", borderRadius: "100%" }}
          src={image || altImg}
          alt=""
        />
        <div className="details ms-3">
          <h5 className="title">{title}</h5>
          <p className="summary">{summary || altSummary}</p>
          <p className="date" style={{ opacity: "0.6" }}>
            {published}
          </p>
        </div>
        {news && (
          <Button variant="info" className="m-3" target="blank" href={link}>
            Explore
          </Button>
        )}
      </div>
      <div className="terminate ms-3">
        <button className="terminate" onClick={() => deletePortal(id)}>
          <ImCross size="20px" />
        </button>
      </div>
    </div>
  );
};

export default Portal;
