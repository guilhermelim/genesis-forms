import Image from "next/image";

export default function BannerSection() {
  return (
    <div className="w-full mb-8 rounded-xl overflow-hidden flex justify-center bg-gray-100">
      <div className="w-full relative" style={{ height: "auto" }}>
        <Image
          src="/genesis-banner.png"
          alt="Genesis Banner"
          width={1200} // Defina a largura real da sua imagem
          height={300} // Defina a altura real da sua imagem
          className="object-contain w-full h-auto"
          priority
          quality={90}
        />
      </div>
    </div>
  );
}
