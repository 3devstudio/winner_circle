import React from 'react';

type ImageWithTextProps = {
    imageUrl: string;
    altText: string;
    text: string;
    description?: string;
    isRound?: boolean;
};

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, altText, text, description, isRound = false }) => {
    return (
        <div className="flex flex-col md:flex-row p-4 md:p-8 items-center gap-4 md:gap-8">
            <div className='w-full flex justify-center'>
                <img
                    src={imageUrl}
                    alt={altText}
                    className={`h-[30rem] md:h-[40rem] max-w-full overflow-hidden ${isRound ? 'rounded-full' : ''}`}
                />
            </div>
            <div className='w-full flex flex-col gap-4 md:gap-8'>
                <p className="text-lg md:text-3xl lg:text-5xl font-semibold text-stone-800">{text}</p>
                {description && <p className="text-sm md:text-base text-gray-500 font-light">{description}</p>}
            </div>
        </div>
    );
};

export default ImageWithText;