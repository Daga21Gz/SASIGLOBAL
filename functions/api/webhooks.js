export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const payload = await request.json();
    const { type, data } = payload;

    // Log del evento recibido para diagnóstico
    console.log(`Webhook recibido: ${type}`, data);

    // Identificar el evento
    // Resend envía eventos como 'email.opened' o 'email.clicked'
    if (type === 'email.opened') {
      const email = data.to[0];
      const subject = data.subject;
      
      // Enviar alerta interna a Albert
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SASI<span style="color:#dc143c">GLOBAL</span> Radar <onboarding@resend.dev>',
          to: ['albertg2109@gmail.com'],
          subject: `👀 INTERÉS DETECTADO: El cliente ${email} abrió tu propuesta`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #0f172a; border-left: 5px solid #dc143c;">
              <h2 style="color: #0f172a; margin: 0;">Radar de Actividad</h2>
              <p>El cliente <strong>${email}</strong> acaba de abrir el correo: <em>"${subject}"</em>.</p>
              <p style="color: #dc143c; font-weight: 800;">¡Es un buen momento para un seguimiento!</p>
              <hr>
              <p style="font-size: 10px; color: #94a3b8;">SASIGLOBAL Intelligence Webhook System</p>
            </div>
          `
        })
      });
    }

    if (type === 'email.clicked') {
      const email = data.to[0];
      const url = data.click.url;

      // Alerta de Click (Máxima prioridad)
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SASI<span style="color:#dc143c">GLOBAL</span> Alert <onboarding@resend.dev>',
          to: ['albertg2109@gmail.com'],
          subject: `🔥 ALERTA ROJA: ${email} hizo clic en tu portafolio`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #0f172a; border-left: 5px solid #dc143c; background: #fff5f5;">
              <h2 style="color: #dc143c; margin: 0;">Intención de Compra Detectada</h2>
              <p>El prospecto <strong>${email}</strong> ha hecho clic en el siguiente recurso:</p>
              <div style="background: white; padding: 10px; border: 1px solid #eee;">${url}</div>
              <p>Este cliente está revisando activamente tu documentación técnica.</p>
            </div>
          `
        })
      });
    }

    return new Response('Webhook recibido con éxito', { status: 200 });

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
