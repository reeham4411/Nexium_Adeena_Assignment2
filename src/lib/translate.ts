import axios from 'axios';

export async function translateToUrdu(text: string): Promise<string> {
  try {
    interface TranslateResponse {
      translatedText: string;
    }

    const response = await axios.post<TranslateResponse>(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'en',
        target: 'ur',
        format: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'ترجمہ دستیاب نہیں ہے'; 
  }
}