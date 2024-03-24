'use client'
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { WhatsappShareButton, WhatsappIcon, } from 'next-share';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pic from '../../../public/rangoli.png';

import giff2 from '../../../public/go5.gif';
import giff1 from '../../../public/go3.gif';
import giff from '../../../public/go4.gif';


import ReactAudioPlayer from 'react-audio-player';

import a1 from '../../../public/holi.mp3'

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default function Page({ params }: { params: { name: string } }) {
    const [inputValue, setInputValue] = useState(params.name);
    const [shareUrl, setShareUrl] = useState('');
    const [newmsg, newlink] = useState('');
    const [isDesktop, setIsDesktop] = useState(true); // Assume desktop initially
    const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = window.navigator.userAgent;
            setIsDesktop(!/(android|iphone|ipad)/i.test(userAgent)); // Detect mobile devices
        };

        checkDeviceType();
        window.addEventListener('resize', checkDeviceType); // Recheck on resize

        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);


    const handleConfetti = () => {
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.8 },
        });
        setShouldPlayAudio(true);
    };
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
        const newShareUrl = `https://happyholi.vercel.app/${event.target.value}`;
        const new_msg = `Wishing you and your family a Holi 😄 that’s as sweet as gujiyas 🥟, as bright as Gulal ✨, and as joyful😇 as laughter😁. Also ${event.target.value} have Surprise 🤫 for you!!! `;
        newlink(new_msg);
        setShareUrl(newShareUrl); // Update shareUrl dynamically

    };


    return (
        <div className=' overflow-hidden bg-red-400'>


            <div className='fixed bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2'>
                <Image src={pic} alt="Rangoli" height={400} width={600} />
            </div>
            <div className='fixed bottom-0 right-0'>
                <Image src={giff1} alt="Rangoli" height={100} width={200} />
            </div>


            <div className='flex h-screen justify-center  w-screen '>
                <div>
                    <span><Image src={giff} alt='gif1' height={300} width={500} /> </span>


                    <span className='flex items-center justify-center text-4xl font-bold text-black'>  {/* Removed gradient and set text color to black */}
                        FROM {params.name.charAt(0).toUpperCase() + params.name.slice(1)} {/* Capitalize first letter */}
                    </span>
                    <div className='flex justify-center p-4'>
                        <Image src={giff2} alt="Rangoli" height={100} width={200} />
                    </div>
                </div>
                <div className="fixed bottom-20">
                    <Button variant={'destructive'} onClick={handleConfetti} className='px-8' >
                        Press me

                    </Button>
                    {shouldPlayAudio && (
                        <ReactAudioPlayer
                            src={a1}
                            autoPlay // Enable autoplay only on desktop
                            loop
                        />
                    )}

                    <div className='relative p-6'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='p2 bg-indigo-600' >Share</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Share</DialogTitle>
                                    <DialogDescription>
                                        Your Name please :D
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-2">
                                        <Label htmlFor="name" className="text-left">
                                            Name
                                        </Label>
                                        <Input type="name" id='new_name' placeholder={params.name} onChange={handleInputChange} className="col-span-2" />
                                        <div className='p-3'>
                                            <WhatsappShareButton
                                                url={shareUrl}
                                                title={newmsg}
                                            >
                                                <WhatsappIcon size={39} round />
                                            </WhatsappShareButton>
                                        </div>
                                    </div>

                                </div>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>

    );
}
