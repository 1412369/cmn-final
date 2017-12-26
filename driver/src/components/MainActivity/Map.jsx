/* eslint-disable no-undef */
import _ from 'lodash'
import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  SearchBox,
  InfoWindow, Circle, DirectionsRenderer
} from "react-google-maps"
import { compose, withProps } from 'recompose'


const generateMaker = (drivers, onDragEnd) =>
  drivers.map(({ location, _id }, index) => {
    return <Marker
      key={index}
      position={location}
      defaultVisible={true}
      icon={{
        url: '/bike.png',
        scaledSize: new google.maps.Size(50, 50)
      }}
      draggable={true}
      onDragEnd={onDragEnd(_id)}
    />
  })
class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      address: "227 nguyen van cu",
      center: {},
      map: null
    }
    this.geocodeAddress = this.geocodeAddress.bind(this)
    this.updateDriverPosition = this.updateDriverPosition.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const address = nextProps.location && nextProps.location.address
    const drivers = nextProps.drivers && nextProps.drivers
    if (address != this.state.address) {
      this.geocodeAddress(address)
    }
  }
  geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        this.setState({
          ...this.state,
          center: results[0].geometry.location,
          address: address
        })
      }
    })
  }
  componentDidMount() {
    const { address } = this.state
    const { drivers } = this.props
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        this.setState({
          ...this.state,
          center: results[0].geometry.location
        })
      }
    })
    // DirectionsService.route({
    //   origin: new google.maps.LatLng(10.7626272, 106.6805864),
    //   destination: new google.maps.LatLng(10.7626372, 106.6850864),
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  }
  updateDriverPosition(marker,id){
    console.log("update",marker,id)
  }
  onMapLoad(map) {
    if (this.state.map === null) {
      this.setState({
        ...this.state,
        map
      })
    }
  }
  onBoundsChanged() {
    const { map, center } = this.state
  }
  render() {
    const { center, address } = this.state
    const { drivers } = this.props
    return (
      <div>
        {
          Object.keys(center).length > 0 ?
            <GoogleMap
              defaultZoom={15}
              center={center}
              onBoundsChanged={this.onBoundsChanged.bind(this)}
              ref={this.onMapLoad.bind(this)}
            >
              <Circle
                center={center}
                radius={1000}
              />
              {
                drivers.length > 0 ?
                  drivers.map(({ location, _id }) => {
                    return <Marker
                      key={_id}
                      position={location}
                      defaultVisible={true}
                      name="name"
                      icon={{
                        url: '/bike.png',
                        scaledSize: new google.maps.Size(50, 50)
                      }}
                      draggable={true}
                      onDragEnd={(marker) => {
                        this.updateDriverPosition(marker,_id)
                      }}
                    />
                  })
                  : ""
              }
              {/* <DirectionsRenderer directions={props.directions} /> */}
              <Marker
                position={center}
                defaultVisible={true}
              // icon={{
              //   url: 'image/user.png',
              //   scaledSize: new google.maps.Size(30, 30)
              // }}
              >
                <InfoWindow><div>{address}</div></InfoWindow>
              </Marker>
            </GoogleMap >
            : <h2>Loading</h2>
        }
      </div>
    )


  }
}
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCScHlkcWZyzl7P0MfNYutchAEzoSzAUgU&libraries=geometry,drawing,places&sensor=false",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `520px` }} />,
    mapElement: <div style={{ height: `100%`, width: "930px" }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map)
export default MyMapComponent