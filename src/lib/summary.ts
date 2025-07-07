export function generateSummary(text: string): string {
  if (!text) return '';

  const keywords = ['important', 'note', 'key', 'main', 'highlight'];
  const sentences = text.split('.').map(s => s.trim()).filter(Boolean);

  // Collect sentences with keywords first
  const keywordSentences = sentences.filter(sentence =>
    keywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );

  // If not enough keyword sentences, fill in with leading sentences
  const summarySentences = [
    ...keywordSentences.slice(0, 2),
    ...sentences.slice(0, 3),
  ].slice(0, 3); 

  return summarySentences.join('. ') + '.';
}
