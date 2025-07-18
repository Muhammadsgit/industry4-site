export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Mailchimp config
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DATACENTER = API_KEY.split('-')[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 400) {
    return res.status(400).json({ error: 'There was an error subscribing to the newsletter.' });
  }

  return res.status(201).json({ message: 'Successfully subscribed!' });
} 