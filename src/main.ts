import { Layer, Map } from 'leaflet'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="windy"></div>
`

const windyEl = document.querySelector<HTMLDivElement>('#windy')!

windyEl.style.position = 'absolute'
windyEl.style.top = '-80px'
windyEl.style.left = '-80px'
windyEl.style.right = '-80px'
windyEl.style.bottom = '-80px'
windyEl.style.width = 'auto'
windyEl.style.height = 'auto'

const options = {
    key: 'tX73FtupEdcUsq6OclTCOfFJCuF2bhuP', 
    lat: 52.4,
    lon: -2.1,
    zoom: 4,
};

windyInit(options, (windyAPI: any) => {
    (window as any).windyAPI = windyAPI;

    // set pressure as overlay
    windyAPI.store.set('overlay', 'pressure');

    // remove labels
    const map: Map = windyAPI.map;

    let labelsLayer: Layer|undefined
    map.eachLayer((layer: Layer) => {
      // debugger
      if ('tilesUrl' in layer && typeof layer.tilesUrl == 'string' && layer.tilesUrl.includes('/labels/')) {
        labelsLayer = layer
      }
    })
    if (labelsLayer) {
      console.log('Removing labels layer')
      map.removeLayer(labelsLayer)
    }
});
