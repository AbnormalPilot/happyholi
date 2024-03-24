'use client'
import React, { useState } from 'react';
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

import a1 from '../../../public/holi.wav'

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default function Page({ params }: { params: { name: string } }) {
    const [inputValue, setInputValue] = useState(params.name);
    const [shareUrl, setShareUrl] = useState('');
    const [newmsg, newlink] = useState('');
    const handleConfetti = () => {
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.8 },
        });
    };
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
        const newShareUrl = `https://github.com/${event.target.value}`;
        const new_msg = `Wishing you and your family a Holi 😄 that’s as sweet as gujiyas 🥟, as bright as rangolis ✨, and as joyful😇 as laughter😁. Also ${event.target.value} have Surprise 🤫 for you!!! `;
        newlink(new_msg);
        setShareUrl(newShareUrl); // Update shareUrl dynamically
        
    };

    return (
        <div className=' overflow-hidden'>
            <ReactAudioPlayer
                src={a1}
                autoPlay
                loop
            />

            <div className='fixed bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2'>
                <Image src={pic} alt="Rangoli" height={400} width={600} />
            </div>
            <div className='fixed bottom-0 right-0'>
                <Image src={giff1} alt="Rangoli" height={100} width={200} />
            </div>


            <div className='flex h-screen justify-center  w-screen '>
                <div>
                    <span><Image src={giff} alt='gif1' height={400} width={600} /> </span>


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
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input type="name" id='new_name' placeholder={params.name} onChange={handleInputChange} className="col-span-3" />
                                    </div>

                                </div>
                                <DialogFooter>
                                    <WhatsappShareButton
                                        url={shareUrl}
                                        title={newmsg}
                                    >
                                        <WhatsappIcon size={50} round />
                                    </WhatsappShareButton>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>

    );
}
