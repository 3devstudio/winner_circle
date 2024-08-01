import InfoCard from "../../Blocks/InfoCard";

const Services = () => {
  return (
    <div className="bg-secondary/25 p-4 md:p-8">
      <div className="flex flex-wrap gap-8 justify-center w-full max-w-6xl mx-auto">
        <InfoCard
          title="Single straight-load stalls"
          description="Ideal for single horses that prefer traveling alone, these straight-load stalls offer a focused and stress-free environment. Perfect for owners who need to transport their horses individually, ensuring maximum comfort and attention to each horse’s specific needs."
          imageSrc="/assets/single-straight-load-stalls.jpg"
          imageAlt="Single straight-load stall"
          link="/our-services"
        />
        <InfoCard
          title="Stalls and a half with full dividers"
          description="For those who have horses that need a bit more space, stalls and a half with full dividers provide extra room and privacy. This option is excellent for horses that may be nervous around others or need a bit more space to feel comfortable during transport."
          imageSrc="/assets/stalls-and-half-dividers.jpg"
          imageAlt="Stalls and a half with full dividers"
          link="/our-services"
        />
        <InfoCard
          title="Box stalls"
          description="Box stalls offer ample space for horses to move around freely during the journey. Available in various sizes, these stalls are perfect for long-distance travel, providing a roomy and relaxed environment that reduces stress and ensures the horse’s well-being."
          imageSrc="/assets/box-stall.jpg"
          imageAlt="Box stall"
          link="/our-services"
        />
        <InfoCard
          title="Slant stalls"
          description="Slant stalls are a versatile option for transporting one or two horses, with the added benefit of full dividers for safety and comfort. This setup is great for horses that are comfortable traveling at an angle and need secure, spacious stalls that allow for easy loading and unloading."
          imageSrc="/assets/stalls-and-half-dividers.jpg"
          imageAlt="Slant stalls"
          link="/our-services"
        />
      </div>
    </div>
  );
};

export default Services;
