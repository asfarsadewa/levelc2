'use server'

import { DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, systemPrompt } from './aisettings';

export async function correctGrammar(sentence: string): Promise<string> {
  try {
    const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: sentence }
        ],
        temperature: 1.0,
        max_tokens: 8192
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || 'Gagal Memproses';
    
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Gagal Memperbaiki Teks');
  }
} 