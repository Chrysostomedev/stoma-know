import React from "react";
import { Question, AnswerValue } from "@/types/survey";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioCardGroup } from "@/components/form/RadioCardGroup";
import { CheckboxGroup } from "@/components/form/CheckboxGroup";
import { RatingScale } from "@/components/form/RatingScale";

interface QuestionFieldProps {
  question: Question;
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
  error?: string;
}

/**
 * Composant générique qui rend le type de question approprié
 */
export const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  const stringValue = value !== null && value !== undefined ? String(value) : "";
  const numberValue =
    value !== null && value !== undefined ? Number(value) : undefined;
  const arrayValue = Array.isArray(value) ? value : [];

  switch (question.type) {
    case "short_text":
      return (
        <Input
          type="text"
          label={question.label}
          placeholder={question.placeholder}
          helperText={question.helperText}
          maxLength={question.maxLength}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          required={question.required}
        />
      );

    case "textarea":
      return (
        <Textarea
          label={question.label}
          placeholder={question.placeholder}
          helperText={question.helperText}
          maxLength={question.maxLength}
          showCharCount={!!question.maxLength}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          required={question.required}
        />
      );

    case "number":
      return (
        <Input
          type="number"
          label={question.label}
          placeholder={question.placeholder}
          helperText={question.helperText}
          min={question.min}
          max={question.max}
          step={question.step}
          value={stringValue}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          error={error}
          required={question.required}
        />
      );

    case "date":
      return (
        <Input
          type="date"
          label={question.label}
          helperText={question.helperText}
          min={question.minDate}
          max={question.maxDate}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          required={question.required}
        />
      );

    case "select":
      return (
        <RadioCardGroup
          label={question.label}
          options={
            question.options?.map((opt) => ({
              id: opt.id,
              label: opt.label,
              description: opt.description,
            })) || []
          }
          value={stringValue}
          onChange={onChange}
          error={error}
        />
      );

    case "radio":
      return (
        <RadioCardGroup
          label={question.label}
          options={
            question.options?.map((opt) => ({
              id: opt.id,
              label: opt.label,
              description: opt.description,
            })) || []
          }
          value={stringValue}
          onChange={onChange}
          error={error}
        />
      );

    case "checkbox":
      return (
        <CheckboxGroup
          label={question.label}
          options={
            question.options?.map((opt) => ({
              id: opt.id,
              label: opt.label,
              description: opt.description,
            })) || []
          }
          values={arrayValue}
          onChange={onChange}
          error={error}
        />
      );

    case "rating":
      return (
        <RatingScale
          label={question.label}
          max={question.maxRating || 5}
          variant={question.ratingVariant || "star"}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
          value={numberValue}
          onChange={(val) => onChange(val)}
          error={error}
        />
      );

    default:
      return (
        <div className="p-4 bg-danger-lighter text-danger rounded-lg">
          Type de question non supporté: {question.type}
        </div>
      );
  }
};

QuestionField.displayName = "QuestionField";
