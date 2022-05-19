import React,{useState,useRef} from 'react'
import { YMaps , Map, Placemark,ZoomControl} from 'react-yandex-maps';

import './Map.css';

export default function CustomMap(props) {
    const [center, setcenter] = useState([56.85, 53.2]);
    const [newMarker,setNewMarker]= useState([])
    const [newMarkerAdded,setNewMarkerAdded]= useState(false)
    const [ addressName, setAddressName ] = useState(false);
    const ymaps = useRef(null);
    const allRef = []
    const mapClick = function(point){
        if(props.clickable){
            if(!point.get('coords').geometry){
                setNewMarker(point.get('coords'))
                setNewMarkerAdded(true)
                 window.ymaps.geocode(point.get('coords')).then(res => {
                    let firstGeoObject = res.geoObjects.get(0);
                    setAddressName(firstGeoObject.getAddressLine())
                })
                props.mapClick(point.get('coords'),addressName)
            }
            else{
                setNewMarkerAdded(false)
           }   
        } 
        else{
            allRef.forEach(item=> {
                item.ref.options.set({preset: 'islands#blueIcon'})
            })
        }
    }
    
    const baloonClick = point => (event) => {
        
        allRef.forEach(item=> {
            if(event.get('target') !== item.ref){
                item.ref.options.set({preset: 'islands#blueIcon'})
            }
        })
        event.get('target').options.set({preset: 'islands#redFoodIcon'})
        const clickedMarker = props.markers.find((element) =>{
            return(element.place_id === point.place_id)
        })
        props.markerClick(clickedMarker.place_id)
    }

    return (
        <YMaps query={{
            apikey: '65b3840a-a2a7-4446-af27-1102a32d134b',
            ns: "ymaps",
            }}>
            <Map  modules= {["geolocation", "geocode"]} className="map" defaultState={{ center: center, zoom: 9,controls: []}}  onClick={mapClick} onLoad={(ympasInstance) => (ymaps.current = ympasInstance)} >
                {props.markers.map(marker =>
                    <Placemark 
                        geometry={marker.geometry}
                        modules={[ 'geoObject.addon.hint']}
                        properties={{
                            hintContent: 'place',
                            preset: 'islands#redIcon'
                        }}
                        key={marker.place_id} 
                        onClick={baloonClick(marker)}
                        instanceRef={ref => {
                            allRef.push({"id":marker.place_id,"ref":ref})
                          }}
                          />)}
                {newMarkerAdded && <Placemark 
                        geometry={newMarker}
                        modules={[ 'geoObject.addon.hint']}
                        properties={{
                            hintContent: 'place',
                            preset: 'islands#redIcon'
                        }}
                          />}
                <ZoomControl options={{ float: 'right' }} />
            </Map>
        </YMaps>
  )
}
