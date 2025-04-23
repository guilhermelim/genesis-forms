// scripts/seed.ts
import { Member } from "../models/Member";
import { Service } from "../models/Service";
import { Registration } from "../models/Registration";
import database from "../lib/database";

async function seedDatabase() {
  try {
    await database.connect();

    // Limpa as coleções
    await Member.deleteMany({});
    await Service.deleteMany({});
    await Registration.deleteMany({});
    console.log("Collections cleared!");

    // Adiciona membros iniciais
    const members = await Member.insertMany([
      { name: "Adolfo Lima" },
      { name: "Alice Lima" },
      { name: "Alessandro Nogueira" },
      { name: "Aparecida Bezerra" },
      { name: "Caio Farias" },
      { name: "Elias Francisco da ..." },
      { name: "Elisa Emily Freire ..." },
      { name: "Evanildo Carvalho" },
      { name: "Guilherne Lima" },
      { name: "Iudy Fernandes Souz..." },
      { name: "Iury Fernandes Souz..." },
      { name: "Izabelly Lima" },
      { name: "Júlia Lima" },
      { name: "José Machado Neto" },
      { name: "Josias Junior" },
      { name: "Kalebe Ramalho Lima" },
      { name: "Lenice Lima" },
      { name: "Lucas Corteletti" },
      { name: "Mara Lúcia Ribeiro" },
      { name: "Marcelo de Oliveira..." },
      { name: "Nagelia Oliveira" },
      { name: "Nayane Machado frei..." },
      { name: "Noelma Fernandes So..." },
      { name: "Paulo Ramalho Lima" },
      { name: "Philipe Lima" },
      { name: "Raquel Paixão" },
      { name: "Rose Ramalho Lima" },
      { name: "Rodrigo Ribeiro Cor..." },
      { name: "Sofia Ramalho Lima" },
    ]);

    // Adiciona serviços iniciais
    const services = await Service.insertMany([
      { name: "7:30h - Adoração" },
      { name: "7:35h - Oração Inicial" },
      { name: "7:36h - Momento relax" },
      { name: "7:46h - Palavra" },
      { name: "8:25h - Oração da casinha" },
      { name: "8:28h - Oração da oferta" },
      { name: "8:29h - Oração final" },
      { name: "8:30h - Koinonia (Lanche 1)" },
      { name: "8:30h - Koinonia (Lanche 2)" },
    ]);

    console.log("Database seeded successfully!");
    console.log("Members:", members);
    console.log("Services:", services);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await database.close();
    process.exit(0);
  }
}

seedDatabase();
