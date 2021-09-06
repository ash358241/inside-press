import React, { useState } from 'react';
import Bulletins from '../Bulletins/Bulletins';
import Portals from '../Portals/Portals';
import '../Sidebar/Sidebar.css';
import img from "../../img/pexels-justin-shaifer-1222271.jpg";
import { BiNews } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Form from '../Form/Form';

const Home = () => {
    const [portal, setPortal] = useState(true);
    const [bulletin, setBulletin] = useState(false);
    const [form, setForm] = useState(true);
    return (
       <div className="home" style={{backgroundColor: 'aliceblue'}}>
            <div className="row w-100">
            <div className="col-md-3">
                <div className="sidebar">
             <div className="intro my-3">
             <img src={img} alt="" />
                <div className="info">
                    <h3>Hi Reader,</h3>
                    <p>Here's your News!</p>
                </div>
             </div>
             <div className="view text-center my-3">
                <h3>View Toggle</h3>
                <div className="toggle">
                    <button onClick={() => {setPortal(false); setBulletin(true)}}><BiNews size="60px"/></button>
                    <button onClick={() => {setPortal(true); setBulletin(false)}}><AiOutlineMenu  size="60px"/></button>
                </div>
             </div>
             <div className="feedback text-center my-3">
                <h3>Have a Feedback?</h3>
                {
                    form && <Form></Form>
                }
             </div>
        </div>

            </div>
            <div className="col-md-8">
            {portal && <Portals></Portals>}

            {bulletin &&  <Bulletins></Bulletins>}
            </div>
        </div>
       </div>
    );
};

export default Home;