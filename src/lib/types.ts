//from mongodb
export interface BlogDocument {
  url: string;
  fullText: string;
  timestamp: Date;
}

// from supabase
export interface SummaryRow {
  id?: string;
  url: string;
  summary: string;
  translation: string;
  created_at?: string;
}

//request to generate summary 
export interface SummaryRequest {
  url: string;
}
