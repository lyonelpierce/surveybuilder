export type QuestionType = "text" | "multipleChoice";

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  options?: MultipleChoiceOption[];
}

export interface SurveyDefinition {
  title: string;
  description: string;
  questions: Question[];
}

export interface SurveyResponses {
  [questionId: string]: string | string[];
}
