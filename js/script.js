'use strict';

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=1&size=med';

const dogImage = document.getElementById('dog-image');
const loadText = document.getElementById('load-text');
const fetchButton = document.getElementById('fetch-button');
const errorText = document.getElementById('error-text');

async function fetchDogImage() {
  try {
 
    if (dogImage) dogImage.style.display = 'none';
    if (loadText) loadText.style.display = 'block';
    if (errorText) errorText.style.display = 'none';

    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data && data.length > 0 && data[0].url) {
      if (dogImage) {
        dogImage.src = data[0].url;
        dogImage.alt = 'Cachorro fofo aleatório';
        dogImage.style.display = 'block';
      }
      if (loadText) loadText.style.display = 'none';
    } else {
      throw new Error('Nenhuma imagem encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    if (loadText) loadText.style.display = 'none';
    if (errorText) {
      errorText.textContent = `Erro: ${error.message}`;
      errorText.style.display = 'block';
    }
  }
}

if (fetchButton) {
  fetchButton.addEventListener('click', fetchDogImage);
}

document.addEventListener('DOMContentLoaded', fetchDogImage);

