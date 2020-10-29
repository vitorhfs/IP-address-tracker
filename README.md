This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Project from Front-end Mentor

![homepage](https://github.com/vitorhfs/IP-address-tracker/blob/main/src/images/screenshot%20(1).jpg?raw=true)

The project was initially built with create-react-app, along with the dependencies: 

leaflet and react-leaflet - Map component with inumerous features that makes map control in react easy to customize.
axios - To fetch data from the IP API's.

The CSS was built in SCSS, divided by page sector for a clean stylesheet.

![search result](https://github.com/vitorhfs/IP-address-tracker/blob/main/src/images/screenshot%20(2).jpg?raw=true)

You can see the challenge here: https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0.

This website shows you the exact location of your server and your IP address the moment you access it, the search will respond you with the same informations of any existent IP address or domain name, if your search is wrong the page will send you an alert.

The [IPify API](https://www.ipify.org/) serves us with our own IP address that autocomplete with the loaded page and also takes care of the searched IP. This operation was made using useEffect hook to re-render everytime our api object is overwritten.

I hope you liked my project and let me know if I miss some point or if you have some ideia to improve this page. :)