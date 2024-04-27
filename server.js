import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/laws', async (req, res) => {
  try {
    const response = await fetch('https://www.hellenicparliament.gr/api.ashx?q=laws');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/ministries', async (req, res) => {
  try {
    const response = await fetch('https://www.hellenicparliament.gr/api.ashx?q=ministries');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/laws/ministry', async (req, res) => {
  try {
    const response = await fetch('https://www.hellenicparliament.gr/api.ashx?q=laws&ministry=b2801a61-0491-4291-ae8d-aa8b00ecc051');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/laws/ministry/date', async (req, res) => {
  try {
    const response = await fetch('https://www.hellenicparliament.gr/api.ashx?q=laws&ministry=7baf096a-baed-4c97-aa37-b03e00d6e405&datevoted=08/03/2024');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/laws/ministry/amendment', async (req, res) => {
  try {
    const response = await fetch('https://www.hellenicparliament.gr/api.ashx?q=laws&ministry=10d99c0b-776f-425b-84d6-aa8b00f1ced2');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
