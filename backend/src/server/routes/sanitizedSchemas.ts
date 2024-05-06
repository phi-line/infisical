import { z } from "zod";

import {
  DynamicSecretsSchema,
  IdentityProjectAdditionalPrivilegeSchema,
  IntegrationAuthsSchema,
  SecretApprovalPoliciesSchema,
  UsersSchema
} from "@app/db/schemas";
import { UnpackedPermissionSchema } from "@app/ee/services/identity-project-additional-privilege/identity-project-additional-privilege-service";

// sometimes the return data must be santizied to avoid leaking important values
// always prefer pick over omit in zod
export const integrationAuthPubSchema = IntegrationAuthsSchema.pick({
  id: true,
  projectId: true,
  integration: true,
  teamId: true,
  url: true,
  namespace: true,
  accountId: true,
  metadata: true,
  createdAt: true,
  updatedAt: true
});

export const sapPubSchema = SecretApprovalPoliciesSchema.merge(
  z.object({
    environment: z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string()
    }),
    projectId: z.string()
  })
);

export const sanitizedServiceTokenUserSchema = UsersSchema.pick({
  authMethods: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  devices: true,
  email: true,
  firstName: true,
  lastName: true,
  mfaMethods: true
}).merge(
  z.object({
    __v: z.number().default(0),
    _id: z.string()
  })
);

export const secretRawSchema = z.object({
  id: z.string(),
  _id: z.string(),
  workspace: z.string(),
  environment: z.string(),
  version: z.number(),
  type: z.string(),
  secretKey: z.string(),
  secretValue: z.string(),
  secretComment: z.string().optional()
});

export const PermissionSchema = z.object({
  action: z.string().min(1).describe("Describe what user can actually do. Ex: create, edit, delete, read"),
  subject: z.string().min(1).describe("The entity to check action on. Ex: secrets, environments"),
  conditions: z
    .object({
      environment: z.string().describe("To scope the permission to an environment.").optional(),
      secretPath: z
        .object({
          $glob: z.string().min(1).describe("To scope the permission to a secret path. Supports glob patterns.")
        })
        .optional()
    })
    .describe("Criteria which restricts user action only to matched subjects")
    .optional()
});

export const SanitizedIdentityPrivilegeSchema = IdentityProjectAdditionalPrivilegeSchema.extend({
  permissions: UnpackedPermissionSchema.array()
});

export const SanitizedDynamicSecretSchema = DynamicSecretsSchema.omit({
  inputIV: true,
  inputTag: true,
  inputCiphertext: true,
  keyEncoding: true,
  algorithm: true
});

export const SanitizedAuditLogStreamSchema = z.object({
  id: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
