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

  try {
    const res = await fetch('https://nzbkaztxcprxeriisgmp.supabase.co/functions/v1/place_order', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'apikey': 'your-anon-key-here',
        'Authorization': 'Bearer your-anon-key-here'
      },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    console.log('Response:', data); // Add this to see the response
    
    if (res.ok) {
      alert(`Order placed! Your purchase count: ${data.purchaseCount}`);
      e.target.reset();
    } else {
      alert('Error: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Network error – please try again.');
  }
});