import * as React from 'react'
import { listItem, stateList, container } from './weather-zones.module.css'
import { graphql, useStaticQuery, Link } from 'gatsby';

const WeatherZones = () => {
    const zones = useStaticQuery(graphql`
    query {
        allWeatherZone(sort: {name: ASC}) {
            nodes {
              zoneId
              name
              id
              state
            }
          }
      }`).allWeatherZone.nodes;

      function returnStateList(category) {
        return(<div>
            <div className={stateList}>
            <h2 className={listItem}>{category}</h2>
                {zones.map((zone) => {
                    const link = zone.name.toLowerCase().replaceAll(' ', '-');
                    if(zone.state === category) {
                        return (
                            <li key={zone.id} className={listItem}>
                                <Link to={link} className={listItem}>{zone.name}</Link>
                            </li>
                        )
                    } 
                })}
                </div>
        </div>)
      }

    return(
        <div className={container}>
                {returnStateList("ME")}
                {returnStateList("VT")}
                {returnStateList("NH")}
                {returnStateList("MA")}
                {returnStateList("CT")}
                {returnStateList("RI")}
        </div>
    );
}

export default WeatherZones

