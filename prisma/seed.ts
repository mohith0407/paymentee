import { PrismaClient, SplitType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Users (using upsert so you can run this multiple times)
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Smith',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Jones',
    },
  });

  // 2. Create a Group created by Alice
  const group = await prisma.group.create({
    data: {
      name: 'Trip to Tokyo',
      description: 'Shared expenses for the 2026 trip',
      createdByUserId: user1.id,
      // Link both users to the group via the join table
      members: {
        create: [
          { userId: user1.id },
          { userId: user2.id },
        ],
      },
    },
  });

  // 3. Create an initial Expense
  await prisma.expense.create({
    data: {
      description: 'Sushi Dinner',
      amount: 100.0,
      date: new Date(),
      groupId: group.id,
      paidByUserId: user1.id,
      createdByUserId: user1.id,
      splitType: SplitType.EQUAL,
      splits: {
        create: [
          { userId: user1.id, amountOwed: 50.0 },
          { userId: user2.id, amountOwed: 50.0 },
        ],
      },
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });