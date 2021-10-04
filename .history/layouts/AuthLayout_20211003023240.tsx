import Image from 'next/image'
import { Flex } from '../primitives/Flex'
import authbg from '../public/images/authbg.png'
import { SteamGraph } from '../components/'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <Flex css={{ width: '100%', height: '100vh', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: 0}}>
            <div className="sidebar">
                {children}
            </div>
            <SteamGraph />
        </Flex>
    );
}