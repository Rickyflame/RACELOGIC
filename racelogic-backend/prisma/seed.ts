// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    // Create F1 sport
    const sport = await prisma.sport.create({
      data: { name: 'F1' },
    });
    
    // Create Mercedes team
    const team = await prisma.team.create({
      data: { 
        name: 'Mercedes', 
        sportId: sport.id 
      },
    });

    // Create Lewis Hamilton driver
    const driver = await prisma.driver.create({
      data: {
        name: 'Lewis Hamilton',
        country: 'United Kingdom',
        sportId: sport.id, // Fixed: using sportId instead of sportsId
      },
    });

    // Create Australian Grand Prix race
    const race = await prisma.race.create({
      data: {
        title: 'Australian Grand Prix', // Using 'title' as per your schema
        location: 'Melbourne',
        date: new Date('2023-03-19T00:00:00.000Z'),
        sportId: sport.id,
      },
    });

    // Create race result
    await prisma.result.create({
      data: {
        raceId: race.id,
        driverId: driver.id,
        teamId: team.id,
        position: 1,
        points: 25,
        fastestLap: true,
      },
    });

    // Create vehicle for the team
    await prisma.vehicle.create({
      data: {
        sportId: sport.id,
        teamId: team.id,
        engine: 'Mercedes-AMG F1 M14 E Performance',
        tyres: 'Pirelli',
        specs: 'Formula 1 2023 Technical Regulations',
      },
    });

    // Create live status for the race
    await prisma.liveStatus.create({
      data: {
        raceId: race.id,
        isLive: false,
      },
    });

    console.log('Seeding completed successfully.');
    console.log(`Created sport: ${sport.name}`);
    console.log(`Created team: ${team.name}`);
    console.log(`Created driver: ${driver.name}`);
    console.log(`Created race: ${race.title}`); // Fixed: using race.title instead of race.name
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

// Execute the main function
void main()
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });