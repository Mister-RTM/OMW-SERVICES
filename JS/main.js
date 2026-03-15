document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const services = formData.getAll('service');

  const payload = {
    platform: formData.get('platform'),
    services,
    consoleDetails: formData.get('consoleDetails'),
    discord: formData.get('discord'),
    rockstar: formData.get('rockstar')
  };

  console.log('📤 Enviando payload:', payload);

  // IMPORTANTE: Reemplaza con tu anon key real de Supabase
  const ANON_KEY = 'e39eb28998776ccbe438b9081060342426c92fc44f7978e50f5bf8f3149ed179';

  try {
    const res = await fetch('https://nzbkaztxcprxeriisgmp.supabase.co/functions/v1/place-order-v2', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      },
      body: JSON.stringify(payload)
    });
    
    console.log('📥 Estado respuesta:', res.status);
    
    const responseText = await res.text();
    console.log('📄 Respuesta raw:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ No se pudo parsear JSON:', responseText);
      alert('Error: Respuesta del servidor inválida');
      return;
    }
    
    if (res.ok) {
      alert(`✅ ¡Pedido realizado! Tu contador de compras: ${data.purchaseCount}`);
      e.target.reset();
    } else {
      alert(`❌ Error: ${data.error || 'Error desconocido'}`);
    }
  } catch (err) {
    console.error('🌐 Error de red:', err);
    alert('Error de red. Revisa la consola para más detalles.');
  }
});