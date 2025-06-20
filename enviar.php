<?php
// Configuración de cabeceras para respuesta
header('Content-Type: text/html; charset=UTF-8');

// Solo acepta método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Acceso no autorizado.';
    exit;
}

// Configuración de emails
$destinatario = 'contacto@tophair.cl'; // Cambiar por el email real del salón
$email_remitente = 'no.reply@tophair.cl'; // Email remitente del sistema

// Recoger datos del formulario con valores por defecto
$nombre = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['phone'] ?? '';
$asunto_form = $_POST['subject'] ?? '';
$mensaje = $_POST['message'] ?? '';

// Validar campos obligatorios
$errores = [];

if (empty(trim($nombre))) {
    $errores[] = 'El nombre es obligatorio';
}

if (empty(trim($email)) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'Email válido es obligatorio';
}

if (empty(trim($telefono))) {
    $errores[] = 'El teléfono es obligatorio';
}

if (empty(trim($asunto_form))) {
    $errores[] = 'El asunto es obligatorio';
}

if (empty(trim($mensaje))) {
    $errores[] = 'El mensaje es obligatorio';
}

// Si hay errores, mostrarlos
if (!empty($errores)) {
    http_response_code(400);
    echo 'Errores de validación: ' . implode(', ', $errores);
    exit;
}

// Limpiar y preparar datos
$nombre = htmlspecialchars(trim($nombre), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars(trim($telefono), ENT_QUOTES, 'UTF-8');
$asunto_form = htmlspecialchars(trim($asunto_form), ENT_QUOTES, 'UTF-8');
$mensaje = htmlspecialchars(trim($mensaje), ENT_QUOTES, 'UTF-8');

// Crear asunto del email codificado en UTF-8
$subject = '=?UTF-8?B?' . base64_encode('Contacto desde TopHair - ' . $asunto_form) . '?=';

// Crear cuerpo del mensaje en texto plano UTF-8
$body = "NUEVO MENSAJE DE CONTACTO DESDE TOPHAIR\n";
$body .= "==========================================\n\n";
$body .= "Nombre: $nombre\n";
$body .= "Email: $email\n";
$body .= "Teléfono: $telefono\n";
$body .= "Asunto: $asunto_form\n\n";
$body .= "Mensaje:\n";
$body .= "$mensaje\n\n";
$body .= "==========================================\n";
$body .= "Enviado desde: " . $_SERVER['HTTP_HOST'] . "\n";
$body .= "Fecha: " . date('d/m/Y H:i:s') . "\n";
$body .= "IP: " . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']) . "\n";

// Configurar cabeceras del email
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';
$headers[] = 'From: TopHair Salon <' . $email_remitente . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Priority: 3';
$headers[] = 'Return-Path: ' . $email_remitente;

// Unir cabeceras
$headers_string = implode("\r\n", $headers);

// Intentar enviar el email
if (mail($destinatario, $subject, $body, $headers_string)) {
    // Éxito
    http_response_code(200);
    echo 'Mensaje enviado con éxito. Te contactaremos pronto.';
    
    // Log opcional (comentar si no se necesita)
    // error_log("Email enviado desde TopHair: $nombre ($email)", 0);
    
} else {
    // Error al enviar
    http_response_code(500);
    echo 'Error al enviar el correo. Intenta más tarde.';
    
    // Log del error (comentar si no se necesita)
    // error_log("Error enviando email desde TopHair: $nombre ($email)", 0);
}

// Finalizar script
exit;
?>