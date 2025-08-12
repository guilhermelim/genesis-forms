// scripts/seed.ts
import { Member } from "../models/Member";
import { Service } from "../models/Service";
import { Registration } from "../models/Registration";
import { User } from "../auth/model/User"; // Importa o modelo de usuário
import bcrypt from "bcrypt"; // Para hash de senhas
import database from "../lib/database";

async function clearCollections() {
  await Promise.all([
    Member.deleteMany({}),
    Service.deleteMany({}),
    Registration.deleteMany({}),
    User.deleteMany({}), // Limpa a coleção de usuários
  ]);
  console.log("Collections cleared!");
}

async function seedMembers() {
  const membersData = [
    { name: "Adolfo Lima" },
    { name: "Alessandro Nogueira" },
    { name: "Alice Lima" },
    { name: "Aparecida Bezerra" },
    { name: "Caio Farias" },
    { name: "Elias Francisco da ..." },
    { name: "Elisa Emily Freire ..." },
    { name: "Evanildo Carvalho" },
    { name: "Iudy Fernandes Souz..." },
    { name: "Iury Fernandes Souz..." },
    { name: "José Machado Neto" },
    { name: "Josias Junior" },
    { name: "Júlia Lima" },
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
    { name: "Rodrigo Ribeiro Cor..." },
    { name: "Rose Ramalho Lima" },
    { name: "Sofia Ramalho Lima" },
    { name: "Denise Moreira Bezerra" },
    { name: "Luis Fernando de Souza" },
  ];
  const members = await Member.insertMany(membersData);
  console.log("Members seeded:", members);
  return members;
}

async function seedServices() {
  const servicesData = [
    { name: "7:30h - Adoração" },
    { name: "7:35h - Oração Inicial" },
    { name: "7:36h - Momento relax" },
    { name: "7:46h - Palavra" },
    { name: "8:25h - Oração da casinha" },
    { name: "8:28h - Oração da oferta" },
    { name: "8:29h - Oração final" },
    { name: "8:30h - Koinonia (Lanche 1)" },
    { name: "8:30h - Koinonia (Lanche 2)" },
  ];
  const services = await Service.insertMany(servicesData);
  console.log("Services seeded:", services);
  return services;
}

async function seedUsers() {
  const usersData = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10), // Hash da senha
      role: "admin",
    },
    {
      name: "Regular User",
      email: "user@example.com",
      password: await bcrypt.hash("user123", 10), // Hash da senha
      role: "user",
    },
  ];
  const users = await User.insertMany(usersData);
  console.log("Users seeded:", users);
  return users;
}

async function seedDatabase() {
  try {
    await database.connect();
    await clearCollections();

    await seedMembers();
    await seedServices();
    await seedUsers(); // Adiciona a seed de usuários

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await database.close();
    process.exit(0);
  }
}

seedDatabase();
