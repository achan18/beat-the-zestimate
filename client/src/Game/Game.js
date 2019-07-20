import React from 'react';
import SignSubmit from '../components/signSubmit'
import FeatureIcon from '../components/featureIcon'
import MyMap from '../components/map'
import './Game.css'
const axios = require('axios');

var google_api_key = 'AIzaSyCI-HS5B4EwhmmPlZPJmBXad5uZUjGOFHA'

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        const URL =  `http://localhost:8081/property`;

        this.state = {
          latLong: {
            lat: null,
            lng: null,
          },
          features: {},
          image_url: null
        }

        axios.get(URL).then((res) => {
          res = res.data
          console.log(res)

          this.setState(() => ({
            latLong: {
              lat: res.latitude,
              lng: res.longitude,
            },
            features: res.features,
            image_url: res.images.length > 0 ? res.images[0] : 
              `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${res.address.label}&key=${google_api_key}`,
            formatted_address: res.address.label,
            zpid: res.zpid,
            parcelid: res.parcelid,
            username: this.props.location.state.username
          }))
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
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
      
            <div className="SignAndMapImageGrid">
      
              {/* SIGN / INPUT BOX */}
              <SignSubmit 
                username={this.state.username}
                parcelid={this.state.parcelid}
                zpid={this.state.zpid}
              />
      
              {/* PROPERTY INFO */}
              <div>

                <div className="MapAndImageGrid">

                  {/* IMAGE OF HOUSE */}
                  <img src={this.state.image_url}
                    alt="Property"
                    className="Image" 
                  />

      
                  {/* MAP */}
                  <div className="MapContainer">
                    <MyMap latLong={this.state.latLong} />
                  </div>
                </div>
                
                <p className="Address">
                  {this.state.formatted_address}
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