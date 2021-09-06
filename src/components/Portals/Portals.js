import React, { useContext, useEffect, useState } from 'react';
import Portal from '../Portal/Portal';
import './Portals.css';
import data from "../../fakedata/data.json";
import { PortalContext } from '../../App';

const renderData = portals => {
    return(
        <div className="portals">
            {
                portals.map(portal => <Portal portal={portal}></Portal>)
            }
        </div>
    )
}

const Portals = () => {
    const [portals, setPortals] = useContext(PortalContext);
    useEffect(() => {setPortals(data)}, [])


    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(33);

    const [pageNumberLimit, setpageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
      };
    
      const pages = [];
      for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
      }
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = portals.slice(indexOfFirstItem, indexOfLastItem);

      const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={handleClick}
              className={currentPage === number ? "active" : null}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      });
    



    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };
    
      const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit == 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      };
    
      let pageIncrementBtn = null;
      if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
      }
    
      let pageDecrementBtn = null;
      if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
      }
    
      const handleLoadMore = () => {
        setitemsPerPage(itemsPerPage + 5);
      };

    // useEffect(() => {
    //     fetch('https://api.first.org/data/v1/news',{
    //         method: "GET",
    //         headers: {
    //           "access-control-allow-origin" : "*",
    //           "Content-type": "application/json; charset=UTF-8"
    //         }})
    //     .then(res => res.json())
    //     .then(data => setPortals(data.data))
    // }, [])
    // console.log(portals);
    return (
        <>
        {renderData(currentItems)}
        <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
        </>
    );
};

export default Portals;