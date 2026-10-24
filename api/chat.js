export default async function handler(req, res) {
    // Hanya izinkan method POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Ambil API Key dari Environment Variable Vercel (atau fallback)
        const apiKey = process.env.AI_API_KEY || 'sk-qwen-80ac2be53d7f462ac6fcc0007d03b48aa233f3420cde5808';
        const baseUrl = 'https://bandelbanget.xyz/v1/chat/completions';

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(response.status).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ error: 'Gagal terhubung ke AI server' });
    }
}