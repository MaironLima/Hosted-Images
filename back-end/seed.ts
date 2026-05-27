/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { prisma } from './libs/prisma.js';
import { cloudinary } from './src/config/cloudinary.config.js';

async function main() {
  // Busque imagens do Cloudinary
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resources = await cloudinary.api.resources({ max_results: 20 });

  for (const img of resources.resources) {
    await prisma.image.upsert({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { id: img.public_id }, // ou publicId, se for unique
      update: {},
      create: {
        id: img.public_id,
        url: img.secure_url,
        name: img.original_filename || img.public_id,
        type: `${img.resource_type}/${img.format}`, // Ex: 'image/png' ou 'image/jpeg'
        size: img.bytes / (1024 * 1024), // tamanho em MB
      },
    });
    console.log('image uploaded successfully ✅​');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
