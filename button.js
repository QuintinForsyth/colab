const buttonContainer = document.getElementById('button-container'); 
const content = buttonContainer.nextElementSibling;

export default function createButton(buttonText, clickCallback) {
    const button = document.createElement('button'); 
    button.textContent = buttonText; 
    button.style.backgroundColor = "#999999"
    button.style.margin = '25px';
    button.style.padding = '25px';
    button.style.width = "150px"
    button.style.height = "80px"
    button.style.boxShadow = "0 0 20px rgba(192, 192, 192, 0.8)"; 
    button.style.borderRadius = "10px"; 
    if (button.textContent == "Dark Mode") {
        button.addEventListener('click', () => { 
            console.log("Dark mode button clicked");
            document.body.classList.add('dark-mode');
            document.documentElement.classList.add('dark-mode'); 
            content.classList.add('dark-mode');
            buttonContainer.innerHTML = ''; 
            clickCallback(); 
        }); 
    } else if (button.textContent == "Light Mode") {
        button.addEventListener('click', () => {  
            console.log("Light mode button clicked");
            document.documentElement.classList.remove('dark-mode'); 
            document.body.classList.remove('dark-mode');
            content.classList.remove('dark-mode')
            buttonContainer.innerHTML = ''; 
            clickCallback(); 
        }); 
    }
    else{
        button.addEventListener('click', () => { 
        buttonContainer.innerHTML = ''; 
        clickCallback(); 
        });
    }
    
    button.addEventListener('mouseover', () => { 
        button.classList.add('greyed-out'); 
    });
    button.addEventListener('mouseleave', () => { 
        button.classList.remove('greyed-out'); 
    });
    buttonContainer.appendChild(button);
}