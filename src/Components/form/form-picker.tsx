'use client';

import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '../../util/utils';
import { unsplash } from '../../util/unsplash';
import { defaultImages } from '../../util/images';
import { Link } from 'react-router-dom';

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
    setSelectedImage: (image: string) => void;
}

export const FormPicker = ({
    id,
    errors,
    setSelectedImage,
}: FormPickerProps) => {
    const [images, setImages] =
        useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                });

                if (result && result.response) {
                    const newImages = result.response as Array<
                        Record<string, any>
                    >;
                    setImages(newImages);
                } else {
                    console.error('Failed to get images from Unsplash');
                }
            } catch (error) {
                console.log(error);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (isLoading) {
        return (
            <div className='p-6 flex items-center justify-center'>
                <Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
            </div>
        );
    }

    return (
        <div className='relative'>
            <div className='grid grid-cols-3 gap-2 mb-2'>
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            'w-[100%] h-full cursor-pointer relative aspect-square group hover:opacity-75 transition bg-muted '
                            // pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            setSelectedImage(image.urls.full);
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type='radio'
                            id={id}
                            name={id}
                            className='hidden'
                            checked={selectedImageId === image.id}
                            onChange={() => {}}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />

                        <img
                            src={image.urls.thumb}
                            alt='Unsplash image'
                            className='w-full h-full object-cover rounded-sm'
                        />
                        {selectedImageId === image.id && (
                            <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                                <Check className='h-4 w-4 text-white' />
                            </div>
                        )}
                        <Link
                            to={image.links.html}
                            target='_blank'
                            className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/20 font-sans'
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
