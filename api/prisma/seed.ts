import { faker } from "@faker-js/faker";
import { prisma } from "../configs/prisma.config";
import { Category, Role, TransactionStatus } from "../generated/prisma"; // pastikan ini sesuai path enums

async function seed() {
  try {
    console.info("🧹 Deleting existing data...");
    await prisma.paymentProof.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.voucher.deleteMany();
    await prisma.ticketType.deleteMany();
    await prisma.event.deleteMany();
    await prisma.point.deleteMany();
    await prisma.coupon.deleteMany();
    await prisma.review.deleteMany();
    await prisma.attend.deleteMany();
    await prisma.user.deleteMany();

    console.info("✅ Creating users and related data...");

    for (let i = 0; i < 10; i++) {
      const role = faker.helpers.arrayElement(Object.values(Role));

      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: "password123",
          role,
          refferal_code: faker.string.alphanumeric(8),
          profilePic: faker.image.avatar(),
          location: faker.location.city(),
        },
      });

      if (role === "ORGANIZER") {
        const event = await prisma.event.create({
          data: {
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            location: faker.location.city(),
            category: faker.helpers.arrayElement(Object.values(Category)),
            start_date: faker.date.future(),
            end_date: faker.date.future({ years: 1 }),
            is_paid: true,
            price: 50000,
            quota: 100,
            organizerId: user.id,
          },
        });

        await prisma.ticketType.createMany({
          data: [
            {
              name: "Regular",
              price: 50000,
              stock: 50,
              eventId: event.id,
            },
            {
              name: "VIP",
              price: 100000,
              stock: 20,
              eventId: event.id,
            },
          ],
        });

        await prisma.voucher.create({
          data: {
            code: faker.string.alphanumeric(6),
            discount: 10,
            quota: 10,
            start_date: new Date(),
            end_date: faker.date.future(),
            eventId: event.id,
          },
        });
      }

      if (role === "USER") {
        const event = await prisma.event.findFirst({
          orderBy: { id: "desc" },
        });

        const ticketType = await prisma.ticketType.findFirst({
          where: { eventId: event?.id },
        });

        if (event && ticketType) {
          const quantity = faker.number.int({ min: 1, max: 3 });
          const total = ticketType.price * quantity;
          const used_point = faker.number.int({ min: 0, max: 1000 });
          const final_price = Math.max(total - used_point, 0);

          const transaction = await prisma.transaction.create({
            data: {
              userId: user.id,
              eventId: event.id,
              ticketTypeId: ticketType.id,
              quantity,
              total_price: total,
              used_point,
              final_price,
              status: faker.helpers.arrayElement(
                Object.values(TransactionStatus)
              ),
            },
          });

          await prisma.paymentProof.create({
            data: {
              transactionId: transaction.id,
              image_url: faker.image.url(),
            },
          });

          await prisma.attend.create({
            data: {
              userId: user.id,
              eventId: event.id,
              transactionId: transaction.id, // Ambil dari transaksi yang sudah dibuat sebelumnya
              quantity: transaction.quantity, // Bisa ambil dari transaksi juga
              total_paid: transaction.final_price, // Bisa juga total_price kalau lebih cocok
            },
          });

          await prisma.review.create({
            data: {
              userId: user.id,
              eventId: event.id,
              rating: faker.number.int({ min: 1, max: 5 }),
              comment: faker.lorem.sentence(),
            },
          });
        }

        await prisma.point.create({
          data: {
            userId: user.id,
            amount: faker.number.int({ min: 0, max: 1000 }),
            expired_at: faker.date.future(),
          },
        });

        await prisma.coupon.create({
          data: {
            code: faker.string.alphanumeric(6),
            discount: 5,
            userId: user.id,
            expired_at: faker.date.future(),
          },
        });
      }
    }

    console.info("🎉 Seeding all data finished successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
