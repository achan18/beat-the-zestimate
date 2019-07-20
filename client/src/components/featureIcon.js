import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faToilet, faFire, faWarehouse, faBath, faSwimmer, 
    faDoorOpen, faHome, faLayerGroup, faVectorSquare, faSquare } from '@fortawesome/free-solid-svg-icons'


    var data = {
        bathroomcnt: {
            name: "Bathrooms",
            color: "#c53a8c",
            icon: faToilet
        },
        bedroomcnt: {
            name: "Bedrooms",
            color: "#1366cd",
            icon: faBed
        },
        fireplacecnt: {
            name: "Fireplaces",
            color: "#d85d39",
            icon: faFire
        },
        garagecarcnt: {
            name: "Parking Spaces",
            color: "#44168c",
            icon: faWarehouse
        },
        hashottuborspa: {
            name: "Tubs/Spa",
            color: "#2cc36a",
            icon: faBath
        },
        numberofstories: {
            name: "Num of Floors",
            color: "#D8AC39",
            icon: faLayerGroup
        },
        poolcnt: {
            name: "Pools",
            color: "#168C7F",
            icon: faSwimmer
        },
        roomcnt: {
            name: "Num of Rooms",
            color: "#c32dbb",
            icon: faDoorOpen
        },
        yearbuilt: {
            name: "Year Built",
            color: "#298e0c",
            icon: faHome
        },
        lotsizesquarefeet: {
            name: "Lot Size",
            color: "#e1193b",
            icon: faVectorSquare
        },
        finishedsquarefeet12: {
            name: "Square Ft.",
            color: "#ea4747",
            icon: faSquare
        }
    }

export default class FeatureIcon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            value: this.props.value,
            color: data[this.props.type]["color"],
            icon: data[this.props.type]["icon"],
            name: data[this.props.type]["name"]
        }
    }

    render() {
        return (
            <div style={{
                backgroundColor: this.state.color, 
                margin: '20px', 
                height: '100px',
                borderRadius: '8px',
                maxWidth: '260px'
            }}>
                <div style={{
                    margin: 'auto', 
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr'
                }}>
                    <FontAwesomeIcon 
                        color="white" 
                        icon={this.state.icon} 
                        size="3x"
                        style={{gridColumn: '1/2', margin: 'auto'}}
                    />
                    <div style={{gridColumn: '2/3', color: 'white', fontSize: '20px', marginLeft: '10px'}}>
                        <p style={{gridColumn: '2/3', color: 'white', fontWeight: '600', marginBottom: '5px'}}>{this.state.name}</p>
                        <p style={{gridColumn: '2/3', marginTop: '5px'}}>{this.state.value ? this.state.value : 0}</p>
                    </div>
                </div>
            </div>
        );
      }
}