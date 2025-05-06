import {
  EvidenceType,
  ImpactLevel,
  PrismaClient,
} from "./generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.upsert({
    where: { email: "jane.doe@example.com" },
    update: {},
    create: {
      id: "user_1",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      emailVerified: true,
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create companies
  const companies = await prisma.company.createMany({
    data: [
      {
        id: "company_1",
        name: "Acme Corp",
        slug: "acme-corp",
        logo: "https://logo.clearbit.com/acme.com",
        createdAt: new Date("2020-01-01"),
        metadata: '{"industry":"Tech"}',
        userId: user.id,
      },
      {
        id: "company_2",
        name: "Beta Inc",
        slug: "beta-inc",
        logo: "https://logo.clearbit.com/beta.com",
        createdAt: new Date("2023-01-01"),
        metadata: '{"industry":"Finance"}',
        userId: user.id,
      },
      {
        id: "company_3",
        name: "Gamma Solutions",
        slug: "gamma-solutions",
        logo: "https://logo.clearbit.com/gamma.com",
        createdAt: new Date("2018-07-01"),
        metadata: '{"industry":"Consulting"}',
        userId: user.id,
      },
      {
        id: "company_4",
        name: "Delta Analytics",
        slug: "delta-analytics",
        logo: "https://logo.clearbit.com/delta.com",
        createdAt: new Date("2016-03-15"),
        metadata: '{"industry":"Analytics"}',
        userId: user.id,
      },
    ],
    skipDuplicates: true,
  });

  // Fetch companies
  const [acme, beta, gamma, delta] = await Promise.all([
    prisma.company.findUnique({ where: { id: "company_1" } }),
    prisma.company.findUnique({ where: { id: "company_2" } }),
    prisma.company.findUnique({ where: { id: "company_3" } }),
    prisma.company.findUnique({ where: { id: "company_4" } }),
  ]);

  // Create tags
  const [
    leadership,
    innovation,
    react,
    teamwork,
    python,
    mentorship,
    product,
    cloud,
  ] = await Promise.all([
    prisma.tag.upsert({
      where: { name: "Leadership" },
      update: {},
      create: { name: "Leadership", color: "#FFD700" },
    }),
    prisma.tag.upsert({
      where: { name: "Innovation" },
      update: {},
      create: { name: "Innovation", color: "#00BFFF" },
    }),
    prisma.tag.upsert({
      where: { name: "React.js" },
      update: {},
      create: { name: "React.js", color: "#61dafb" },
    }),
    prisma.tag.upsert({
      where: { name: "Teamwork" },
      update: {},
      create: { name: "Teamwork", color: "#8BC34A" },
    }),
    prisma.tag.upsert({
      where: { name: "Python" },
      update: {},
      create: { name: "Python", color: "#3572A5" },
    }),
    prisma.tag.upsert({
      where: { name: "Mentorship" },
      update: {},
      create: { name: "Mentorship", color: "#FF69B4" },
    }),
    prisma.tag.upsert({
      where: { name: "Product" },
      update: {},
      create: { name: "Product", color: "#A0522D" },
    }),
    prisma.tag.upsert({
      where: { name: "Cloud" },
      update: {},
      create: { name: "Cloud", color: "#90caf9" },
    }),
  ]);

  // Helper for tags
  const tagIds = {
    leadership,
    innovation,
    react,
    teamwork,
    python,
    mentorship,
    product,
    cloud,
  };

  // Create goals per company
  const companyList = [acme, beta, gamma, delta];
  type GoalMap = Record<
    string,
    Awaited<ReturnType<typeof prisma.goal.create>>[]
  >;
  const goalsByCompany: GoalMap = {};
  for (const company of companyList) {
    if (!company || !company.id)
      throw new Error("Company not found or missing id");
    goalsByCompany[company.id] = [];
    for (let i = 1; i <= 2; i++) {
      const goal = await prisma.goal.create({
        data: {
          title: `Goal ${i} for ${company.name}`,
          description: `Description for goal ${i} at ${company.name}`,
          userId: user.id,
          companyId: company.id,
        },
      });
      goalsByCompany?.[company.id]?.push(goal);
    }
  }
  const achievementsData = [
    {
      title: "Launched New Product",
      description:
        "Led the team to launch Acme's flagship product, increasing revenue by 30%.",
      achievedAt: new Date("2021-06-15"),
      impact: ImpactLevel.HIGH,
      isPrivate: false,
      userId: user.id,
      companyId: acme?.id,
      tags: [leadership.id, innovation.id, product.id],
      evidences: [
        {
          url: "https://acme.com/launch-press-release.pdf",
          type: EvidenceType.LINK,
          description: "Press release for the product launch",
        },
        {
          url: "https://acme.com/screenshot.png",
          type: EvidenceType.IMAGE,
          description: "Screenshot of the product dashboard",
        },
      ],
    },
    {
      title: "Migrated Frontend to React",
      description:
        "Refactored Beta's frontend from Angular to React, improving performance and developer happiness.",
      achievedAt: new Date("2024-03-10"),
      impact: ImpactLevel.MEDIUM,
      isPrivate: true,
      userId: user.id,
      companyId: beta?.id,
      tags: [react.id, innovation.id, teamwork.id],
      evidences: [
        {
          url: "https://beta.com/react-migration-slides.pdf",
          type: EvidenceType.PDF,
          description: "Slides from the migration presentation",
        },
        {
          url: "https://beta.com/screenshot.png",
          type: EvidenceType.IMAGE,
          description: "Screenshot of the new React UI",
        },
      ],
    },
    {
      title: "Built Data Pipeline",
      description:
        "Designed and implemented a scalable data pipeline in Python for Gamma Solutions, processing 10M+ records daily.",
      achievedAt: new Date("2019-09-01"),
      impact: ImpactLevel.HIGH,
      isPrivate: false,
      userId: user.id,
      companyId: gamma?.id,
      tags: [python.id, innovation.id, cloud.id],
      evidences: [
        {
          url: "https://gamma.com/pipeline-architecture.pdf",
          type: EvidenceType.PDF,
          description: "Pipeline architecture doc",
        },
      ],
    },
    {
      title: "Mentored New Hires",
      description:
        "Mentored 5 junior analysts at Delta Analytics, helping them ramp up and deliver on key projects.",
      achievedAt: new Date("2017-05-20"),
      impact: ImpactLevel.MEDIUM,
      isPrivate: false,
      userId: user.id,
      companyId: delta?.id,
      tags: [mentorship.id, teamwork.id],
      evidences: [
        {
          url: "https://delta.com/mentorship-feedback.pdf",
          type: EvidenceType.PDF,
          description: "Feedback from mentees",
        },
      ],
    },
    {
      title: "Reduced Cloud Costs",
      description:
        "Optimized cloud infrastructure at Acme Corp, reducing costs by 40% while improving reliability.",
      achievedAt: new Date("2022-02-10"),
      impact: ImpactLevel.HIGH,
      isPrivate: false,
      userId: user.id,
      companyId: acme?.id,
      tags: [cloud.id, innovation.id],
      evidences: [
        {
          url: "https://acme.com/cloud-cost-report.pdf",
          type: EvidenceType.PDF,
          description: "Cost optimization report",
        },
      ],
    },
    {
      title: "Team Offsite Facilitator",
      description:
        "Organized and facilitated a team offsite for Beta Inc, boosting morale and collaboration.",
      achievedAt: new Date("2023-07-15"),
      impact: ImpactLevel.LOW,
      isPrivate: false,
      userId: user.id,
      companyId: beta?.id,
      tags: [teamwork.id, leadership.id],
      evidences: [],
    },
    {
      title: "Product Roadmap Planning",
      description:
        "Worked with stakeholders at Gamma Solutions to define the 2020 product roadmap.",
      achievedAt: new Date("2019-12-01"),
      impact: ImpactLevel.MEDIUM,
      isPrivate: false,
      userId: user.id,
      companyId: gamma?.id,
      tags: [product.id, leadership.id],
      evidences: [
        {
          url: "https://gamma.com/roadmap-slides.pdf",
          type: EvidenceType.PDF,
          description: "Roadmap slides",
        },
      ],
    },
    {
      title: "Introduced Mentorship Program",
      description:
        "Proposed and launched a mentorship program at Delta Analytics, improving retention by 15%.",
      achievedAt: new Date("2018-11-05"),
      impact: ImpactLevel.HIGH,
      isPrivate: false,
      userId: user.id,
      companyId: delta?.id,
      tags: [mentorship.id, innovation.id],
      evidences: [],
    },
  ];

  // Create achievements and related records
  const achievements = [];
  for (const ach of achievementsData) {
    // Assign a goal if available for the achievement's company
    if (!ach.companyId) throw new Error("Achievement missing companyId");
    let goalId: string | undefined = undefined;
    const goalList = goalsByCompany[ach.companyId];
    if (!goalList) {
      throw new Error(`No goals found for companyId ${ach.companyId}`);
    }
    if (goalList.length > 0) {
      const assignToGoal = Math.random() > 0.5;
      if (assignToGoal) {
        goalId = goalList[Math.floor(Math.random() * goalList.length)]?.id;
      }
    }
    const created = await prisma.achievement.create({
      data: {
        title: ach.title,
        description: ach.description,
        achievedAt: ach.achievedAt,
        impact: ach.impact,
        isPrivate: ach.isPrivate,
        userId: ach.userId,
        companyId: ach.companyId,
        goalId,
        tags: {
          create: ach.tags.map((tagId: string) => ({
            tag: { connect: { id: tagId } },
          })),
        },
        evidences: {
          create: ach.evidences,
        },
      },
      include: { tags: true, evidences: true },
    });
    achievements.push(created);
  }

  console.log({
    user,
    companies: [acme, beta, gamma, delta],
    tags: Object.values(tagIds),
    achievements,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
