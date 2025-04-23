"use client";
import Accordion from "@/components/Accordion";

export default function ServiceGuide() {
  const guideItems = [
    {
      title: "Adoração",
      content:
        "Escolha uma música que inspire o grupo a entrar em um momento profundo de adoração, oração e louvor a Deus. Deixe que a letra e a melodia elevem os corações e mentes em adoração sincera. (Você pode usar o campo 'Observações' para informar ao líder a música escolhida)",
    },
    {
      title: "Oração inicial",
      content:
        "Comece com uma oração destacando a gratidão por tudo o que Deus já fez e pedindo para que Ele fale de maneira especial a sua igreja durante este encontro.",
    },
    {
      title: "Momento relax",
      content:
        "Proporcione um momento para a integração e aprendizado do grupo, de forma descontraída. Pode incluir uma dinâmica, uma breve reflexão ou até uma atividade que promova a união dos membros.",
    },
    {
      title: "Palavra",
      content:
        "Compartilhe com o grupo a mensagem e insights que Deus trouxe ao seu coração. Estimule todos do life group a compartilharem suas próprias visões e percepções. Esta troca é uma oportunidade para revelações e ensinamentos valiosos que Deus entrega por meio de cada membro - Somente membros deste 'life group' que já tenham entregado suas vidas a Jesus podem facilitar a 'Palavra'.",
    },
    {
      title: "Oração da Casinha",
      content:
        "Dedique um momento para orar por todas as pessoas e suas causas cujos nomes foram colocados na casinha como um ato de fé. Interceda com fervor e confiança nas promessas de Deus.",
    },
    {
      title: "Oração da oferta",
      content:
        "Faça uma oração de agradecimento pela oportunidade de ofertar. Peça a Deus para abençoar e multiplicar essa oferta, cumprindo os propósitos a que se destina.",
    },
    {
      title: "Oração final",
      content:
        "Agradeça a Deus pelo dia, pela oportunidade de estar na presença dEle, pelas revelações recebidas e pela comunhão da igreja. Encerre com um espírito de gratidão e louvor.",
    },
    {
      title: "Koinonia (Lanche)",
      content:
        "Koinonia é uma palavra grega que significa 'comunhão'. No cristianismo, ela representa participação, companheirismo, comunicação e também compartilhamento, assim, é um ótimo momento para compartilhar seus talentos culinários: aquele bolo especial, os pães caseiros que encanta a toda família, etc. O grupo Gênesis sempre oferece um lanche, mas você pode trazer variações ou complementos. Para isso, após escolher seu nome e a opção Koinonia, envie uma mensagem particular para a Lenice ou a Julia, para coordenar as quantidades e cardápio.",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Como servir com excelência
      </h2>
      <Accordion items={guideItems} />
    </div>
  );
}
