// Seleciona os elementos HTML onde o tempo será exibido
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Define a data do evento como 6 de julho de 2025 às 13:00 UTC
const eventDate = '2025-07-06T00:13:00Z';

function countdown() {
    // Converte a string da data do evento para um objeto Date
    const eventDateDate = new Date(eventDate);
    // Obtém a data e hora atuais
    const currentDate = new Date();

    // Calcula a diferença total em segundos entre a data do evento e a data atual
    const totalSeconds = (eventDateDate - currentDate) / 1000;
    
    // Converte os segundos totais em dias, horas, minutos e segundos restantes
    const days = Math.floor(totalSeconds / 3600 / 24); // Calcula o número de dias restantes
    const hours = Math.floor(totalSeconds / 3600) % 24; // Calcula as horas restantes após contar os dias
    const minutes = Math.floor(totalSeconds / 60) % 60; // Calcula os minutos restantes após contar as horas
    const seconds = Math.floor(totalSeconds) % 60; // Calcula os segundos restantes após contar os minutos

    // Atualiza os elementos HTML com os valores calculados
    daysElement.innerHTML = days;
    hoursElement.innerHTML = formatTime(hours);
    minutesElement.innerHTML = formatTime(minutes);
    secondsElement.innerHTML = formatTime(seconds);

    // Se a data do evento já passou, exibe "00" em todos os campos
    if (eventDateDate < currentDate) {
        daysElement.innerHTML = '00';
        hoursElement.innerHTML = '00';
        minutesElement.innerHTML = '00';
        secondsElement.innerHTML = '00';
    }
}

// Função para garantir que os valores tenham sempre dois dígitos (ex: "09" em vez de "9")
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Executa a contagem regressiva imediatamente ao carregar a página
countdown();

// Atualiza a contagem regressiva a cada segundo
setInterval(countdown, 1000);
