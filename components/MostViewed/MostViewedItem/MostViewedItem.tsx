import Link from "next/link";
import Image from "next/image";

interface MostViewedItemData {
  id: string;
  title: string;
  image: string;
  href: string;
}

interface MostViewedItemProps {
  item: MostViewedItemData;
}

export default function MostViewedItem({ item }: MostViewedItemProps) {
  return (
    <Link href={item.href}>
      <div className="w-[304px] h-[80px] flex items-center gap-4 border-b border-b-darkGray pb-4">
        {/* Texto */}
        <div className="w-[216px] h-[60px] flex flex-col justify-center">
          <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white">
            {item.title}
          </h3>
        </div>
        {/* Imagen */}
        <div className="w-[80px] h-[80px] flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </Link>
  );
}

