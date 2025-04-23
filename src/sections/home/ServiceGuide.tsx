import Accordion from "@/components/Accordion";

export default function ServiceGuide() {
  const guideItems = [
    {
      title: "Adoração",
      content:
        "Inicie o encontro com um momento de **adoração** que conecte o grupo à presença de Deus. Escolha uma música que reflita a mensagem do dia e inspire os corações a se renderem em louvor. Este é um momento para alinhar o espírito do grupo com o propósito do encontro, permitindo que a música e a oração criem um ambiente de reverência e intimidade com Deus. Use o campo **'Observações'** para sugerir músicas específicas ou compartilhar a inspiração por trás da escolha.",
    },
    {
      title: "Oração inicial",
      content:
        "Abra o encontro com uma oração que exalte a **bondade** e **fidelidade** de Deus. Expresse gratidão pelas bênçãos recebidas e peça pela direção do **Espírito Santo** durante o encontro. Este é o momento de entregar o controle a Deus, pedindo que Ele fale aos corações e conduza cada parte do encontro de acordo com **Sua vontade**.",
    },
    {
      title: "Momento relax",
      content:
        "Crie um espaço descontraído para fortalecer os laços entre os membros do grupo. Este momento pode incluir **dinâmicas interativas**, **jogos rápidos** ou **reflexões leves** que promovam a união e a alegria. O objetivo é criar um ambiente acolhedor onde todos se sintam à vontade para participar e compartilhar.",
    },
    {
      title: "Palavra",
      content:
        "A **'Palavra'** é o momento central do encontro, onde a mensagem de Deus é compartilhada com o grupo. Este é um tempo de **reflexão** e **aprendizado**, onde insights e revelações são trazidos à luz para edificar a fé e fortalecer a caminhada cristã. Estimule os membros do grupo a participarem ativamente, compartilhando suas próprias percepções e experiências relacionadas à mensagem. É importante lembrar que apenas membros deste **'life group'** que já entregaram suas vidas a Jesus podem conduzir este momento, garantindo que a Palavra seja ministrada com **responsabilidade espiritual** e alinhada aos **princípios bíblicos**.",
    },
    {
      title: "Oração da Casinha",
      content:
        "Interceda pelas pessoas e causas representadas na **'casinha'**, um símbolo de fé e entrega. Ore com fervor, acreditando que Deus está ouvindo e agindo em cada situação. Este é um momento de **unidade**, onde o grupo se junta em oração para apoiar uns aos outros e confiar nas **promessas de Deus**.",
    },
    {
      title: "Oração da oferta",
      content:
        "Conduza uma oração de **gratidão** pela oportunidade de ofertar. Reconheça que tudo o que temos vem de Deus e peça que Ele abençoe e multiplique as ofertas para que cumpram os **propósitos do Reino**. Este é um momento de **generosidade** e reconhecimento da **soberania de Deus** sobre nossas vidas.",
    },
    {
      title: "Oração final",
      content:
        "Encerre o encontro com uma oração de **agradecimento**. Louve a Deus pelas **revelações recebidas**, pela **comunhão do grupo** e pela oportunidade de estar em **Sua presença**. Peça por **proteção** e **direção** para os dias seguintes, encerrando o encontro com um espírito de **gratidão** e **esperança**.",
    },
    {
      title: "Koinonia (Lanche)",
      content: [
        "No contexto do nosso grupo, a **'Koinonia'** é representada pelo momento do lanche, onde criamos um ambiente acolhedor e descontraído para fortalecer os laços entre os membros. Este é um momento para compartilhar não apenas alimentos, mas também histórias, risadas e experiências, promovendo a comunhão e a alegria em Cristo. Você pode contribuir trazendo algo especial, como um prato caseiro ou uma sobremesa favorita, que reflita seu carinho e dedicação. O grupo Gênesis sempre oferece um lanche básico, mas sua contribuição é bem-vinda para enriquecer esse momento. Para coordenar as quantidades e o cardápio, entre em contato com a [**Lenice**](https://wa.me/558591549990) ou a [**Julia**](https://wa.me/558592709273), garantindo que todos possam desfrutar desse tempo de comunhão e celebração.",
        "A palavra **'Koinonia'** tem origem no grego antigo (_κοινωνία_) e é amplamente usada no Novo Testamento para descrever a comunhão espiritual entre os cristãos. Ela carrega o significado de **participação**, **parceria**, **compartilhamento** e **unidade**. Historicamente, 'Koinonia' era usada para expressar a profunda conexão entre os membros da igreja primitiva, que compartilhavam não apenas bens materiais, mas também suas vidas, orações e fé. Essa palavra reflete a essência da vida cristã em comunidade, onde cada indivíduo contribui para o bem-estar do grupo, promovendo um ambiente de amor, apoio mútuo e crescimento espiritual. A 'Koinonia' é mencionada em passagens como _Atos 2:42_, onde os primeiros cristãos se dedicavam ao ensino dos apóstolos, à comunhão, ao partir do pão e às orações, exemplificando a importância dessa prática na vida cristã.",
      ],
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
