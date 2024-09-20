const salarioInput = document.querySelector('.input-salario');
const agregarBtn = document.querySelector('.agregar-btn');
const gastosDiv = document.getElementById('gastos');
const calcularBtn = document.getElementById('calcular-btn');
const limpiarBtn = document.getElementById('limpiar-btn'); // Botón limpiar
const totalGastosSpan = document.getElementById('total-gastos');
const salarioValorSpan = document.getElementById('salario-valor');

let gastos = [];
let salario = 0;

// Inicializa el gráfico
const ctx = document.getElementById('gastosChart').getContext('2d');
let gastosChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Gastos Totales', 'Ahorro Mensual', 'Ahorro Anual'],
        datasets: [{
            label: 'Cantidad en $',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black' // Cambia el color de la leyenda
                }
            }
        }
    }
});

// Actualizar el salario en tiempo real
salarioInput.addEventListener('input', () => {
    salario = parseFloat(salarioInput.value) || 0;
    salarioValorSpan.textContent = `$${salario.toFixed(0)}`;
});

// Agregar gasto
agregarBtn.addEventListener('click', () => {
    const gastoInput = document.querySelector('.input-gasto');
    const valorInput = document.querySelector('.input-valor');
    
    const gasto = gastoInput.value;
    const valor = parseFloat(valorInput.value);

    if (gasto && !isNaN(valor) && valor > 0) {
        gastos.push({ gasto, valor });
        
        const gastoItem = document.createElement('div');
        gastoItem.textContent = `${gasto}: $${valor.toFixed(2)}`;
        gastosDiv.appendChild(gastoItem);

        // Limpiar inputs
        gastoInput.value = '';
        valorInput.value = '';
    } else {
        alert("Por favor ingrese un gasto válido.");
    }
});

// Calcular total de gastos y ahorros
calcularBtn.addEventListener('click', () => {
    const totalGastos = gastos.reduce((acc, curr) => acc + curr.valor, 0);
    
    const ahorroMensual = salario - totalGastos;
    const ahorroAnual = ahorroMensual * 12;

    // Actualizar el total de gastos en el DOM
    totalGastosSpan.textContent = `$${totalGastos.toFixed(2)}`;

    // Actualizar gráfico
    gastosChart.data.datasets[0].data = [totalGastos, ahorroMensual, ahorroAnual];
    gastosChart.update();
});

// Limpiar la lista y datos
limpiarBtn.addEventListener('click', () => {
    gastos = [];
    salario = 0;
    salarioInput.value = '';
    salarioValorSpan.textContent = `$0`;
    totalGastosSpan.textContent = `$0`;
    gastosDiv.innerHTML = ''; // Limpiar la lista de gastos
    gastosChart.data.datasets[0].data = [0, 0, 0]; // Resetear gráfico
    gastosChart.update();
});
