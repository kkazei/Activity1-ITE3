const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Create an Account with a Profile
    const newAccount = await prisma.account.create({
      data: {
        email: '202211240@gordoncollege.edu.ph',
        username: 'jirro',
        password: 'hellopassword',
        profile: {
          create: {
            lastname: 'Guiao',
            middlename: 'P.',
            firstname: 'Jirro Aeron',
            suffix: 'N/A',
            bio: 'Web Developer',
            picture: 'image.jpg'
          }
        }
      },
      include: {
        profile: true
      }
    });
    
    console.log('Account & Profile Created:');
    console.log(JSON.stringify(newAccount, null, 2));

    // Add Modules to an Existing Account
    const addedModule = await prisma.module.create({
      data: {
        accountCode: newAccount.id, // Ensure correct relation
        moduleCode: '001',
        moduleDetails: 'Introduction to Prisma',
        moduleDesc: 'Introduction to Prisma ORM'
      }
    });
    
    console.log('Module Added:');
    console.log(JSON.stringify(addedModule, null, 2));

    // Add another module for demonstration
    const addedModule2 = await prisma.module.create({
      data: {
        accountCode: newAccount.id,
        moduleCode: '002',
        moduleDetails: 'Advanced Prisma',
        moduleDesc: 'Advanced Prisma ORM'
      }
    });
    
    console.log('Second Module Added:');
    console.log(JSON.stringify(addedModule2, null, 2));

    // Fetch All Accounts with Profiles and Modules
    const accounts = await prisma.account.findMany({
      include: {
        profile: true,
        modules: true
      }
    });
    
    console.log('All Accounts with Profiles & Modules:');
    console.log(JSON.stringify(accounts, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();