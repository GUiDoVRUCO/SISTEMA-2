// Lista de horários disponíveis para a barbearia
const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

// Duração de cada serviço (em minutos)
const serviceDurations = {
    "reflexo": 30,
    "nevou": 45,
    "luzes": 90,
    "pigmentacao": 60,
    "alinhamento": 20,
    "alisamento": 120
};

// Preços de cada serviço
const servicePrices = {
    "reflexo": 70,
    "nevou": 80,
    "luzes": 300,
    "pigmentacao": 200,
    "alinhamento": 80,
    "alisamento": 350
};

// Lista para armazenar os horários ocupados
const bookedTimes = new Set();

// Função para converter uma hora no formato HH:MM para minutos desde a meia-noite
function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Função para converter minutos desde a meia-noite para o formato HH:MM
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Função para atualizar a lista de horários disponíveis e o menu de seleção
function updateSchedule() {
    const timeSlotsList = document.getElementById("timeSlots");
    const timeSelect = document.getElementById("timeSelect");
    const selectedService = document.getElementById("serviceSelect").value;
    const serviceDuration = serviceDurations[selectedService] || 0;

    // Limpar as listas
    timeSlotsList.innerHTML = '';
    timeSelect.innerHTML = '';

    // Criar conjunto de horários indisponíveis
    let unavailableTimes = new Set();

    // Adicionar horários ocupados
    bookedTimes.forEach(time => {
        const endTime = minutesToTime(timeToMinutes(time) + serviceDuration);
        for (let currentTime = timeToMinutes(time); currentTime < timeToMinutes(endTime); currentTime += 30) {
            unavailableTimes.add(minutesToTime(currentTime));
        }
    });

    // Adicionar horários disponíveis
    timeSlots.forEach(time => {
        const isAvailable = !unavailableTimes.has(time);
        // Criar o item da lista
        const listItem = document.createElement("li");
        listItem.textContent = time + (isAvailable ? " (Disponível)" : " (Ocupado)");
        listItem.className = isAvailable ? "available" : "booked";
        timeSlotsList.appendChild(listItem);

        // Criar a opção do menu de seleção
        if (isAvailable) {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    });
}

// Função para agendar um horário
function bookTime() {
    const selectedTime = document.getElementById("timeSelect").value;
    const selectedService = document.getElementById("serviceSelect").value;
    const serviceDuration = serviceDurations[selectedService] || 0;
    const servicePrice = servicePrices[selectedService] || 0;

    if (selectedTime && selectedService) {
        bookedTimes.add(selectedTime);
        alert(`Horário agendado para ${selectedTime} com o serviço de ${selectedService}. Preço: R$ ${servicePrice}.`);
        updateSchedule();
    } else {
        alert("Por favor, selecione um horário e um serviço.");
    }
}

// Inicializar o sistema
document.addEventListener("DOMContentLoaded", () => {
    updateSchedule();
});
