console.log('%c HI', 'color: firebrick')

// src/index.js


document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    const dogImageContainer = document.getElementById('dog-image-container')
    const dogBreedsList = document.getElementById('dog-breeds')
    const breedDropdown = document.getElementById('breed-dropdown')
    const noBreedsMessage = "No dog names start with: ";
  
    // Fetch dog images on page load
    fetchImages();
  
    // Fetch dog breeds on page load
    fetchBreeds();
  
    function fetchImages() {
        fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
          const images = data.message;
          images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            dogImageContainer.appendChild(img);
          });
        })
        .catch(error => {
          console.error('Error fetching dog images:', error);
        });
    }
  
    function fetchBreeds() {
      fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
          const breeds = data.message;
          displayBreeds(breeds);
          addClickEventToBreeds();
          addChangeEventToDropdown()
        })
        .catch(error => {
          console.error('Error fetching dog breeds:', error);
        });
    }
  
    function displayBreeds(breeds) {
      for (const breed in breeds) {
        const breedListItem = document.createElement('li');
        breedListItem.textContent = breed;
        dogBreedsList.appendChild(breedListItem);
      }
    }
  
    function addClickEventToBreeds() {
      const breedListItems = dogBreedsList.getElementsByTagName('li');
      for (const listItem of breedListItems) {
        listItem.addEventListener('click', function() {
          this.style.color = 'blue'; // Change font color to blue upon click
        });
      }
    }
    
    function addChangeEventToDropdown() {
        breedDropdown.addEventListener('change', function() {
          const selectedLetter = this.value.toLowerCase();
          const breedListItems = dogBreedsList.getElementsByTagName('li');
          let breedsFound = false;
          
          for (const listItem of breedListItems) {
            const breedName = listItem.textContent.toLowerCase();
            if (breedName.startsWith(selectedLetter)) {
              listItem.style.display = 'block'; // Show the breed if its name starts with the selected letter
              breedsFound = true;
            } else {
              listItem.style.display = 'none'; // Hide the breed otherwise
            }
          }
    
          if (!breedsFound) {
            alert(noBreedsMessage + selectedLetter.toUpperCase());
          }
        });
      }
    });