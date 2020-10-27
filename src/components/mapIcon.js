import Leaflet from 'leaflet';

import MapIconSvg from '../images/icon-location.svg';

const mapIcon = Leaflet.icon({
    iconUrl: MapIconSvg,

    iconSize: [46, 56]
});

export default mapIcon;