import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Joker() {


    return (
        <div className='flex h-screen w-screen justify-center items-center bg-gray-100'>

            <Button asChild>
                <Link href="/himanshu"> Go to Page</Link>
            </Button>

        </div>
    );
}
