// Equipment.tsx
import InfoCard from "../../../Blocks/InfoCard";
import ImageWithText from "../../../Blocks/ImageWithText";

interface EquipmentProps {
  cardLearnMoreButton?: boolean;
  type?: "cards" | "list";
}

interface EquipmentData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const OurEquipment: React.FC<EquipmentProps> = ({
  cardLearnMoreButton = false,
  type = "cards",
}) => {
  const data: EquipmentData[] = [
    {
      title: "Single stalls",
      description:
        "Ideal for transporting a single or multiple horses. These straight-load stalls offer a focused and stress-free environment. Perfect for owners who need to transport their horses individually, ensuring maximum comfort and attention to each horse’s specific needs. Water buckets and hay nets provided for each horse.",
      imageSrc: "/assets/img/single-straight-load-stalls.jpg",
      imageAlt: "Single straight-load stall",
      link: "/our-equipment",
    },
    {
      title: "Stalls and a half with full dividers",
      description:
        "For those who have horses that need a bit more space, stalls and a half with full dividers provide extra room and privacy. This option is excellent for horses that may be nervous around others or need a bit more space to feel comfortable during transport.",
      imageSrc: "/assets/img/stalls-and-half-dividers.jpg",
      imageAlt: "Stalls and a half with full dividers",
      link: "/our-equipment",
    },
    {
      title: "Box stalls",
      description:
        "Box stalls offer ample space for horses to move around freely during the journey. Available in various sizes, these stalls are perfect for long-distance travel, providing a roomy and relaxed environment that reduces stress and ensures the horse’s well-being.",
      imageSrc: "/assets/img/box-stall.jpg",
      imageAlt: "Box stall",
      link: "/our-equipment",
    },
    {
      title: "Slant stalls",
      description:
        "Slant stalls are a versatile option for transporting up to 6 horses, with the added benefit of full dividers for safety and comfort. This setup is great for horses that are comfortable traveling at an angle and need secure, spacious stalls that allow for easy loading and unloading.",
      imageSrc: "/assets/img/stalls-and-half-dividers.jpg",
      imageAlt: "Slant stalls",
      link: "/our-equipment",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-8">
        {type === "cards" ? (
          // Info Cards
          <div className="grid grid-cols-1 md:grid-cols-none md:grid-rows-2 md:grid-flow-col gap-4 w-full">
            {data.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                link={item.link}
                learnMore={cardLearnMoreButton}
              />
            ))}
          </div>
        ) : (
          // List
          <>
            {data.map((item, index) => (
              <div className="w-full max-w-6xl xl:max-w-7xl mx-auto" key={item.title}>
                <ImageWithText
                  imageUrl={item.imageSrc}
                  altText={item.imageAlt}
                  text={item.title}
                  description={item.description}
                  size="lg"
                  alternate={index % 2 !== 0}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OurEquipment;
