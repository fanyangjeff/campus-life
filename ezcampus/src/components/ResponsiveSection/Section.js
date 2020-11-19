import React, {Component} from 'react';
import './Section.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBalanceScaleLeft} from "@fortawesome/free-solid-svg-icons";
import {faCar} from "@fortawesome/free-solid-svg-icons";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import {faHouseUser} from "@fortawesome/free-solid-svg-icons";
import {faAnchor} from "@fortawesome/free-solid-svg-icons";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons";

const FreeForSale = <FontAwesomeIcon icon={faBalanceScaleLeft}/>;
const RideSharing = <FontAwesomeIcon icon={faCar}/>;
const CuttiePets = <FontAwesomeIcon icon={faPaw}/>;
const Housing = <FontAwesomeIcon icon={faHouseUser}/>;
const Entertainment = <FontAwesomeIcon icon={faAnchor}/>;
const Others = <FontAwesomeIcon icon={faAlignCenter}/>;

class Section extends Component {
    render() {
        return (
            <div className={"body-section-li"}>
                <div className={"services-li"}>
                    <h1 className={"h1-li"}>Pick your Favorite Section</h1>
                    <div className={"cen-li"}>
                        {/*FreeForSale*/}
                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{FreeForSale}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>
                        {/*RideSharing*/}
                        {/*FreeForSale*/}
                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{RideSharing}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>


                        {/*CuttiePets*/}
                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{CuttiePets}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>

                        {/*Housing*/}
                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Housing}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>


                        {/*Entertainment*/}

                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Entertainment}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>

                        {/*Others*/}
                        <div className={"service-li"}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Others}</i>
                            <h2 className={"service-li-h2"}>Section Name</h2>
                            <p className={"service-li-p"}>In League of Legends, players form a team of five and assume
                                the role of a champion,
                                characters with unique abilities,</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;