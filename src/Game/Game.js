import React from 'react';
import Sign from '../components/sign'
import FeatureIcon from '../components/feature-icon'
import MyMap from '../components/map'
import Data from './data.json'
import './Game.css'
const axios = require('axios');

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          latLong: {
            lat: Data.latitude,
            lng: Data.longitude,
          },
          features: Data.features
        }
        // this.getImageURL(25252674)
    }

    getImageURL = (zpid) => {
      const URL = `https://www.realestate.com/api/details/${zpid}`

      return axios.get(URL)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }

    render() {
        return (
          <div className="Container">
      
            <div style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
      
              {/* SIGN / INPUT BOX */}
              <Sign/>
      
              {/* PROPERTY INFO */}
              <div>

                <div className="MapAndImageGrid">
                  {/* IMAGE OF HOUSE */}
                  <img src="https://photos.zillowstatic.com/cc_ft_1536/ISucdznq3otfml1000000000.webp" 
                    className="Image" 
                  />
      
                  {/* MAP */}
                  <div className="MapContainer">
                    {/* <MyMap latLong={this.state.latLong} /> */}
                  </div>
                </div>
                
                <p className="Address">
                  San Jose, CA 95129
                </p>
              </div>
      
            </div>
      
            <hr style={{margin: '45px'}} />
      
            <p className="FactsAndFeaturesTitle">
              Facts and Features
            </p>
      
            <div className="FactsAndFeaturesGrid">
              {
                Object.keys(this.state.features).map((feature) => (
                  <FeatureIcon
                    key={feature}
                    type={feature}
                    value={this.state.features[feature]}
                  />
                ))
              }
            </div>
            
          </div>
        );
      }
}