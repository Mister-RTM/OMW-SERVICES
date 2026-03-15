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

  console.log('Sending payload:', payload); // Log what we're sending

  try {
    const res = await fetch('https://nzbkaztxcprxeriisgmp.supabase.co/functions/v1/place_order', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56YmthenR4Y3ByeGVyaWlzZ21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMjU3MTEsImV4cCI6MjA1NzYwMTcxMX0.2CxMk3dAtffIGvO6QbM_FKfWetk77vOe-6rT0hE9kFk',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56YmthenR4Y3ByeGVyaWlzZ21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMjU3MTEsImV4cCI6MjA1NzYwMTcxMX0.2CxMk3dAtffIGvO6QbM_FKfWetk77vOe-6rT0hE9kFk'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', res.status); // Log status
    console.log('Response headers:', [...res.headers.entries()]); // Log headers
    
    const responseText = await res.text(); // Get raw response
    console.log('Raw response:', responseText); // Log raw response
    
    let data;
    try {
      data = JSON.parse(responseText); // Try to parse as JSON
    } catch (e) {
      console.error('Could not parse response as JSON:', responseText);
      alert('Server returned invalid response. Check console.');
      return;
    }
    
    if (res.ok) {
      alert(`Order placed! Your purchase count: ${data.purchaseCount}`);
      e.target.reset();
    } else {
      alert('Error: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Network error – please try again. Check console for details.');
  }
});