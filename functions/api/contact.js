export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400 });
    }

    const resendApiKey = env.RESEND_API_KEY;
    const AUDIENCE_ID = 'f7b83d4c-84ec-4f03-9087-23f3e89dc427';
    
    // 1. REGISTRAR EN LA AUDIENCIA (CRM)
    try {
      await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          first_name: name,
          unsubscribed: false
        })
      });
    } catch (e) { console.error('Error CRM:', e); }

    // 2. NOTIFICACIÓN INTERNA PARA ALBERT (Diseño Elite Dashboard)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SASIGLOBAL Intelligence <onboarding@resend.dev>',
        to: ['albertg2109@gmail.com'],
        reply_to: email,
        subject: `🚨 NUEVO LEAD DETECTADO: ${name}`,
        html: `
          <div style="font-family: sans-serif; background: #020617; color: #f1f5f9; padding: 40px; border: 1px solid #1e293b;">
            <div style="border-left: 4px solid #dc143c; padding-left: 20px;">
              <h2 style="color: white; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 18px;">Alerta de Sistema Central</h2>
              <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 20px;">PROTOCOLO DE CAPTURA: ACTIVO</p>
            </div>
            
            <div style="background: #0f172a; padding: 25px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0 0 10px;"><strong style="color: #dc143c;">IDENTIDAD:</strong> ${name}</p>
              <p style="margin: 0 0 10px;"><strong style="color: #dc143c;">CANAL:</strong> ${email}</p>
              <p style="margin: 0;"><strong style="color: #dc143c;">REQUERIMIENTO:</strong></p>
              <div style="color: #cbd5e1; font-style: italic; margin-top: 10px; border-top: 1px solid #1e293b; padding-top: 10px;">
                "${message || 'Sin especificaciones adicionales.'}"
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background: #dc143c; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; border-radius: 2px;">Responder de inmediato</a>
            </div>
          </div>
        `
      })
    });

    // 3. BIENVENIDA ELITE PARA EL CLIENTE (Diseño Marketing)
    // NOTA: Solo llegará a albertg2109@gmail.com mientras el dominio no esté verificado.
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SASIGLOBAL Intelligence <onboarding@resend.dev>',
        to: [email],
        subject: 'Protocolo de Contacto Geoespacial - SASIGLOBAL',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; padding: 0;">
            <div style="background: #020617; padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; letter-spacing: 8px; font-size: 24px;">
                SASI<span style="color:#dc143c">GLOBAL</span>
              </h1>
              <p style="color: #94a3b8; margin: 10px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">
                Engineering & Intelligence
              </p>
            </div>
            <div style="padding: 48px; line-height: 1.8; color: #334155;">
              <p style="font-size: 16px;">Estimado/a <strong>${name}</strong>,</p>
              <p>
                Confirmamos la recepción de su requerimiento en nuestro sistema central. Un especialista de nuestra división
                técnica ha sido notificado para analizar la viabilidad y alcance de su solicitud.
              </p>

              <div style="background: #f8fafc; padding: 24px; border-left: 4px solid #dc143c; margin: 32px 0;">
                <p style="margin: 0; font-weight: 800; color: #020617; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">
                  Documentación Disponible:
                </p>
                <p style="margin: 10px 0 0; font-size: 14px;">
                  Puede consultar nuestra Carta de Presentación y Portafolio de Capacidades 2026 aquí: <br />
                  <a href="https://sasiglobal.pages.dev/assets/Carta_Presentacion_SASIGLOBAL.pdf" style="color: #dc143c; text-decoration: none; font-weight: 800;">DESCARGAR PORTAFOLIO CORPORATIVO (PDF)</a>
                </p>
              </div>

              <p>En un plazo no mayor a 24 horas recibirá una comunicación formal de nuestro equipo ejecutivo.</p>

              <p style="margin-top: 48px; font-size: 14px; border-top: 1px solid #f1f5f9; padding-top: 24px;">
                Atentamente,<br />
                <strong>Dirección de Marketing</strong><br />
                <span style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">SASIGLOBAL SAS</span>
              </p>
            </div>
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
