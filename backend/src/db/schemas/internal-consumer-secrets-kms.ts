// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { zodBuffer } from "@app/lib/zod";

import { TImmutableDBKeys } from "./models";

export const InternalConsumerSecretsKmsSchema = z.object({
  id: z.string().uuid(),
  encryptedKey: zodBuffer,
  encryptionAlgorithm: z.string(),
  version: z.number().default(1),
  kmsKeyId: z.string().uuid()
});

export type TInternalConsumerSecretsKms = z.infer<typeof InternalConsumerSecretsKmsSchema>;
export type TInternalConsumerSecretsKmsInsert = Omit<
  z.input<typeof InternalConsumerSecretsKmsSchema>,
  TImmutableDBKeys
>;
export type TInternalConsumerSecretsKmsUpdate = Partial<
  Omit<z.input<typeof InternalConsumerSecretsKmsSchema>, TImmutableDBKeys>
>;