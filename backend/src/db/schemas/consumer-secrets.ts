// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { TImmutableDBKeys } from "./models";

export const ConsumerSecretsSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string(),
  type: z.string(),
  name: z.string(),
  fields: z.unknown(),
  created_at: z.date().nullable().optional(),
  updated_at: z.date().nullable().optional()
});

export type TConsumerSecrets = z.infer<typeof ConsumerSecretsSchema>;
export type TConsumerSecretsInsert = Omit<z.input<typeof ConsumerSecretsSchema>, TImmutableDBKeys>;
export type TConsumerSecretsUpdate = Partial<Omit<z.input<typeof ConsumerSecretsSchema>, TImmutableDBKeys>>;
