export async function POST({ request }) {
    let lat, lon;

    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
        const body = await request.json();
        lat = body.lat;
        lon = body.lon;
    } else {
        const formData = await request.formData();
        lat = formData.get('lat');
        lon = formData.get('lon');
    }

    if (!lat || !lon) {
        return new Response(JSON.stringify({ error: 'Missing lat or lon' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
        method: 'GET',
        headers: { 'User-Agent': 'weathy-app' }
    });

    return new Response(await response.text(), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
    });
}
