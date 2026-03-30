export interface Student {
  id: string;
  name: string;
  birthDate: Date;
  institutionId: string;
  createdAt: string;
}

export interface StudentWithCases extends Student {
  caseStudies?: StudentCaseStudy[];
}

export interface StudentFile {
  id: string;
  studentId: string;
  name: string;
  url: string;
  createdAt: Date;
}

export interface StudentFilesPaginated {
  files: StudentFile[];
  count: number;
}

export interface StudentCaseStudy {
  id: string;
  studentId: string;

  // IDENTIFICAÇÃO
  schoolClass?: string;
  responsibleName?: "médico" | "pai_responsável" | "professor" | "outro";
  responsiblePhone?: string;
  responsibleEmail?: string;
  referredBy?: "teacher" | "family" | "technical_team";
  hasDiagnosis?: boolean;
  diagnosis?: string;
  comorbidities?: string[];
  developmentStage?:
    | "pre_operational"
    | "concrete_operational"
    | "formal_operational";

  // RESPONSÁVEL PELAS INFORMAÇÕES
  informantName?: string;
  informantRelation?: string;
  informantPhone?: string;
  informantEmail?: string;

  // ANAMNESE
  pregnancyHistory?: string;
  developmentMilestones?: string;
  healthHistory?: string;

  // DESENVOLVIMENTO
  walkingDevelopment?: "normal" | "delayed" | "not_walking";
  speechDevelopment?: "normal" | "delayed" | "not_speaking";
  sphincterControl?: "full" | "day_only" | "diapers";

  // SAÚDE
  vision?: "normal" | "glasses" | "low_vision";
  hearing?: "normal" | "hearing_loss" | "hearing_device";
  sleep?: "normal" | "agitated" | "insomnia";

  usesMedication?: boolean;
  medicationName?: string;
  medicationAtSchool?: boolean;

  // AUTONOMIA
  feeding?: "independent" | "needs_supervision" | "needs_help";
  foodSelectivity?: boolean;
  foodRestrictions?: string;

  bathroomIndependence?: "independent" | "needs_help" | "full_help";
  dressing?: "independent" | "needs_help" | "dependent";

  locomotion?: "independent" | "unstable" | "wheelchair";

  // COMUNICAÇÃO
  communicationTypes?: string[];
  comprehensionLevel?: "complex" | "simple" | "low";

  socialInteraction?:
    | "plays_with_others"
    | "observes"
    | "isolates"
    | "aggressive";

  // INTERESSES
  interests?: string[];
  specificInterest?: string;

  // SENSORIAL
  sensorySensitivity?: string[];

  // COMPORTAMENTO
  crisisRegulationStrategy?: string;
  crisisBehaviors?: string[];

  // AVALIAÇÃO PEDAGÓGICA
  attention?: "focused" | "dispersed" | "hyperfocus";
  frustrationTolerance?: "asks_help" | "gestural_request" | "meltdown";
  commandUnderstanding?: "complex" | "simple" | "visual_support";

  // COGNITIVO
  classificationSkill?: "correct" | "mixed" | "no_criteria";
  seriationSkill?: "correct" | "not_understood";
  spatialConcepts?: "understands" | "confused";

  // ALFABETIZAÇÃO
  readingLevel?: "pre_syllabic" | "syllabic" | "alphabetic" | "fluent";

  mathReasoning?:
    | "mechanical_count"
    | "number_quantity_relation"
    | "basic_operations";

  // ESTILO DE APRENDIZAGEM
  learningStyle?: "visual" | "auditory" | "kinesthetic";

  // CONTEXTO ESCOLAR
  strengths?: string;
  difficulties?: string;
  currentSupports?: string;
  autismCharacteristics?: string[];

  // SÍNTESE FINAL
  aeeOpinion?: string;
  priorityAreas?: string[];
  suggestedAdaptations?: string;

  createdAt: string;
  updatedAt?: string;
}
