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
    const res = await fetch('https://nzbkaztxcprxeriisgmp.supabase.co/functions/v1/place-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      alert(`Order placed! Your purchase count: ${data.purchaseCount}`);
      e.target.reset();
    } else {
      alert('Error: ' + data.error);
    }
  } catch (err) {
    alert('Network error – please try again.');
  }
});