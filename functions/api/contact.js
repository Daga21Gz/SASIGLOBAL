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
    // Al registrarlo aquí, Resend disparará automáticamente tu "Automation"
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
    } catch (e) { console.error('Error Audience:', e); }

    // 2. NOTIFICACIÓN INTERNA PARA ALBERT
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SASIGLOBAL System <onboarding@resend.dev>',
        to: ['albertg2109@gmail.com'],
        reply_to: email,
        subject: `🚨 NUEVO PROSPECTO: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; border: 1px solid #0f172a; border-top: 4px solid #dc143c;">
            <h2 style="color: #0f172a; text-transform: uppercase; letter-spacing: 2px;">Nuevo Contacto Registrado en CRM</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 2px;">
              ${message || 'Sin mensaje.'}
            </div>
            <p style="margin-top: 20px; font-size: 11px; color: #94a3b8;">
              El cliente ya fue agregado a la lista 'Clientes' y la automatización de bienvenida ha sido disparada.
            </p>
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
