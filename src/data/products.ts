import perfume1 from "@/assets/products/perfume-1.jpg";
import perfume2 from "@/assets/products/perfume-2.jpg";
import perfume3 from "@/assets/products/perfume-3.jpg";
import perfume4 from "@/assets/products/perfume-4.jpg";
import skincare1 from "@/assets/products/skincare-1.jpg";
import skincare2 from "@/assets/products/skincare-2.jpg";
import skincare3 from "@/assets/products/skincare-3.jpg";
import makeup1 from "@/assets/products/makeup-1.jpg";
import makeup2 from "@/assets/products/makeup-2.jpg";
import makeup3 from "@/assets/products/makeup-3.jpg";
import haircare1 from "@/assets/products/haircare-1.jpg";
import bodycare1 from "@/assets/products/bodycare-1.jpg";
import liphoneyMel from "@/assets/products/liphoney-mel.png";
import vitac10_1 from "@/assets/products/vitac10-1.png";
import vitac10_2 from "@/assets/products/vitac10-2.png";
import vitac10_3 from "@/assets/products/vitac10-3.png";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  benefits?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  discount?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eau de Parfum Lumière Dorée",
    brand: "Maison Fleur",
    price: 289.90,
    originalPrice: 389.90,
    image: perfume1,
    images: [perfume1, perfume1],
    category: "perfumes",
    rating: 4.8,
    reviews: 324,
    description: "Uma fragrância sofisticada com notas de jasmim, rosa e sândalo. Perfeita para mulheres que desejam deixar uma marca inesquecível por onde passam.",
    benefits: ["Longa duração (12h+)", "Notas florais e amadeiradas", "Frasco premium reutilizável"],
    isBestseller: true,
    discount: 26,
  },
  {
    id: "2",
    name: "Sérum Vitamina C Radiance",
    brand: "Derma Lux",
    price: 159.90,
    originalPrice: 199.90,
    image: skincare1,
    images: [skincare1],
    category: "skincare",
    rating: 4.9,
    reviews: 567,
    description: "Sérum concentrado com 20% de Vitamina C pura estabilizada. Reduz manchas, uniformiza o tom da pele e proporciona luminosidade intensa.",
    benefits: ["20% Vitamina C pura", "Reduz manchas em 4 semanas", "Textura leve e rápida absorção"],
    isBestseller: true,
    discount: 20,
  },
  {
    id: "3",
    name: "Batom Matte Velvet Rouge",
    brand: "Beauté Paris",
    price: 89.90,
    image: makeup1,
    images: [makeup1],
    category: "maquiagem",
    rating: 4.7,
    reviews: 213,
    description: "Batom de acabamento matte aveludado com cor intensa e duradoura. Fórmula enriquecida com óleos nutritivos que mantêm os lábios hidratados.",
    benefits: ["Cor intensa por 8 horas", "Acabamento matte aveludado", "Fórmula hidratante"],
    isNew: true,
  },
  {
    id: "4",
    name: "Paleta de Sombras Nude Glow",
    brand: "Beauté Paris",
    price: 199.90,
    originalPrice: 259.90,
    image: makeup2,
    images: [makeup2],
    category: "maquiagem",
    rating: 4.8,
    reviews: 445,
    description: "Paleta com 15 tons nudes e rosados, do matte ao cintilante. Pigmentação intensa, blendável e de longa duração.",
    benefits: ["15 cores versáteis", "Alta pigmentação", "Longa duração sem craseamento"],
    isBestseller: true,
    discount: 23,
  },
  {
    id: "5",
    name: "Perfume Noir Absolu",
    brand: "Maison Fleur",
    price: 349.90,
    image: perfume3,
    images: [perfume3],
    category: "perfumes",
    rating: 4.9,
    reviews: 189,
    description: "Fragrância masculina intensa com notas de couro, âmbar e vetiver. Uma assinatura olfativa marcante e sofisticada.",
    benefits: ["Fragrância unissex", "Duração de 14 horas", "Notas amadeiradas e especiadas"],
    isNew: true,
  },
  {
    id: "6",
    name: "Creme Hidratante Anti-Idade",
    brand: "Derma Lux",
    price: 219.90,
    originalPrice: 279.90,
    image: skincare2,
    images: [skincare2],
    category: "skincare",
    rating: 4.6,
    reviews: 334,
    description: "Creme facial anti-idade com ácido hialurônico e retinol encapsulado. Preenche rugas, firma e hidrata profundamente.",
    benefits: ["Ácido hialurônico triplo peso", "Retinol encapsulado", "Resultados em 2 semanas"],
    discount: 21,
  },
  {
    id: "7",
    name: "Kit Capilar Reparação Intensa",
    brand: "Hair Essence",
    price: 149.90,
    originalPrice: 189.90,
    image: haircare1,
    images: [haircare1],
    category: "cabelos",
    rating: 4.5,
    reviews: 278,
    description: "Kit com shampoo, condicionador e máscara para cabelos danificados. Fórmula com queratina e óleo de argan.",
    benefits: ["Reparação profunda", "Queratina hidrolisada", "Óleo de argan premium"],
    discount: 21,
  },
  {
    id: "8",
    name: "Protetor Solar Facial FPS 50",
    brand: "Derma Lux",
    price: 79.90,
    image: skincare3,
    images: [skincare3],
    category: "skincare",
    rating: 4.7,
    reviews: 623,
    description: "Protetor solar facial com textura ultraleve e acabamento invisível. Proteção UVA/UVB com ativos anti-envelhecimento.",
    benefits: ["Textura invisível", "Anti-envelhecimento", "Não obstrui poros"],
    isBestseller: true,
  },
  {
    id: "9",
    name: "Base Fluida Natural Finish",
    brand: "Beauté Paris",
    price: 129.90,
    image: makeup3,
    images: [makeup3],
    category: "maquiagem",
    rating: 4.6,
    reviews: 198,
    description: "Base fluida com cobertura média e acabamento natural. 24 horas de duração com ativos skincare que cuidam da pele.",
    benefits: ["Cobertura modulável", "24h de duração", "Ativos anti-envelhecimento"],
    isNew: true,
  },
  {
    id: "10",
    name: "Eau de Toilette Fleur Rosée",
    brand: "Maison Fleur",
    price: 199.90,
    originalPrice: 249.90,
    image: perfume4,
    images: [perfume4],
    category: "perfumes",
    rating: 4.8,
    reviews: 412,
    description: "Fragrância floral delicada com notas de peônia, lírio e musk. Ideal para o dia a dia sofisticado.",
    benefits: ["Notas florais frescas", "Ideal para o dia a dia", "Frasco artesanal"],
    discount: 20,
  },
  {
    id: "11",
    name: "Eau de Parfum Rosé Élégance",
    brand: "Maison Fleur",
    price: 259.90,
    image: perfume2,
    images: [perfume2],
    category: "perfumes",
    rating: 4.7,
    reviews: 156,
    description: "Perfume feminino com notas de rosa damascena, baunilha e almíscar. Uma fragrância romântica e envolvente.",
    benefits: ["Rosa damascena natural", "Notas de fundo envolventes", "Frasco colecionável"],
    isNew: true,
  },
  {
    id: "12",
    name: "Creme Corporal Hydra Gold",
    brand: "Derma Lux",
    price: 99.90,
    originalPrice: 139.90,
    image: bodycare1,
    images: [bodycare1],
    category: "corpo",
    rating: 4.5,
    reviews: 287,
    description: "Creme corporal ultra-hidratante com partículas de ouro e manteiga de karité. Deixa a pele macia, luminosa e perfumada.",
    benefits: ["Partículas de ouro", "48h de hidratação", "Fragrância sofisticada"],
    isNew: true,
  },
  {
    id: "13",
    name: "Gloss Labial Liphoney Mel Brilho Irresistível Franciny Ehlke Mel",
    brand: "Franciny Ehlke",
    price: 26.00,
    image: liphoneyMel,
    images: [liphoneyMel],
    category: "maquiagem",
    rating: 5.0,
    reviews: 12,
    description: "O Gloss Labial Liphoney Mel proporciona um brilho irresistível com uma textura confortável e hidratação profunda. Inspirado na doçura e brilho do mel, é o toque final perfeito para qualquer maquiagem.",
    benefits: ["Brilho intenso", "Hidratação prolongada", "Textura não pegajosa"],
    isNew: true,
  },
  {
    id: "14",
    name: "Sérum Facial VITAMINA C-10",
    brand: "Principia",
    price: 32.00,
    image: vitac10_1,
    images: [vitac10_1, vitac10_2, vitac10_3],
    category: "skincare",
    rating: 4.9,
    reviews: 84,
    description: "Sérum com 10% de Vitamina C e 0,5% de Ácido Ferúlico com alta eficácia contra linhas finas, textura irregular e hiperpigmentação. Proporciona luminosidade e rejuvenescimento para todos os tipos de pele.",
    benefits: ["10% Vitamina C Pura", "0,5% Ácido Ferúlico", "Combate hiperpigmentação e linhas finas"],
    isNew: true,
  },
];

export const categories = [
  { id: "perfumes", name: "Perfumes", count: 156 },
  { id: "skincare", name: "Skincare", count: 234 },
  { id: "maquiagem", name: "Maquiagem", count: 189 },
  { id: "cabelos", name: "Cabelos", count: 145 },
  { id: "corpo", name: "Corpo & Banho", count: 98 },
];

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getBestsellers = () => products.filter((p) => p.isBestseller);
export const getNewProducts = () => products.filter((p) => p.isNew);
export const getDiscountedProducts = () => products.filter((p) => p.discount);
export const getProductById = (id: string) => products.find((p) => p.id === id);
