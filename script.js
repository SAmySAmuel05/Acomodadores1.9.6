document.addEventListener("DOMContentLoaded", () => {
    const auditorium = document.getElementById("auditorium");
    const zoneSummary = document.getElementById("zoneSummary");
    const overallSummary = document.getElementById("overallSummary");
    const resetButton = document.getElementById("resetButton");
    const overallSummaryButton = document.getElementById("overallSummaryButton");
    const zoneButtons = document.querySelectorAll(".zone-button");
    const passwordInput = document.getElementById("passwordInput");
    const submitPasswordButton = document.getElementById("submitPasswordButton");
    const buttonContainer = document.getElementById("buttonContainer");
    const errorMessage = document.getElementById("errorMessage");
    const removeSeatsButton = document.getElementById("removeSeatsButton");
    const restoreSeatsButton = document.getElementById("restoreSeatsButton");
    const passwordSection = document.getElementById("passwordSection");
    const showZonesButton = document.getElementById("showZonesButton");
    const zonesMenu = document.getElementById("zonesMenu");
    const closeButton = document.querySelector(".close-button");
    const colorModeToggle = document.getElementById("color_mode");
    const acomodadoresSection = document.getElementById("acomodadoresSection");
    const guardarAcomodadoresButton = document.getElementById("guardarAcomodadoresButton");
    const acomodadoresModal = document.getElementById("acomodadoresModal");
    const closeModal = document.querySelector(".close");
    const acomodadoresInput = document.getElementById("acomodadoresInput");
    const resetAcomodadoresButton = document.getElementById("resetAcomodadoresButton"); // Nuevo botón
    const specifications = document.getElementById("specifications");

    let seats = [];
    let currentZone = null;
    let isSpecialMode = false;
    let isRemoveMode = false;
    

    let acomodadoresPorZona = JSON.parse(localStorage.getItem('acomodadoresPorZona')) || {};

// Función para cerrar el modal
closeModal.addEventListener("click", () => {
    acomodadoresModal.style.display = "none";
});

// Event listener para guardar el número de acomodadores
guardarAcomodadoresButton.addEventListener("click", () => {
    const numeroAcomodadores = parseInt(acomodadoresInput.value) || 0;

    if (currentZone) {
        acomodadoresPorZona[currentZone] = numeroAcomodadores;
        localStorage.setItem('acomodadoresPorZona', JSON.stringify(acomodadoresPorZona));
        acomodadoresInput.value = ''; // Limpiar el input después de guardar
        acomodadoresModal.style.display = "none"; // Cerrar el modal después de guardar
    } else {
        alert('Por favor, seleccione una zona primero.');
    }
});

function selectZone(zone) {
    currentZone = zone; // Asegúrate de que esta variable esté definida
    acomodadoresModal.style.display = "block";
}

document.querySelectorAll('.zone-button').forEach(zone => {
    zone.addEventListener('click', () => {
        selectZone(zone.getAttribute("data-zone")); // Usar el atributo data-zone
    });
});

resetAcomodadoresButton.addEventListener("click", () => {
    acomodadoresPorZona = {}; // Reiniciar el objeto
    localStorage.setItem('acomodadoresPorZona', JSON.stringify(acomodadoresPorZona));
});

    document.addEventListener('DOMContentLoaded', () => {
        adjustImageSize();
        window.addEventListener('resize', adjustImageSize);
    });
    document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('passwordInput');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});


    function adjustImageSize() {
        const auditoriumContainer = document.getElementById('auditoriumContainer');
        const screenContainer = document.querySelector('.screen-container');
        const containerWidth = auditoriumContainer.clientWidth;
    
        screenContainer.style.maxWidth = `${containerWidth * 0.8}px`;
    }

    // Modo oscuro
    const applyDarkMode = () => {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add("dark-mode");
            colorModeToggle.checked = true;
        } else {
            document.body.classList.remove("dark-mode");
            colorModeToggle.checked = false;
        }
    };

    applyDarkMode();

    colorModeToggle.addEventListener("change", () => {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
        if (darkModeEnabled) {
            localStorage.setItem('darkMode', 'disabled');
        } else {
            localStorage.setItem('darkMode', 'enabled');
        }
        applyDarkMode();
    });

    showZonesButton.addEventListener("click", () => {
        zonesMenu.classList.remove("hidden");
        zonesMenu.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        zonesMenu.classList.add("hidden");
        zonesMenu.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === zonesMenu) {
            zonesMenu.classList.add("hidden");
            zonesMenu.style.display = "none";
        }
    });

    const zoneConfigurations = {
        A: { rows: 15, cols: 25 },
        B: { rows: 14, cols: 14 },
        C: { rows: 13, cols: 13 },
        D: { rows: 10, cols: 11 },
        E: { rows: 12, cols: 10 },
        F: { rows: 12, cols: 10 },
        G: { rows: 12, cols: 10 },
        H: { rows: 12, cols: 10 },
        I: { rows: 12, cols: 10 },
        J: { rows: 12, cols: 10 },
        K: { rows: 12, cols: 10 },
        L: { rows: 12, cols: 10 },
        M: { rows: 12, cols: 10 },
        N: { rows: 12, cols: 10 },
        O: { rows: 12, cols: 10 },
        P: { rows: 12, cols: 10 },
        Q: { rows: 12, cols: 10 },
        R: { rows: 12, cols: 10 },
        S: { rows: 12, cols: 10 },
        T: { rows: 12, cols: 10 },
        U: { rows: 12, cols: 10 },
        V: { rows: 12, cols: 10 },
        W: { rows: 12, cols: 10 },
        X: { rows: 12, cols: 10 },
        Y: { rows: 12, cols: 10 },
        Z: { rows: 12, cols: 10 },
    };

    const savedSeats = JSON.parse(localStorage.getItem('seats')) || {};


    zoneButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentZone = button.getAttribute("data-zone");
            highlightSelectedZone(button);
            showZoneSeats(currentZone);
            zonesMenu.classList.add("hidden");
            zonesMenu.style.display = "none";
        });
    });
    
    zoneButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentZone = button.getAttribute("data-zone");
            highlightSelectedZone(button);
            showSeats(currentZone);
            zonesMenu.classList.add("hidden");
            zonesMenu.style.display = "none";
        });
    });

    zoneButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedZone = button.getAttribute("data-zone");
            const zoneName = button.textContent.trim(); // Obtenemos el texto del botón
            selectedZoneText.textContent = `${zoneName}`;
            zonesMenu.classList.add("hidden");
            zonesMenu.style.display = "none";
        });
    });
    showZonesButton.addEventListener("click", function() {
        zonesMenu.classList.remove("hidden");
    });

    closeButton.addEventListener("click", function() {
        zonesMenu.classList.add("hidden");
    });

    zoneButtons.forEach(button => {
        button.addEventListener("click", function() {
            const zone = button.getAttribute("data-zone");
            selectedZoneText.textContent = `Zona 3: ${zone}`;
            zonesMenu.classList.add("hidden");

            // Mostrar la sección de especificaciones al seleccionar una zona
            specifications.style.display = "flex";
        });
    });


function showZoneSeats(zone) {
    const auditoriumContainer = document.querySelector(".auditorium-container");
    auditoriumContainer.style.display = "block"; // Mostrar el contenedor del auditorio
    auditorium.style.display = "block";
    showSeats(zone);
}

    removeSeatsButton.addEventListener("click", () => {
        isRemoveMode = !isRemoveMode;
        removeSeatsButton.classList.toggle("active", isRemoveMode);
    });

    resetButton.addEventListener("click", resetSeats);
    overallSummaryButton.addEventListener("click", showOverallSummary);
    restoreSeatsButton.addEventListener("click", restoreSeats);

    function showSeats(zone) {
        auditorium.innerHTML = '';
        seats = [];
        auditorium.style.display = 'grid';
    
        const config = zoneConfigurations[zone];
        const zoneSeats = savedSeats[zone] || Array(config.rows * config.cols - countTotalBlankSpaces(config.blankSpaces)).fill("false");
    
        const columns = getColumnLabels(config.cols);
        const rows = getRowLabels(config.rows);
    
        auditorium.style.gridTemplateColumns = `repeat(${config.cols + 1}, minmax(var(--seat-size), 1fr))`;
    
        // Añadir etiquetas de fila y asientos
        let seatIndex = 0;
        for (let i = 0; i < config.rows; i++) {
            // Añadir etiqueta de fila
            const rowLabel = document.createElement("div");
            rowLabel.classList.add("row-label");
            rowLabel.textContent = rows[i];
            auditorium.appendChild(rowLabel);
    
            for (let j = 0; j < config.cols; j++) {
                const isBlank = config.blankSpaces?.some(space => space.row === i && space.col === j);
                if (isBlank) {
                    const blankDiv = document.createElement("div");
                    blankDiv.classList.add("blank-space");
                    auditorium.appendChild(blankDiv);
                } else {
                    const seat = createSeat(zoneSeats[seatIndex]);
                    
                        if (rows[i] === 'A' || rows[i] === 'B' || rows[i] === 'C') {
                            const img = document.createElement("img");
                            img.src = "Imagenes/Necesidades.png"; // Ruta de tu imagen
                            img.classList.add("seat-img");
                            seat.appendChild(img);
                            seat.classList.add("needs-special"); // Asigna la clase needs-special
                        }
                    
                        seats.push(seat);
                        auditorium.appendChild(seat);
                        seatIndex++;


                }
            }
        }
    
        // Añadir etiquetas de columna inferior
        const emptyDivBottom = document.createElement("div");
        emptyDivBottom.classList.add("label-space");
        auditorium.appendChild(emptyDivBottom);
    
        columns.forEach(col => {
            const colLabel = document.createElement("div");
            colLabel.classList.add("column-label");
            colLabel.textContent = col;
            auditorium.appendChild(colLabel);
        });
    
        updateSummary();
    }

    function getColumnLabels(cols) {
        let labels = [];
        for (let i = 1; i <= cols; i++) {
            labels.push(i);
        }
        return labels;
    }
    
    function getRowLabels(rows) {
        let labels = [];
        for (let i = 0; i < rows; i++) {
            labels.push(String.fromCharCode(65 + i));
        }
        return labels;
    }

    function createSeat(status, row) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.dataset.occupied = status;
        if (status === "true") {
            seat.classList.add("occupied");
            if (row === 'A' || row === 'B' || row === 'C') {
                seat.classList.add("occupied-with-img");
            }
        } else if (status === "special") {
            seat.classList.add("needs-special");
        } else if (status === "inactive") {
            seat.classList.add("inactive");
        }
    
        seat.addEventListener("click", () => toggleSeat(seat));
    
        // Añadir imagen a las filas A, B, C
        if (row === 'A' || row === 'B' || row === 'C') {
            const img = document.createElement("img");
            img.src = "img/seated.png"; // Ruta de tu imagen
            img.classList.add("seat-img");
            seat.appendChild(img);
        }
    
        return seat;
    }

    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied') && !seat.classList.contains('occupied-with-img')) {
                occupySeat(seat);
            }
        });
    });

function occupySeat(seat) {
    if (seat.classList.contains("needs-special")) {
        seat.classList.add("occupied-with-img");
        seat.classList.remove("needs-special"); // Quitar la clase needs-special cuando esté ocupado
    } else {
        seat.classList.add("occupied");
    }
    seat.classList.remove("free");
}

    function toggleSeat(seat) {
        if (isRemoveMode) {
            seat.dataset.occupied = "inactive";
            seat.classList.add("inactive");
        } else if (isSpecialMode) {
            if (seat.dataset.occupied === "special") {
                seat.dataset.occupied = "false";
                seat.classList.remove("needs-special");
            } else {
                seat.dataset.occupied = "special";
                seat.classList.add("needs-special");
            }
        } else {
            if (seat.dataset.occupied === "special") {
                seat.dataset.occupied = "true";
                seat.classList.remove("needs-special");
                seat.classList.add("occupied");
            } else {
                seat.dataset.occupied = seat.dataset.occupied === "false" ? "true" : "false";
                seat.classList.toggle("occupied");

                if (seat.querySelector(".seat-img")) {
                    if (seat.dataset.occupied === "true") {
                        seat.classList.add("occupied-with-img");
                    } else {
                        seat.classList.remove("occupied-with-img");
                    }
                }    
            }
        }
        updateSummary();
        saveSeats();
    }

    function saveSeats() {
        const seatStatus = seats.map(seat => seat.dataset.occupied);
        savedSeats[currentZone] = seatStatus;
        localStorage.setItem('seats', JSON.stringify(savedSeats));
    }

    function updateSummary() {
        const occupiedSeats = seats.filter(seat => seat.dataset.occupied === "true" || seat.dataset.occupied === "special").length;
        const totalSeats = seats.filter(seat => seat.dataset.occupied !== "inactive").length;
        zoneSummary.textContent = `Zona ${currentZone} - Total de asientos: ${totalSeats}, Ocupados: ${occupiedSeats}, Libres: ${totalSeats - occupiedSeats}`;
    }

    function resetSeats() {
        seats.forEach(seat => {
            if (seat.dataset.occupied !== "inactive") {
                seat.dataset.occupied = "false";
                seat.classList.remove("occupied", "needs-special");
            }
        });
        updateSummary();
        saveSeats();
    }

    function restoreSeats() {
        seats.forEach(seat => {
            if (seat.dataset.occupied === "inactive") {
                seat.dataset.occupied = "false";
                seat.classList.remove("inactive");
            }
        });
        updateSummary();
        saveSeats();
    }

    function highlightSelectedZone(selectedButton) {
        zoneButtons.forEach(button => button.classList.remove("selected-zone"));
        selectedButton.classList.add("selected-zone");
    }

    

    function showOverallSummary() {
        let totalOccupied = 0;
        let totalSeats = 0;
        let totalAcomodadores = 0;
    
        for (let zone in zoneConfigurations) {
            const config = zoneConfigurations[zone];
            const zoneSeatStatus = savedSeats[zone] || Array(config.rows * config.cols - countTotalBlankSpaces(config.blankSpaces)).fill("false");
            const zoneTotalSeats = zoneSeatStatus.filter(status => status !== "inactive").length;
            const zoneOccupiedSeats = zoneSeatStatus.filter(status => status === "true" || status === "special").length;
    
            totalSeats += zoneTotalSeats;
            totalOccupied += zoneOccupiedSeats;
    
            if (acomodadoresPorZona[zone]) {
                totalAcomodadores += acomodadoresPorZona[zone];
            }
        }
    
        overallSummary.textContent = `Asistencia General - Total de asientos: ${totalSeats}, Ocupados: ${totalOccupied}, Libres: ${totalSeats - totalOccupied}, Total de acomodadores: ${totalAcomodadores}`;
    }
    

    function countTotalBlankSpaces(blankSpaces) {
        return blankSpaces ? blankSpaces.length : 0;
    }

    submitPasswordButton.addEventListener("click", () => {
        const enteredPassword = passwordInput.value;
        const correctPassword = "1234";

        if (enteredPassword === correctPassword) {
            passwordSection.style.display = "none";
            resetButton.disabled = false;
            overallSummaryButton.disabled = false;
            removeSeatsButton.disabled = false;
            restoreSeatsButton.disabled = false;
            errorMessage.style.display = 'none';
            buttonContainer.style.display = "flex";
        } else {
            errorMessage.style.display = "block";
        }
    });

    window.addEventListener("keydown", event => {
        if (event.key === "Enter" && passwordSection.style.display !== "none") {
            submitPasswordButton.click();
        }
    });

    const resizeSeats = () => {
        if (window.innerWidth < 600) {
            auditorium.style.gridTemplateColumns = `repeat(auto-fill, minmax(${getComputedStyle(document.documentElement).getPropertyValue('--seat-size-mobile')}, 1fr))`;
        } else {
            auditorium.style.gridTemplateColumns = `repeat(auto-fit, minmax(${getComputedStyle(document.documentElement).getPropertyValue('--seat-size')}, 1fr))`;
        }
        if (currentZone) {
            showSeats(currentZone); // Re-render seats to maintain layout
        }
    };

    window.addEventListener("resize", resizeSeats);
    resizeSeats();
    
});

