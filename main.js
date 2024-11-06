import createButton from './buttonScript.js';

export function main(){
    createButton("Play",() => {
        console.log("Going to weather app!")
        window.location.replace('openweather.html');
    });
    
}
