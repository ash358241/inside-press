import React, { useContext, useEffect, useState } from 'react';
import { PortalContext } from '../../App';
import data from "../../fakedata/data.json";
import Bulletin from '../Bulletin/Bulletin';
import './Bulletins.css';

const renderData = portals => {
    return(
      <div className="bulletins my-5">
      {
           portals.map(bulletin => <Bulletin bulletin={bulletin}></Bulletin>)
       }
   </div>
    )
}

const Bulletins = () => {
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

export default Bulletins;