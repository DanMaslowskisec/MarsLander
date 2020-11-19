// login form
var hidden = false;
function toggle() {
    if (hidden) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eyeSlash").style.color = '#7a797e';
        hidden = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eyeSlash").style.color = 'rgba(255, 0, 0, .85)';
        hidden = true;
    }
}



