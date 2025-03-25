// ======= VALIDACIÓN DE DATOS DE CONTACTO (PARTE 1) =======
const form = document.getElementById('presupuestoForm');
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');

const errorNombre = document.getElementById('errorNombre');
const errorApellidos = document.getElementById('errorApellidos');
const errorTelefono = document.getElementById('errorTelefono');
const errorEmail = document.getElementById('errorEmail');

// Expresiones regulares para la validación
const regexNombre = /^[a-zA-ZÀ-ÿ\s]{1,15}$/;      // Letras + espacios, máx 15
const regexApellidos = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;   // Letras + espacios, máx 40
const regexTelefono = /^[0-9]{9}$/;               // 9 dígitos
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Formato básico de email

function validarNombre() {
  if (!regexNombre.test(nombreInput.value.trim())) {
    errorNombre.style.display = 'block';
    return false;
  }
  errorNombre.style.display = 'none';
  return true;
}

function validarApellidos() {
  if (!regexApellidos.test(apellidosInput.value.trim())) {
    errorApellidos.style.display = 'block';
    return false;
  }
  errorApellidos.style.display = 'none';
  return true;
}

function validarTelefono() {
  if (!regexTelefono.test(telefonoInput.value.trim())) {
    errorTelefono.style.display = 'block';
    return false;
  }
  errorTelefono.style.display = 'none';
  return true;
}

function validarEmail() {
  if (!regexEmail.test(emailInput.value.trim())) {
    errorEmail.style.display = 'block';
    return false;
  }
  errorEmail.style.display = 'none';
  return true;
}

// Validación al enviar
form.addEventListener('submit', function(event) {
  const nombreValido = validarNombre();
  const apellidosValido = validarApellidos();
  const telefonoValido = validarTelefono();
  const emailValido = validarEmail();

  if (!nombreValido || !apellidosValido || !telefonoValido || !emailValido) {
    event.preventDefault(); // Evita el envío si hay errores
  }
});

// Validación en tiempo real
nombreInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellidos);
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);

// ======= CÁLCULO DE PRESUPUESTO (PARTE 2) =======
const productoSelect = document.getElementById('producto');
const plazoInput = document.getElementById('plazo');
const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
const presupuestoFinalOutput = document.getElementById('presupuestoFinal');

function calcularPresupuesto() {
  //  Precio base
  const precioBase = parseFloat(productoSelect.value) || 0;

  //  Suma de extras
  let extrasTotal = 0;
  extrasCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      extrasTotal += parseFloat(checkbox.value);
    }
  });

  // Descuento 
  const plazo = parseInt(plazoInput.value) || 0;
  const subtotal = precioBase + extrasTotal;
  let descuento = 0;

  if (plazo >= 10) {
    descuento = subtotal * 0.05; // 5%
  }

  const total = subtotal - descuento;

  // Mostrar resultado
  presupuestoFinalOutput.value = total.toFixed(2);
}

// cambios
productoSelect.addEventListener('change', calcularPresupuesto);
plazoInput.addEventListener('input', calcularPresupuesto);
extrasCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', calcularPresupuesto);
});

// Calcular al cargar
window.addEventListener('DOMContentLoaded', calcularPresupuesto);