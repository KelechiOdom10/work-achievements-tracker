import { z } from 'zod';
import type { Prisma } from '../prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId','activeCompanyId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name','slug','logo','createdAt','metadata','userId']);

export const AchievementScalarFieldEnumSchema = z.enum(['id','title','description','achievedAt','impact','isPrivate','createdAt','updatedAt','userId','companyId','goalId']);

export const TagScalarFieldEnumSchema = z.enum(['id','name','color','createdAt','updatedAt']);

export const AchievementTagScalarFieldEnumSchema = z.enum(['achievementId','tagId','createdAt']);

export const EvidenceScalarFieldEnumSchema = z.enum(['id','achievementId','url','filePath','type','description','createdAt','updatedAt']);

export const GoalScalarFieldEnumSchema = z.enum(['id','title','description','userId','companyId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ImpactLevelSchema = z.enum(['LOW','MEDIUM','HIGH']);

export type ImpactLevelType = `${z.infer<typeof ImpactLevelSchema>}`

export const EvidenceTypeSchema = z.enum(['IMAGE','PDF','LINK']);

export type EvidenceTypeType = `${z.infer<typeof EvidenceTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
  activeCompanyId: z.string().nullable(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  slug: z.string().nullable(),
  logo: z.string().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().nullable(),
  userId: z.string(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// ACHIEVEMENT SCHEMA
/////////////////////////////////////////

export const AchievementSchema = z.object({
  impact: ImpactLevelSchema.nullable(),
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  isPrivate: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  companyId: z.string(),
  goalId: z.string().nullable(),
})

export type Achievement = z.infer<typeof AchievementSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// ACHIEVEMENT TAG SCHEMA
/////////////////////////////////////////

export const AchievementTagSchema = z.object({
  achievementId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date(),
})

export type AchievementTag = z.infer<typeof AchievementTagSchema>

/////////////////////////////////////////
// EVIDENCE SCHEMA
/////////////////////////////////////////

export const EvidenceSchema = z.object({
  type: EvidenceTypeSchema,
  id: z.string().cuid(),
  achievementId: z.string(),
  url: z.string().nullable(),
  filePath: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Evidence = z.infer<typeof EvidenceSchema>

/////////////////////////////////////////
// GOAL SCHEMA
/////////////////////////////////////////

export const GoalSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  userId: z.string(),
  companyId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Goal = z.infer<typeof GoalSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompanyFindManyArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  companies: z.boolean().optional(),
  achievements: z.boolean().optional(),
  goals: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companies: z.union([z.boolean(),z.lazy(() => CompanyFindManyArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  activeCompanyId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  achievements: z.boolean().optional(),
  goals: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  logo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  goals: z.union([z.boolean(),z.lazy(() => GoalFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACHIEVEMENT
//------------------------------------------------------

export const AchievementIncludeSchema: z.ZodType<Prisma.AchievementInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  evidences: z.union([z.boolean(),z.lazy(() => EvidenceFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AchievementTagFindManyArgsSchema)]).optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AchievementCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AchievementArgsSchema: z.ZodType<Prisma.AchievementDefaultArgs> = z.object({
  select: z.lazy(() => AchievementSelectSchema).optional(),
  include: z.lazy(() => AchievementIncludeSchema).optional(),
}).strict();

export const AchievementCountOutputTypeArgsSchema: z.ZodType<Prisma.AchievementCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AchievementCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AchievementCountOutputTypeSelectSchema: z.ZodType<Prisma.AchievementCountOutputTypeSelect> = z.object({
  evidences: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const AchievementSelectSchema: z.ZodType<Prisma.AchievementSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  achievedAt: z.boolean().optional(),
  impact: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  goalId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  evidences: z.union([z.boolean(),z.lazy(() => EvidenceFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AchievementTagFindManyArgsSchema)]).optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AchievementCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  achievements: z.union([z.boolean(),z.lazy(() => AchievementTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  achievements: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACHIEVEMENT TAG
//------------------------------------------------------

export const AchievementTagIncludeSchema: z.ZodType<Prisma.AchievementTagInclude> = z.object({
  achievement: z.union([z.boolean(),z.lazy(() => AchievementArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

export const AchievementTagArgsSchema: z.ZodType<Prisma.AchievementTagDefaultArgs> = z.object({
  select: z.lazy(() => AchievementTagSelectSchema).optional(),
  include: z.lazy(() => AchievementTagIncludeSchema).optional(),
}).strict();

export const AchievementTagSelectSchema: z.ZodType<Prisma.AchievementTagSelect> = z.object({
  achievementId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  achievement: z.union([z.boolean(),z.lazy(() => AchievementArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => TagArgsSchema)]).optional(),
}).strict()

// EVIDENCE
//------------------------------------------------------

export const EvidenceIncludeSchema: z.ZodType<Prisma.EvidenceInclude> = z.object({
  achievement: z.union([z.boolean(),z.lazy(() => AchievementArgsSchema)]).optional(),
}).strict()

export const EvidenceArgsSchema: z.ZodType<Prisma.EvidenceDefaultArgs> = z.object({
  select: z.lazy(() => EvidenceSelectSchema).optional(),
  include: z.lazy(() => EvidenceIncludeSchema).optional(),
}).strict();

export const EvidenceSelectSchema: z.ZodType<Prisma.EvidenceSelect> = z.object({
  id: z.boolean().optional(),
  achievementId: z.boolean().optional(),
  url: z.boolean().optional(),
  filePath: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  achievement: z.union([z.boolean(),z.lazy(() => AchievementArgsSchema)]).optional(),
}).strict()

// GOAL
//------------------------------------------------------

export const GoalIncludeSchema: z.ZodType<Prisma.GoalInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GoalArgsSchema: z.ZodType<Prisma.GoalDefaultArgs> = z.object({
  select: z.lazy(() => GoalSelectSchema).optional(),
  include: z.lazy(() => GoalIncludeSchema).optional(),
}).strict();

export const GoalCountOutputTypeArgsSchema: z.ZodType<Prisma.GoalCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GoalCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GoalCountOutputTypeSelectSchema: z.ZodType<Prisma.GoalCountOutputTypeSelect> = z.object({
  achievements: z.boolean().optional(),
}).strict();

export const GoalSelectSchema: z.ZodType<Prisma.GoalSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  achievements: z.union([z.boolean(),z.lazy(() => AchievementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companies: z.lazy(() => CompanyListRelationFilterSchema).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  companies: z.lazy(() => CompanyOrderByRelationAggregateInputSchema).optional(),
  achievements: z.lazy(() => AchievementOrderByRelationAggregateInputSchema).optional(),
  goals: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companies: z.lazy(() => CompanyListRelationFilterSchema).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeCompanyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeCompanyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeCompanyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeCompanyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  activeCompanyId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict();

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  achievements: z.lazy(() => AchievementOrderByRelationAggregateInputSchema).optional(),
  goals: z.lazy(() => GoalOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional(),
  goals: z.lazy(() => GoalListRelationFilterSchema).optional()
}).strict());

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AchievementWhereInputSchema: z.ZodType<Prisma.AchievementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  impact: z.union([ z.lazy(() => EnumImpactLevelNullableFilterSchema),z.lazy(() => ImpactLevelSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  evidences: z.lazy(() => EvidenceListRelationFilterSchema).optional(),
  tags: z.lazy(() => AchievementTagListRelationFilterSchema).optional(),
  goal: z.union([ z.lazy(() => GoalNullableScalarRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AchievementOrderByWithRelationInputSchema: z.ZodType<Prisma.AchievementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  achievedAt: z.lazy(() => SortOrderSchema).optional(),
  impact: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  evidences: z.lazy(() => EvidenceOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => AchievementTagOrderByRelationAggregateInputSchema).optional(),
  goal: z.lazy(() => GoalOrderByWithRelationInputSchema).optional()
}).strict();

export const AchievementWhereUniqueInputSchema: z.ZodType<Prisma.AchievementWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementWhereInputSchema),z.lazy(() => AchievementWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  impact: z.union([ z.lazy(() => EnumImpactLevelNullableFilterSchema),z.lazy(() => ImpactLevelSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  evidences: z.lazy(() => EvidenceListRelationFilterSchema).optional(),
  tags: z.lazy(() => AchievementTagListRelationFilterSchema).optional(),
  goal: z.union([ z.lazy(() => GoalNullableScalarRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AchievementOrderByWithAggregationInputSchema: z.ZodType<Prisma.AchievementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  achievedAt: z.lazy(() => SortOrderSchema).optional(),
  impact: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AchievementCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AchievementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AchievementMinOrderByAggregateInputSchema).optional()
}).strict();

export const AchievementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AchievementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  achievedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  impact: z.union([ z.lazy(() => EnumImpactLevelNullableWithAggregatesFilterSchema),z.lazy(() => ImpactLevelSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievements: z.lazy(() => AchievementTagListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  achievements: z.lazy(() => AchievementTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievements: z.lazy(() => AchievementTagListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AchievementTagWhereInputSchema: z.ZodType<Prisma.AchievementTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementTagWhereInputSchema),z.lazy(() => AchievementTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementTagWhereInputSchema),z.lazy(() => AchievementTagWhereInputSchema).array() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievement: z.union([ z.lazy(() => AchievementScalarRelationFilterSchema),z.lazy(() => AchievementWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict();

export const AchievementTagOrderByWithRelationInputSchema: z.ZodType<Prisma.AchievementTagOrderByWithRelationInput> = z.object({
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  achievement: z.lazy(() => AchievementOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => TagOrderByWithRelationInputSchema).optional()
}).strict();

export const AchievementTagWhereUniqueInputSchema: z.ZodType<Prisma.AchievementTagWhereUniqueInput> = z.object({
  achievementId_tagId: z.lazy(() => AchievementTagAchievementIdTagIdCompoundUniqueInputSchema)
})
.and(z.object({
  achievementId_tagId: z.lazy(() => AchievementTagAchievementIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AchievementTagWhereInputSchema),z.lazy(() => AchievementTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementTagWhereInputSchema),z.lazy(() => AchievementTagWhereInputSchema).array() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievement: z.union([ z.lazy(() => AchievementScalarRelationFilterSchema),z.lazy(() => AchievementWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => TagScalarRelationFilterSchema),z.lazy(() => TagWhereInputSchema) ]).optional(),
}).strict());

export const AchievementTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.AchievementTagOrderByWithAggregationInput> = z.object({
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AchievementTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AchievementTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AchievementTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const AchievementTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AchievementTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AchievementTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EvidenceWhereInputSchema: z.ZodType<Prisma.EvidenceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EvidenceWhereInputSchema),z.lazy(() => EvidenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EvidenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EvidenceWhereInputSchema),z.lazy(() => EvidenceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  filePath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumEvidenceTypeFilterSchema),z.lazy(() => EvidenceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievement: z.union([ z.lazy(() => AchievementScalarRelationFilterSchema),z.lazy(() => AchievementWhereInputSchema) ]).optional(),
}).strict();

export const EvidenceOrderByWithRelationInputSchema: z.ZodType<Prisma.EvidenceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  filePath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  achievement: z.lazy(() => AchievementOrderByWithRelationInputSchema).optional()
}).strict();

export const EvidenceWhereUniqueInputSchema: z.ZodType<Prisma.EvidenceWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => EvidenceWhereInputSchema),z.lazy(() => EvidenceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EvidenceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EvidenceWhereInputSchema),z.lazy(() => EvidenceWhereInputSchema).array() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  filePath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumEvidenceTypeFilterSchema),z.lazy(() => EvidenceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  achievement: z.union([ z.lazy(() => AchievementScalarRelationFilterSchema),z.lazy(() => AchievementWhereInputSchema) ]).optional(),
}).strict());

export const EvidenceOrderByWithAggregationInputSchema: z.ZodType<Prisma.EvidenceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  filePath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EvidenceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EvidenceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EvidenceMinOrderByAggregateInputSchema).optional()
}).strict();

export const EvidenceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EvidenceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EvidenceScalarWhereWithAggregatesInputSchema),z.lazy(() => EvidenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EvidenceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EvidenceScalarWhereWithAggregatesInputSchema),z.lazy(() => EvidenceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  filePath: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumEvidenceTypeWithAggregatesFilterSchema),z.lazy(() => EvidenceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GoalWhereInputSchema: z.ZodType<Prisma.GoalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional()
}).strict();

export const GoalOrderByWithRelationInputSchema: z.ZodType<Prisma.GoalOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  achievements: z.lazy(() => AchievementOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GoalWhereUniqueInputSchema: z.ZodType<Prisma.GoalWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementListRelationFilterSchema).optional()
}).strict());

export const GoalOrderByWithAggregationInputSchema: z.ZodType<Prisma.GoalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GoalCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GoalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GoalMinOrderByAggregateInputSchema).optional()
}).strict();

export const GoalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GoalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeCompanyId: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string(),
  activeCompanyId: z.string().optional().nullable()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string(),
  activeCompanyId: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompaniesInputSchema),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutCompanyInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  userId: z.string(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutCompanyNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateInputSchema: z.ZodType<Prisma.AchievementCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAchievementsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutAchievementsInputSchema),
  evidences: z.lazy(() => EvidenceCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagCreateNestedManyWithoutAchievementInputSchema).optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutAchievementsInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string(),
  goalId: z.string().optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementUpdateInputSchema: z.ZodType<Prisma.AchievementUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  evidences: z.lazy(() => EvidenceUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUpdateManyWithoutAchievementNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const AchievementCreateManyInputSchema: z.ZodType<Prisma.AchievementCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string(),
  goalId: z.string().optional().nullable()
}).strict();

export const AchievementUpdateManyMutationInputSchema: z.ZodType<Prisma.AchievementUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievements: z.lazy(() => AchievementTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievements: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagCreateInputSchema: z.ZodType<Prisma.AchievementTagCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  achievement: z.lazy(() => AchievementCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => TagCreateNestedOneWithoutAchievementsInputSchema)
}).strict();

export const AchievementTagUncheckedCreateInputSchema: z.ZodType<Prisma.AchievementTagUncheckedCreateInput> = z.object({
  achievementId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementTagUpdateInputSchema: z.ZodType<Prisma.AchievementTagUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievement: z.lazy(() => AchievementUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementTagUncheckedUpdateInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateInput> = z.object({
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagCreateManyInputSchema: z.ZodType<Prisma.AchievementTagCreateManyInput> = z.object({
  achievementId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementTagUpdateManyMutationInputSchema: z.ZodType<Prisma.AchievementTagUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateManyInput> = z.object({
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceCreateInputSchema: z.ZodType<Prisma.EvidenceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievement: z.lazy(() => AchievementCreateNestedOneWithoutEvidencesInputSchema)
}).strict();

export const EvidenceUncheckedCreateInputSchema: z.ZodType<Prisma.EvidenceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  achievementId: z.string(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EvidenceUpdateInputSchema: z.ZodType<Prisma.EvidenceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievement: z.lazy(() => AchievementUpdateOneRequiredWithoutEvidencesNestedInputSchema).optional()
}).strict();

export const EvidenceUncheckedUpdateInputSchema: z.ZodType<Prisma.EvidenceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceCreateManyInputSchema: z.ZodType<Prisma.EvidenceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  achievementId: z.string(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EvidenceUpdateManyMutationInputSchema: z.ZodType<Prisma.EvidenceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EvidenceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalCreateInputSchema: z.ZodType<Prisma.GoalCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGoalsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutGoalsInputSchema),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateInputSchema: z.ZodType<Prisma.GoalUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUpdateInputSchema: z.ZodType<Prisma.GoalUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGoalsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutGoalsNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalCreateManyInputSchema: z.ZodType<Prisma.GoalCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GoalUpdateManyMutationInputSchema: z.ZodType<Prisma.GoalUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const CompanyListRelationFilterSchema: z.ZodType<Prisma.CompanyListRelationFilter> = z.object({
  every: z.lazy(() => CompanyWhereInputSchema).optional(),
  some: z.lazy(() => CompanyWhereInputSchema).optional(),
  none: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const AchievementListRelationFilterSchema: z.ZodType<Prisma.AchievementListRelationFilter> = z.object({
  every: z.lazy(() => AchievementWhereInputSchema).optional(),
  some: z.lazy(() => AchievementWhereInputSchema).optional(),
  none: z.lazy(() => AchievementWhereInputSchema).optional()
}).strict();

export const GoalListRelationFilterSchema: z.ZodType<Prisma.GoalListRelationFilter> = z.object({
  every: z.lazy(() => GoalWhereInputSchema).optional(),
  some: z.lazy(() => GoalWhereInputSchema).optional(),
  none: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompanyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AchievementOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GoalOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeCompanyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeCompanyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeCompanyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumImpactLevelNullableFilterSchema: z.ZodType<Prisma.EnumImpactLevelNullableFilter> = z.object({
  equals: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  in: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  notIn: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NestedEnumImpactLevelNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const EvidenceListRelationFilterSchema: z.ZodType<Prisma.EvidenceListRelationFilter> = z.object({
  every: z.lazy(() => EvidenceWhereInputSchema).optional(),
  some: z.lazy(() => EvidenceWhereInputSchema).optional(),
  none: z.lazy(() => EvidenceWhereInputSchema).optional()
}).strict();

export const AchievementTagListRelationFilterSchema: z.ZodType<Prisma.AchievementTagListRelationFilter> = z.object({
  every: z.lazy(() => AchievementTagWhereInputSchema).optional(),
  some: z.lazy(() => AchievementTagWhereInputSchema).optional(),
  none: z.lazy(() => AchievementTagWhereInputSchema).optional()
}).strict();

export const GoalNullableScalarRelationFilterSchema: z.ZodType<Prisma.GoalNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => GoalWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GoalWhereInputSchema).optional().nullable()
}).strict();

export const EvidenceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EvidenceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AchievementTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementCountOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  achievedAt: z.lazy(() => SortOrderSchema).optional(),
  impact: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  achievedAt: z.lazy(() => SortOrderSchema).optional(),
  impact: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementMinOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  achievedAt: z.lazy(() => SortOrderSchema).optional(),
  impact: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumImpactLevelNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumImpactLevelNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  in: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  notIn: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NestedEnumImpactLevelNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumImpactLevelNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumImpactLevelNullableFilterSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementScalarRelationFilterSchema: z.ZodType<Prisma.AchievementScalarRelationFilter> = z.object({
  is: z.lazy(() => AchievementWhereInputSchema).optional(),
  isNot: z.lazy(() => AchievementWhereInputSchema).optional()
}).strict();

export const TagScalarRelationFilterSchema: z.ZodType<Prisma.TagScalarRelationFilter> = z.object({
  is: z.lazy(() => TagWhereInputSchema).optional(),
  isNot: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const AchievementTagAchievementIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.AchievementTagAchievementIdTagIdCompoundUniqueInput> = z.object({
  achievementId: z.string(),
  tagId: z.string()
}).strict();

export const AchievementTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementTagCountOrderByAggregateInput> = z.object({
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementTagMaxOrderByAggregateInput> = z.object({
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AchievementTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.AchievementTagMinOrderByAggregateInput> = z.object({
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEvidenceTypeFilterSchema: z.ZodType<Prisma.EnumEvidenceTypeFilter> = z.object({
  equals: z.lazy(() => EvidenceTypeSchema).optional(),
  in: z.lazy(() => EvidenceTypeSchema).array().optional(),
  notIn: z.lazy(() => EvidenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => NestedEnumEvidenceTypeFilterSchema) ]).optional(),
}).strict();

export const EvidenceCountOrderByAggregateInputSchema: z.ZodType<Prisma.EvidenceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EvidenceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EvidenceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EvidenceMinOrderByAggregateInputSchema: z.ZodType<Prisma.EvidenceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  achievementId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  filePath: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEvidenceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEvidenceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EvidenceTypeSchema).optional(),
  in: z.lazy(() => EvidenceTypeSchema).array().optional(),
  notIn: z.lazy(() => EvidenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => NestedEnumEvidenceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEvidenceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEvidenceTypeFilterSchema).optional()
}).strict();

export const GoalCountOrderByAggregateInputSchema: z.ZodType<Prisma.GoalCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMinOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AchievementCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementCreateWithoutUserInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementCreateWithoutUserInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompanyUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompanyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyScalarWhereInputSchema),z.lazy(() => CompanyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementCreateWithoutUserInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GoalUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyWhereUniqueInputSchema),z.lazy(() => CompanyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompanyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyScalarWhereInputSchema),z.lazy(() => CompanyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementCreateWithoutUserInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalCreateWithoutUserInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema),z.lazy(() => GoalCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCompaniesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCompaniesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompaniesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AchievementCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementCreateWithoutCompanyInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.GoalCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalCreateWithoutCompanyInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementCreateWithoutCompanyInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalCreateWithoutCompanyInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCompaniesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompaniesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompaniesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompaniesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompaniesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCompaniesInputSchema),z.lazy(() => UserUpdateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompaniesInputSchema) ]).optional(),
}).strict();

export const AchievementUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementCreateWithoutCompanyInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.GoalUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalCreateWithoutCompanyInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementCreateWithoutCompanyInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalCreateWithoutCompanyInputSchema).array(),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => GoalCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GoalUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => GoalUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GoalCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GoalWhereUniqueInputSchema),z.lazy(() => GoalWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GoalUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => GoalUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GoalUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => GoalUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAchievementsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAchievementsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutAchievementsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const EvidenceCreateNestedManyWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceCreateNestedManyWithoutAchievementInput> = z.object({
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateWithoutAchievementInputSchema).array(),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EvidenceCreateManyAchievementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagCreateNestedManyWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagCreateNestedManyWithoutAchievementInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyAchievementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedOneWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalCreateNestedOneWithoutAchievementsInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUncheckedCreateNestedManyWithoutAchievementInput> = z.object({
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateWithoutAchievementInputSchema).array(),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EvidenceCreateManyAchievementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUncheckedCreateNestedManyWithoutAchievementInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyAchievementInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumImpactLevelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumImpactLevelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ImpactLevelSchema).optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutAchievementsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAchievementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAchievementsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAchievementsInputSchema),z.lazy(() => UserUpdateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAchievementsInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutAchievementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutAchievementsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutAchievementsInputSchema),z.lazy(() => CompanyUpdateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutAchievementsInputSchema) ]).optional(),
}).strict();

export const EvidenceUpdateManyWithoutAchievementNestedInputSchema: z.ZodType<Prisma.EvidenceUpdateManyWithoutAchievementNestedInput> = z.object({
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateWithoutAchievementInputSchema).array(),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EvidenceUpsertWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => EvidenceUpsertWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EvidenceCreateManyAchievementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EvidenceUpdateWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => EvidenceUpdateWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EvidenceUpdateManyWithWhereWithoutAchievementInputSchema),z.lazy(() => EvidenceUpdateManyWithWhereWithoutAchievementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EvidenceScalarWhereInputSchema),z.lazy(() => EvidenceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUpdateManyWithoutAchievementNestedInputSchema: z.ZodType<Prisma.AchievementTagUpdateManyWithoutAchievementNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyAchievementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementTagUpdateManyWithWhereWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpdateManyWithWhereWithoutAchievementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalUpdateOneWithoutAchievementsNestedInputSchema: z.ZodType<Prisma.GoalUpdateOneWithoutAchievementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutAchievementsInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutAchievementsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutAchievementsInputSchema),z.lazy(() => GoalUpdateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutAchievementsInputSchema) ]).optional(),
}).strict();

export const EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema: z.ZodType<Prisma.EvidenceUncheckedUpdateManyWithoutAchievementNestedInput> = z.object({
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateWithoutAchievementInputSchema).array(),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => EvidenceCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EvidenceUpsertWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => EvidenceUpsertWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EvidenceCreateManyAchievementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EvidenceWhereUniqueInputSchema),z.lazy(() => EvidenceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EvidenceUpdateWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => EvidenceUpdateWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EvidenceUpdateManyWithWhereWithoutAchievementInputSchema),z.lazy(() => EvidenceUpdateManyWithWhereWithoutAchievementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EvidenceScalarWhereInputSchema),z.lazy(() => EvidenceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateManyWithoutAchievementNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutAchievementInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyAchievementInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutAchievementInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementTagUpdateManyWithWhereWithoutAchievementInputSchema),z.lazy(() => AchievementTagUpdateManyWithWhereWithoutAchievementInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagCreateWithoutTagInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagCreateWithoutTagInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.AchievementTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagCreateWithoutTagInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => AchievementTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagCreateWithoutTagInputSchema).array(),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => AchievementTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => AchievementTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementTagWhereUniqueInputSchema),z.lazy(() => AchievementTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => AchievementTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => AchievementTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.AchievementCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AchievementCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => AchievementWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedOneWithoutAchievementsInputSchema: z.ZodType<Prisma.TagCreateNestedOneWithoutAchievementsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional()
}).strict();

export const AchievementUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.AchievementUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AchievementCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => AchievementUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => AchievementWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => AchievementUpdateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const TagUpdateOneRequiredWithoutAchievementsNestedInputSchema: z.ZodType<Prisma.TagUpdateOneRequiredWithoutAchievementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedCreateWithoutAchievementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TagCreateOrConnectWithoutAchievementsInputSchema).optional(),
  upsert: z.lazy(() => TagUpsertWithoutAchievementsInputSchema).optional(),
  connect: z.lazy(() => TagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TagUpdateToOneWithWhereWithoutAchievementsInputSchema),z.lazy(() => TagUpdateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutAchievementsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateNestedOneWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementCreateNestedOneWithoutEvidencesInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutEvidencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AchievementCreateOrConnectWithoutEvidencesInputSchema).optional(),
  connect: z.lazy(() => AchievementWhereUniqueInputSchema).optional()
}).strict();

export const EnumEvidenceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEvidenceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EvidenceTypeSchema).optional()
}).strict();

export const AchievementUpdateOneRequiredWithoutEvidencesNestedInputSchema: z.ZodType<Prisma.AchievementUpdateOneRequiredWithoutEvidencesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutEvidencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AchievementCreateOrConnectWithoutEvidencesInputSchema).optional(),
  upsert: z.lazy(() => AchievementUpsertWithoutEvidencesInputSchema).optional(),
  connect: z.lazy(() => AchievementWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateToOneWithWhereWithoutEvidencesInputSchema),z.lazy(() => AchievementUpdateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutEvidencesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutGoalsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGoalsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutGoalsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const AchievementCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.AchievementCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementCreateWithoutGoalInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementCreateWithoutGoalInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutGoalsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGoalsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutGoalsInputSchema),z.lazy(() => UserUpdateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGoalsInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutGoalsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutGoalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutGoalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutGoalsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutGoalsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutGoalsInputSchema),z.lazy(() => CompanyUpdateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutGoalsInputSchema) ]).optional(),
}).strict();

export const AchievementUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementCreateWithoutGoalInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AchievementUncheckedUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementCreateWithoutGoalInputSchema).array(),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema),z.lazy(() => AchievementCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AchievementUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => AchievementUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AchievementCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AchievementWhereUniqueInputSchema),z.lazy(() => AchievementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AchievementUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => AchievementUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AchievementUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => AchievementUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumImpactLevelNullableFilterSchema: z.ZodType<Prisma.NestedEnumImpactLevelNullableFilter> = z.object({
  equals: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  in: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  notIn: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NestedEnumImpactLevelNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumImpactLevelNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumImpactLevelNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  in: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  notIn: z.lazy(() => ImpactLevelSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NestedEnumImpactLevelNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumImpactLevelNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumImpactLevelNullableFilterSchema).optional()
}).strict();

export const NestedEnumEvidenceTypeFilterSchema: z.ZodType<Prisma.NestedEnumEvidenceTypeFilter> = z.object({
  equals: z.lazy(() => EvidenceTypeSchema).optional(),
  in: z.lazy(() => EvidenceTypeSchema).array().optional(),
  notIn: z.lazy(() => EvidenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => NestedEnumEvidenceTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumEvidenceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEvidenceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EvidenceTypeSchema).optional(),
  in: z.lazy(() => EvidenceTypeSchema).array().optional(),
  notIn: z.lazy(() => EvidenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => NestedEnumEvidenceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEvidenceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEvidenceTypeFilterSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeCompanyId: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeCompanyId: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyCreateWithoutUserInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutCompanyInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CompanyCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CompanyCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompanyCreateManyUserInputSchema),z.lazy(() => CompanyCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AchievementCreateWithoutUserInputSchema: z.ZodType<Prisma.AchievementCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutAchievementsInputSchema),
  evidences: z.lazy(() => EvidenceCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagCreateNestedManyWithoutAchievementInputSchema).optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutAchievementsInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string(),
  goalId: z.string().optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AchievementCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AchievementCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AchievementCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AchievementCreateManyUserInputSchema),z.lazy(() => AchievementCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GoalCreateWithoutUserInputSchema: z.ZodType<Prisma.GoalCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutGoalsInputSchema),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GoalCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GoalCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GoalCreateManyUserInputSchema),z.lazy(() => GoalCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeCompanyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CompanyUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompanyUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompanyUpdateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CompanyUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompanyUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutUserInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CompanyUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CompanyUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompanyUpdateManyMutationInputSchema),z.lazy(() => CompanyUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CompanyScalarWhereInputSchema: z.ZodType<Prisma.CompanyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereInputSchema),z.lazy(() => CompanyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereInputSchema),z.lazy(() => CompanyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AchievementUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AchievementUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AchievementUpdateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementCreateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AchievementUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AchievementUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateWithoutUserInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AchievementUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AchievementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateManyMutationInputSchema),z.lazy(() => AchievementUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AchievementScalarWhereInputSchema: z.ZodType<Prisma.AchievementScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementScalarWhereInputSchema),z.lazy(() => AchievementScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  impact: z.union([ z.lazy(() => EnumImpactLevelNullableFilterSchema),z.lazy(() => ImpactLevelSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  goalId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const GoalUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutUserInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutUserInputSchema),z.lazy(() => GoalUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GoalUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutUserInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const GoalUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const GoalScalarWhereInputSchema: z.ZodType<Prisma.GoalScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalScalarWhereInputSchema),z.lazy(() => GoalScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.UserCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCompaniesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompaniesInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCompaniesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompaniesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompaniesInputSchema) ]),
}).strict();

export const AchievementCreateWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAchievementsInputSchema),
  evidences: z.lazy(() => EvidenceCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagCreateNestedManyWithoutAchievementInputSchema).optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutAchievementsInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  goalId: z.string().optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const AchievementCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.AchievementCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AchievementCreateManyCompanyInputSchema),z.lazy(() => AchievementCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GoalCreateWithoutCompanyInputSchema: z.ZodType<Prisma.GoalCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGoalsInputSchema),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const GoalCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.GoalCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GoalCreateManyCompanyInputSchema),z.lazy(() => GoalCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCompaniesInputSchema: z.ZodType<Prisma.UserUpsertWithoutCompaniesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompaniesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompaniesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCompaniesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompaniesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompaniesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompaniesInputSchema) ]),
}).strict();

export const UserUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCompaniesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompaniesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AchievementUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AchievementUpdateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementCreateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const AchievementUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateWithoutCompanyInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const AchievementUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => AchievementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateManyMutationInputSchema),z.lazy(() => AchievementUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const GoalUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GoalUpdateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const GoalUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateWithoutCompanyInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const GoalUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => GoalScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GoalUpdateManyMutationInputSchema),z.lazy(() => GoalUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const UserCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.UserCreateWithoutAchievementsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAchievementsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAchievementsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAchievementsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAchievementsInputSchema) ]),
}).strict();

export const CompanyCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompaniesInputSchema),
  goals: z.lazy(() => GoalCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  userId: z.string(),
  goals: z.lazy(() => GoalUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutAchievementsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutAchievementsInputSchema) ]),
}).strict();

export const EvidenceCreateWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceCreateWithoutAchievementInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EvidenceUncheckedCreateWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUncheckedCreateWithoutAchievementInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EvidenceCreateOrConnectWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceCreateOrConnectWithoutAchievementInput> = z.object({
  where: z.lazy(() => EvidenceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema) ]),
}).strict();

export const EvidenceCreateManyAchievementInputEnvelopeSchema: z.ZodType<Prisma.EvidenceCreateManyAchievementInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EvidenceCreateManyAchievementInputSchema),z.lazy(() => EvidenceCreateManyAchievementInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AchievementTagCreateWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagCreateWithoutAchievementInput> = z.object({
  createdAt: z.coerce.date().optional(),
  tag: z.lazy(() => TagCreateNestedOneWithoutAchievementsInputSchema)
}).strict();

export const AchievementTagUncheckedCreateWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUncheckedCreateWithoutAchievementInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementTagCreateOrConnectWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagCreateOrConnectWithoutAchievementInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema) ]),
}).strict();

export const AchievementTagCreateManyAchievementInputEnvelopeSchema: z.ZodType<Prisma.AchievementTagCreateManyAchievementInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AchievementTagCreateManyAchievementInputSchema),z.lazy(() => AchievementTagCreateManyAchievementInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GoalCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutGoalsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutGoalsInputSchema)
}).strict();

export const GoalUncheckedCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GoalCreateOrConnectWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutAchievementsInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutAchievementsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAchievementsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAchievementsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAchievementsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAchievementsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAchievementsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAchievementsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAchievementsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAchievementsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CompanyUpsertWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutAchievementsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutAchievementsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutAchievementsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutAchievementsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutAchievementsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutAchievementsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const EvidenceUpsertWithWhereUniqueWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUpsertWithWhereUniqueWithoutAchievementInput> = z.object({
  where: z.lazy(() => EvidenceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EvidenceUpdateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedUpdateWithoutAchievementInputSchema) ]),
  create: z.union([ z.lazy(() => EvidenceCreateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedCreateWithoutAchievementInputSchema) ]),
}).strict();

export const EvidenceUpdateWithWhereUniqueWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUpdateWithWhereUniqueWithoutAchievementInput> = z.object({
  where: z.lazy(() => EvidenceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EvidenceUpdateWithoutAchievementInputSchema),z.lazy(() => EvidenceUncheckedUpdateWithoutAchievementInputSchema) ]),
}).strict();

export const EvidenceUpdateManyWithWhereWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUpdateManyWithWhereWithoutAchievementInput> = z.object({
  where: z.lazy(() => EvidenceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EvidenceUpdateManyMutationInputSchema),z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementInputSchema) ]),
}).strict();

export const EvidenceScalarWhereInputSchema: z.ZodType<Prisma.EvidenceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EvidenceScalarWhereInputSchema),z.lazy(() => EvidenceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EvidenceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EvidenceScalarWhereInputSchema),z.lazy(() => EvidenceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  filePath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumEvidenceTypeFilterSchema),z.lazy(() => EvidenceTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AchievementTagUpsertWithWhereUniqueWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUpsertWithWhereUniqueWithoutAchievementInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedUpdateWithoutAchievementInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutAchievementInputSchema) ]),
}).strict();

export const AchievementTagUpdateWithWhereUniqueWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUpdateWithWhereUniqueWithoutAchievementInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AchievementTagUpdateWithoutAchievementInputSchema),z.lazy(() => AchievementTagUncheckedUpdateWithoutAchievementInputSchema) ]),
}).strict();

export const AchievementTagUpdateManyWithWhereWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUpdateManyWithWhereWithoutAchievementInput> = z.object({
  where: z.lazy(() => AchievementTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AchievementTagUpdateManyMutationInputSchema),z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementInputSchema) ]),
}).strict();

export const AchievementTagScalarWhereInputSchema: z.ZodType<Prisma.AchievementTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AchievementTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AchievementTagScalarWhereInputSchema),z.lazy(() => AchievementTagScalarWhereInputSchema).array() ]).optional(),
  achievementId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GoalUpsertWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalUpsertWithoutAchievementsInput> = z.object({
  update: z.union([ z.lazy(() => GoalUpdateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutAchievementsInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedCreateWithoutAchievementsInputSchema) ]),
  where: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalUpdateToOneWithWhereWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalUpdateToOneWithWhereWithoutAchievementsInput> = z.object({
  where: z.lazy(() => GoalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GoalUpdateWithoutAchievementsInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutAchievementsInputSchema) ]),
}).strict();

export const GoalUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGoalsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutGoalsNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagCreateWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagCreateWithoutTagInput> = z.object({
  createdAt: z.coerce.date().optional(),
  achievement: z.lazy(() => AchievementCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const AchievementTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUncheckedCreateWithoutTagInput> = z.object({
  achievementId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const AchievementTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.AchievementTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AchievementTagCreateManyTagInputSchema),z.lazy(() => AchievementTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AchievementTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AchievementTagUpdateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementTagCreateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const AchievementTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => AchievementTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AchievementTagUpdateWithoutTagInputSchema),z.lazy(() => AchievementTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const AchievementTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => AchievementTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AchievementTagUpdateManyMutationInputSchema),z.lazy(() => AchievementTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const AchievementCreateWithoutTagsInputSchema: z.ZodType<Prisma.AchievementCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAchievementsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutAchievementsInputSchema),
  evidences: z.lazy(() => EvidenceCreateNestedManyWithoutAchievementInputSchema).optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutAchievementsInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string(),
  goalId: z.string().optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.AchievementCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementCreateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const TagCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.TagCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TagUncheckedCreateWithoutAchievementsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutAchievementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  color: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TagCreateOrConnectWithoutAchievementsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutAchievementsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedCreateWithoutAchievementsInputSchema) ]),
}).strict();

export const AchievementUpsertWithoutTagsInputSchema: z.ZodType<Prisma.AchievementUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => AchievementUpdateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementCreateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => AchievementWhereInputSchema).optional()
}).strict();

export const AchievementUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.AchievementUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => AchievementWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AchievementUpdateWithoutTagsInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const AchievementUpdateWithoutTagsInputSchema: z.ZodType<Prisma.AchievementUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  evidences: z.lazy(() => EvidenceUpdateManyWithoutAchievementNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const TagUpsertWithoutAchievementsInputSchema: z.ZodType<Prisma.TagUpsertWithoutAchievementsInput> = z.object({
  update: z.union([ z.lazy(() => TagUpdateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutAchievementsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedCreateWithoutAchievementsInputSchema) ]),
  where: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagUpdateToOneWithWhereWithoutAchievementsInputSchema: z.ZodType<Prisma.TagUpdateToOneWithWhereWithoutAchievementsInput> = z.object({
  where: z.lazy(() => TagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TagUpdateWithoutAchievementsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutAchievementsInputSchema) ]),
}).strict();

export const TagUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.TagUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutAchievementsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutAchievementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementCreateWithoutEvidencesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAchievementsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutAchievementsInputSchema),
  tags: z.lazy(() => AchievementTagCreateNestedManyWithoutAchievementInputSchema).optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutAchievementsInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateWithoutEvidencesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string(),
  goalId: z.string().optional().nullable(),
  tags: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementCreateOrConnectWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementCreateOrConnectWithoutEvidencesInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementCreateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutEvidencesInputSchema) ]),
}).strict();

export const AchievementUpsertWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementUpsertWithoutEvidencesInput> = z.object({
  update: z.union([ z.lazy(() => AchievementUpdateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutEvidencesInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementCreateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutEvidencesInputSchema) ]),
  where: z.lazy(() => AchievementWhereInputSchema).optional()
}).strict();

export const AchievementUpdateToOneWithWhereWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementUpdateToOneWithWhereWithoutEvidencesInput> = z.object({
  where: z.lazy(() => AchievementWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AchievementUpdateWithoutEvidencesInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutEvidencesInputSchema) ]),
}).strict();

export const AchievementUpdateWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementUpdateWithoutEvidencesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUpdateManyWithoutAchievementNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateWithoutEvidencesInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateWithoutEvidencesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutGoalsInputSchema: z.ZodType<Prisma.UserCreateWithoutGoalsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutGoalsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGoalsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutGoalsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGoalsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGoalsInputSchema) ]),
}).strict();

export const CompanyCreateWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutGoalsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompaniesInputSchema),
  achievements: z.lazy(() => AchievementCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutGoalsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable(),
  userId: z.string(),
  achievements: z.lazy(() => AchievementUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutGoalsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutGoalsInputSchema) ]),
}).strict();

export const AchievementCreateWithoutGoalInputSchema: z.ZodType<Prisma.AchievementCreateWithoutGoalInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAchievementsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutAchievementsInputSchema),
  evidences: z.lazy(() => EvidenceCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementUncheckedCreateWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUncheckedCreateWithoutGoalInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string(),
  evidences: z.lazy(() => EvidenceUncheckedCreateNestedManyWithoutAchievementInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedCreateNestedManyWithoutAchievementInputSchema).optional()
}).strict();

export const AchievementCreateOrConnectWithoutGoalInputSchema: z.ZodType<Prisma.AchievementCreateOrConnectWithoutGoalInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const AchievementCreateManyGoalInputEnvelopeSchema: z.ZodType<Prisma.AchievementCreateManyGoalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AchievementCreateManyGoalInputSchema),z.lazy(() => AchievementCreateManyGoalInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutGoalsInputSchema: z.ZodType<Prisma.UserUpsertWithoutGoalsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGoalsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedCreateWithoutGoalsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutGoalsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGoalsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutGoalsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGoalsInputSchema) ]),
}).strict();

export const UserUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.UserUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CompanyUpsertWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutGoalsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutGoalsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutGoalsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutGoalsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutGoalsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutGoalsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompaniesNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutGoalsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutGoalsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const AchievementUpsertWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUpsertWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AchievementUpdateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutGoalInputSchema) ]),
  create: z.union([ z.lazy(() => AchievementCreateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const AchievementUpdateWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUpdateWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => AchievementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateWithoutGoalInputSchema),z.lazy(() => AchievementUncheckedUpdateWithoutGoalInputSchema) ]),
}).strict();

export const AchievementUpdateManyWithWhereWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUpdateManyWithWhereWithoutGoalInput> = z.object({
  where: z.lazy(() => AchievementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AchievementUpdateManyMutationInputSchema),z.lazy(() => AchievementUncheckedUpdateManyWithoutGoalInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeCompanyId: z.string().optional().nullable()
}).strict();

export const CompanyCreateManyUserInputSchema: z.ZodType<Prisma.CompanyCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  metadata: z.string().optional().nullable()
}).strict();

export const AchievementCreateManyUserInputSchema: z.ZodType<Prisma.AchievementCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string(),
  goalId: z.string().optional().nullable()
}).strict();

export const GoalCreateManyUserInputSchema: z.ZodType<Prisma.GoalCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeCompanyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CompanyUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutCompanyNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  goals: z.lazy(() => GoalUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AchievementUpdateWithoutUserInputSchema: z.ZodType<Prisma.AchievementUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  evidences: z.lazy(() => EvidenceUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUpdateManyWithoutAchievementNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalUpdateWithoutUserInputSchema: z.ZodType<Prisma.GoalUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutGoalsNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateManyCompanyInputSchema: z.ZodType<Prisma.AchievementCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  goalId: z.string().optional().nullable()
}).strict();

export const GoalCreateManyCompanyInputSchema: z.ZodType<Prisma.GoalCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AchievementUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  evidences: z.lazy(() => EvidenceUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUpdateManyWithoutAchievementNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  evidences: z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GoalUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGoalsNestedInputSchema).optional(),
  achievements: z.lazy(() => AchievementUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievements: z.lazy(() => AchievementUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceCreateManyAchievementInputSchema: z.ZodType<Prisma.EvidenceCreateManyAchievementInput> = z.object({
  id: z.string().cuid().optional(),
  url: z.string().optional().nullable(),
  filePath: z.string().optional().nullable(),
  type: z.lazy(() => EvidenceTypeSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AchievementTagCreateManyAchievementInputSchema: z.ZodType<Prisma.AchievementTagCreateManyAchievementInput> = z.object({
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const EvidenceUpdateWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUpdateWithoutAchievementInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceUncheckedUpdateWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUncheckedUpdateWithoutAchievementInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EvidenceUncheckedUpdateManyWithoutAchievementInputSchema: z.ZodType<Prisma.EvidenceUncheckedUpdateManyWithoutAchievementInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filePath: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => EvidenceTypeSchema),z.lazy(() => EnumEvidenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagUpdateWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUpdateWithoutAchievementInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => TagUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional()
}).strict();

export const AchievementTagUncheckedUpdateWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateWithoutAchievementInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagUncheckedUpdateManyWithoutAchievementInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateManyWithoutAchievementInput> = z.object({
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagCreateManyTagInputSchema: z.ZodType<Prisma.AchievementTagCreateManyTagInput> = z.object({
  achievementId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AchievementTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUpdateWithoutTagInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  achievement: z.lazy(() => AchievementUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const AchievementTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateWithoutTagInput> = z.object({
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.AchievementTagUncheckedUpdateManyWithoutTagInput> = z.object({
  achievementId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AchievementCreateManyGoalInputSchema: z.ZodType<Prisma.AchievementCreateManyGoalInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  achievedAt: z.coerce.date(),
  impact: z.lazy(() => ImpactLevelSchema).optional().nullable(),
  isPrivate: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  companyId: z.string()
}).strict();

export const AchievementUpdateWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutAchievementsNestedInputSchema).optional(),
  evidences: z.lazy(() => EvidenceUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  evidences: z.lazy(() => EvidenceUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional(),
  tags: z.lazy(() => AchievementTagUncheckedUpdateManyWithoutAchievementNestedInputSchema).optional()
}).strict();

export const AchievementUncheckedUpdateManyWithoutGoalInputSchema: z.ZodType<Prisma.AchievementUncheckedUpdateManyWithoutGoalInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  achievedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  impact: z.union([ z.lazy(() => ImpactLevelSchema),z.lazy(() => NullableEnumImpactLevelFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(),CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const AchievementFindFirstArgsSchema: z.ZodType<Prisma.AchievementFindFirstArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AchievementFindFirstOrThrowArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementFindManyArgsSchema: z.ZodType<Prisma.AchievementFindManyArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementScalarFieldEnumSchema,AchievementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementAggregateArgsSchema: z.ZodType<Prisma.AchievementAggregateArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithRelationInputSchema.array(),AchievementOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementGroupByArgsSchema: z.ZodType<Prisma.AchievementGroupByArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
  orderBy: z.union([ AchievementOrderByWithAggregationInputSchema.array(),AchievementOrderByWithAggregationInputSchema ]).optional(),
  by: AchievementScalarFieldEnumSchema.array(),
  having: AchievementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementFindUniqueArgsSchema: z.ZodType<Prisma.AchievementFindUniqueArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AchievementFindUniqueOrThrowArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const AchievementTagFindFirstArgsSchema: z.ZodType<Prisma.AchievementTagFindFirstArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereInputSchema.optional(),
  orderBy: z.union([ AchievementTagOrderByWithRelationInputSchema.array(),AchievementTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementTagScalarFieldEnumSchema,AchievementTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AchievementTagFindFirstOrThrowArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereInputSchema.optional(),
  orderBy: z.union([ AchievementTagOrderByWithRelationInputSchema.array(),AchievementTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementTagScalarFieldEnumSchema,AchievementTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementTagFindManyArgsSchema: z.ZodType<Prisma.AchievementTagFindManyArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereInputSchema.optional(),
  orderBy: z.union([ AchievementTagOrderByWithRelationInputSchema.array(),AchievementTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AchievementTagScalarFieldEnumSchema,AchievementTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AchievementTagAggregateArgsSchema: z.ZodType<Prisma.AchievementTagAggregateArgs> = z.object({
  where: AchievementTagWhereInputSchema.optional(),
  orderBy: z.union([ AchievementTagOrderByWithRelationInputSchema.array(),AchievementTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AchievementTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementTagGroupByArgsSchema: z.ZodType<Prisma.AchievementTagGroupByArgs> = z.object({
  where: AchievementTagWhereInputSchema.optional(),
  orderBy: z.union([ AchievementTagOrderByWithAggregationInputSchema.array(),AchievementTagOrderByWithAggregationInputSchema ]).optional(),
  by: AchievementTagScalarFieldEnumSchema.array(),
  having: AchievementTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AchievementTagFindUniqueArgsSchema: z.ZodType<Prisma.AchievementTagFindUniqueArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereUniqueInputSchema,
}).strict() ;

export const AchievementTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AchievementTagFindUniqueOrThrowArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereUniqueInputSchema,
}).strict() ;

export const EvidenceFindFirstArgsSchema: z.ZodType<Prisma.EvidenceFindFirstArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereInputSchema.optional(),
  orderBy: z.union([ EvidenceOrderByWithRelationInputSchema.array(),EvidenceOrderByWithRelationInputSchema ]).optional(),
  cursor: EvidenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EvidenceScalarFieldEnumSchema,EvidenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EvidenceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EvidenceFindFirstOrThrowArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereInputSchema.optional(),
  orderBy: z.union([ EvidenceOrderByWithRelationInputSchema.array(),EvidenceOrderByWithRelationInputSchema ]).optional(),
  cursor: EvidenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EvidenceScalarFieldEnumSchema,EvidenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EvidenceFindManyArgsSchema: z.ZodType<Prisma.EvidenceFindManyArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereInputSchema.optional(),
  orderBy: z.union([ EvidenceOrderByWithRelationInputSchema.array(),EvidenceOrderByWithRelationInputSchema ]).optional(),
  cursor: EvidenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EvidenceScalarFieldEnumSchema,EvidenceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EvidenceAggregateArgsSchema: z.ZodType<Prisma.EvidenceAggregateArgs> = z.object({
  where: EvidenceWhereInputSchema.optional(),
  orderBy: z.union([ EvidenceOrderByWithRelationInputSchema.array(),EvidenceOrderByWithRelationInputSchema ]).optional(),
  cursor: EvidenceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EvidenceGroupByArgsSchema: z.ZodType<Prisma.EvidenceGroupByArgs> = z.object({
  where: EvidenceWhereInputSchema.optional(),
  orderBy: z.union([ EvidenceOrderByWithAggregationInputSchema.array(),EvidenceOrderByWithAggregationInputSchema ]).optional(),
  by: EvidenceScalarFieldEnumSchema.array(),
  having: EvidenceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EvidenceFindUniqueArgsSchema: z.ZodType<Prisma.EvidenceFindUniqueArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereUniqueInputSchema,
}).strict() ;

export const EvidenceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EvidenceFindUniqueOrThrowArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereUniqueInputSchema,
}).strict() ;

export const GoalFindFirstArgsSchema: z.ZodType<Prisma.GoalFindFirstArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GoalFindFirstOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindManyArgsSchema: z.ZodType<Prisma.GoalFindManyArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalAggregateArgsSchema: z.ZodType<Prisma.GoalAggregateArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalGroupByArgsSchema: z.ZodType<Prisma.GoalGroupByArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithAggregationInputSchema.array(),GoalOrderByWithAggregationInputSchema ]).optional(),
  by: GoalScalarFieldEnumSchema.array(),
  having: GoalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalFindUniqueArgsSchema: z.ZodType<Prisma.GoalFindUniqueArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GoalFindUniqueOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
}).strict() ;

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
  create: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementCreateArgsSchema: z.ZodType<Prisma.AchievementCreateArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  data: z.union([ AchievementCreateInputSchema,AchievementUncheckedCreateInputSchema ]),
}).strict() ;

export const AchievementUpsertArgsSchema: z.ZodType<Prisma.AchievementUpsertArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
  create: z.union([ AchievementCreateInputSchema,AchievementUncheckedCreateInputSchema ]),
  update: z.union([ AchievementUpdateInputSchema,AchievementUncheckedUpdateInputSchema ]),
}).strict() ;

export const AchievementCreateManyArgsSchema: z.ZodType<Prisma.AchievementCreateManyArgs> = z.object({
  data: z.union([ AchievementCreateManyInputSchema,AchievementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AchievementCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AchievementCreateManyAndReturnArgs> = z.object({
  data: z.union([ AchievementCreateManyInputSchema,AchievementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AchievementDeleteArgsSchema: z.ZodType<Prisma.AchievementDeleteArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementUpdateArgsSchema: z.ZodType<Prisma.AchievementUpdateArgs> = z.object({
  select: AchievementSelectSchema.optional(),
  include: AchievementIncludeSchema.optional(),
  data: z.union([ AchievementUpdateInputSchema,AchievementUncheckedUpdateInputSchema ]),
  where: AchievementWhereUniqueInputSchema,
}).strict() ;

export const AchievementUpdateManyArgsSchema: z.ZodType<Prisma.AchievementUpdateManyArgs> = z.object({
  data: z.union([ AchievementUpdateManyMutationInputSchema,AchievementUncheckedUpdateManyInputSchema ]),
  where: AchievementWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AchievementUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AchievementUpdateManyMutationInputSchema,AchievementUncheckedUpdateManyInputSchema ]),
  where: AchievementWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementDeleteManyArgsSchema: z.ZodType<Prisma.AchievementDeleteManyArgs> = z.object({
  where: AchievementWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementTagCreateArgsSchema: z.ZodType<Prisma.AchievementTagCreateArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  data: z.union([ AchievementTagCreateInputSchema,AchievementTagUncheckedCreateInputSchema ]),
}).strict() ;

export const AchievementTagUpsertArgsSchema: z.ZodType<Prisma.AchievementTagUpsertArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereUniqueInputSchema,
  create: z.union([ AchievementTagCreateInputSchema,AchievementTagUncheckedCreateInputSchema ]),
  update: z.union([ AchievementTagUpdateInputSchema,AchievementTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const AchievementTagCreateManyArgsSchema: z.ZodType<Prisma.AchievementTagCreateManyArgs> = z.object({
  data: z.union([ AchievementTagCreateManyInputSchema,AchievementTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AchievementTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AchievementTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ AchievementTagCreateManyInputSchema,AchievementTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AchievementTagDeleteArgsSchema: z.ZodType<Prisma.AchievementTagDeleteArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  where: AchievementTagWhereUniqueInputSchema,
}).strict() ;

export const AchievementTagUpdateArgsSchema: z.ZodType<Prisma.AchievementTagUpdateArgs> = z.object({
  select: AchievementTagSelectSchema.optional(),
  include: AchievementTagIncludeSchema.optional(),
  data: z.union([ AchievementTagUpdateInputSchema,AchievementTagUncheckedUpdateInputSchema ]),
  where: AchievementTagWhereUniqueInputSchema,
}).strict() ;

export const AchievementTagUpdateManyArgsSchema: z.ZodType<Prisma.AchievementTagUpdateManyArgs> = z.object({
  data: z.union([ AchievementTagUpdateManyMutationInputSchema,AchievementTagUncheckedUpdateManyInputSchema ]),
  where: AchievementTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AchievementTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AchievementTagUpdateManyMutationInputSchema,AchievementTagUncheckedUpdateManyInputSchema ]),
  where: AchievementTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AchievementTagDeleteManyArgsSchema: z.ZodType<Prisma.AchievementTagDeleteManyArgs> = z.object({
  where: AchievementTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EvidenceCreateArgsSchema: z.ZodType<Prisma.EvidenceCreateArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  data: z.union([ EvidenceCreateInputSchema,EvidenceUncheckedCreateInputSchema ]),
}).strict() ;

export const EvidenceUpsertArgsSchema: z.ZodType<Prisma.EvidenceUpsertArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereUniqueInputSchema,
  create: z.union([ EvidenceCreateInputSchema,EvidenceUncheckedCreateInputSchema ]),
  update: z.union([ EvidenceUpdateInputSchema,EvidenceUncheckedUpdateInputSchema ]),
}).strict() ;

export const EvidenceCreateManyArgsSchema: z.ZodType<Prisma.EvidenceCreateManyArgs> = z.object({
  data: z.union([ EvidenceCreateManyInputSchema,EvidenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EvidenceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EvidenceCreateManyAndReturnArgs> = z.object({
  data: z.union([ EvidenceCreateManyInputSchema,EvidenceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EvidenceDeleteArgsSchema: z.ZodType<Prisma.EvidenceDeleteArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  where: EvidenceWhereUniqueInputSchema,
}).strict() ;

export const EvidenceUpdateArgsSchema: z.ZodType<Prisma.EvidenceUpdateArgs> = z.object({
  select: EvidenceSelectSchema.optional(),
  include: EvidenceIncludeSchema.optional(),
  data: z.union([ EvidenceUpdateInputSchema,EvidenceUncheckedUpdateInputSchema ]),
  where: EvidenceWhereUniqueInputSchema,
}).strict() ;

export const EvidenceUpdateManyArgsSchema: z.ZodType<Prisma.EvidenceUpdateManyArgs> = z.object({
  data: z.union([ EvidenceUpdateManyMutationInputSchema,EvidenceUncheckedUpdateManyInputSchema ]),
  where: EvidenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EvidenceUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EvidenceUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EvidenceUpdateManyMutationInputSchema,EvidenceUncheckedUpdateManyInputSchema ]),
  where: EvidenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EvidenceDeleteManyArgsSchema: z.ZodType<Prisma.EvidenceDeleteManyArgs> = z.object({
  where: EvidenceWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const GoalCreateArgsSchema: z.ZodType<Prisma.GoalCreateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
}).strict() ;

export const GoalUpsertArgsSchema: z.ZodType<Prisma.GoalUpsertArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
  create: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
  update: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
}).strict() ;

export const GoalCreateManyArgsSchema: z.ZodType<Prisma.GoalCreateManyArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GoalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GoalCreateManyAndReturnArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GoalDeleteArgsSchema: z.ZodType<Prisma.GoalDeleteArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateArgsSchema: z.ZodType<Prisma.GoalUpdateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateManyArgsSchema: z.ZodType<Prisma.GoalUpdateManyArgs> = z.object({
  data: z.union([ GoalUpdateManyMutationInputSchema,GoalUncheckedUpdateManyInputSchema ]),
  where: GoalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const GoalUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.GoalUpdateManyAndReturnArgs> = z.object({
  data: z.union([ GoalUpdateManyMutationInputSchema,GoalUncheckedUpdateManyInputSchema ]),
  where: GoalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const GoalDeleteManyArgsSchema: z.ZodType<Prisma.GoalDeleteManyArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;