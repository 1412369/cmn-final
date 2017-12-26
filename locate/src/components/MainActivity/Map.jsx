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
import { UpdateLocation } from './api.js'

const generateMaker = (drivers, onDragEnd) =>
  drivers.map(({ location, _id }, i) => {
    return <Marker
      key={i}
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
      map: null,
      filter_drivers: [],
      radius:0
    }
    this.geocodeAddress = this.geocodeAddress.bind(this)
    this.updateDriverPosition = this.updateDriverPosition.bind(this)
    this.filterDriversWithRadius = this.filterDriversWithRadius.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const address = nextProps.location && nextProps.location.address
    const drivers = nextProps.drivers && nextProps.drivers
    if (address != this.state.address) {
      this.geocodeAddress(address)
    }
    console.log("receiver_props")
    if(this.state.radius!=0){
      this.filterDriversWithRadius(this.state.radius)
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
          center: results[0].geometry.location,
          filter_drivers:[...drivers]
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
  filterDriversWithRadius(radius) {
    radius = parseFloat(radius)
    let { drivers, updateDrivers } = this.props
    let { center, filter_drivers } = this.state
    let updated_drivers = []
    let driver = "", distance = 0
    for (let i in drivers) {
      driver = new google.maps.LatLng({ ...drivers[i].location })
      let distance = parseFloat(google.maps.geometry.spherical.computeDistanceBetween(driver, center).toFixed(2))
      if (distance <= radius) {
        updated_drivers.push(drivers[i])
      }
    }
    this.setState({ ...this.state, filter_drivers: [...updated_drivers] })
    // updateDrivers(filter_drivers)
  }
  updateDriverPosition(marker, id) {
    const { drivers, updateDrivers } = this.props
    const location = JSON.stringify(marker.latLng)
    UpdateLocation(location, id)
      .then(response => {
        const updated_drivers = drivers.map(driver => {
          if (driver._id === id) {
            driver.location = JSON.parse(location)
          }
          return driver
        })
        updateDrivers(updated_drivers)
        // this.props.fetchDriver()
      })
      .catch(err => {
        throw err
      })
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
    const { center, address,filter_drivers, radius} = this.state
    console.log("filter,",center)
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
            {
              radius !== 0?
              <Circle
                center={center}
                radius={1000}
              />:null
            }
              {
                filter_drivers.length > 0 ?
                  filter_drivers.map(({ location, _id }) => {
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
                        this.updateDriverPosition(marker, _id)
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