document.getElementById("maps-tab").classList.add('active');
const panoContainer = document.querySelector('.pano-container');
const directionContainer = document.getElementById("typed-direction-container");
counter = 1;

const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
tabs.forEach(tab => {
    tab.addEventListener('click', ()=> {

        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(element => {
            element.classList.remove('active');
        });
        target.classList.add('active');

        if(panoContainer.innerHTML === ""){
            const panorama = new PANOLENS.ImagePanorama('images/panel1.jpeg');

            const viewer = new PANOLENS.Viewer({
                initialLookAt: new THREE.Vector3( 2953.93, 1891.55, 5213.46 ),
                container: panoContainer
            });
            viewer.add(panorama);
        }
        
        if(counter <= 8){
            directionContainer.innerHTML += '<span id="directions-' + counter + '" class="written-direction">This is a test span\n</span>';
            counter += 1;
        }

        tabs.forEach(element => {
            element.classList.remove('active');
        });
        tab.classList.add('active');
        
    })
});
