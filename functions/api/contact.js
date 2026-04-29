export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    // Configuración de Resend
    const resendApiKey = env.RESEND_API_KEY;
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SASIGLOBAL <onboarding@resend.dev>', // Cambia esto por tu dominio verificado luego
        to: ['albertg2109@gmail.com'], // Recibes el aviso tú
        reply_to: email,
        subject: `NUEVO PROSPECTO: ${name} - SASIGLOBAL`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #dc143c;">Nuevo Requerimiento de Cliente</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
              ${message || 'Sin mensaje adicional.'}
            </div>
            <hr>
            <p style="font-size: 10px; color: #999;">Enviado automáticamente desde el Portafolio SASIGLOBAL</p>
          </div>
        `
      })
    });

    // Enviar también el correo de bienvenida al cliente
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SASIGLOBAL <onboarding@resend.dev>',
        to: [email],
        subject: 'Protocolo de Contacto Iniciado - SASIGLOBAL',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 40px;">
            <h2 style="color: #dc143c; text-transform: uppercase; letter-spacing: 2px;">SASIGLOBAL | Ingeniería Geoespacial</h2>
            <p>Estimado/a <strong>${name}</strong>,</p>
            <p>Es un honor para nosotros recibir su interés en nuestras soluciones avanzadas.</p>
            <p>Un asesor de nuestro equipo ejecutivo revisará su requerimiento y se pondrá en contacto en las próximas 24 horas.</p>
            <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #dc143c; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;"><em>"Transformando el territorio a través de la precisión tecnológica."</em></p>
            </div>
            <p>Adjunto a este protocolo, puede consultar nuestro portafolio digital en nuestra web.</p>
            <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">SASIGLOBAL SAS - Colombia</p>
          </div>
        `
      })
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
