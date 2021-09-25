
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { requireSession } from "@clerk/nextjs/api";

export interface NextApiRequestExtended extends NextApiRequest {
    filter: string | string[];
    value: string | string[] | null;
    params: any;
    email: string | string[];
    name: string | string[];
    image: string | string[]; 
    slug: string | string[]; 
}

export default function getHandler() {
    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(500).json({ error: `Encountered an unknown error. ${error.message}`}); 
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} not allowed on the path`}); 
        },
        attachParams: true,
    }).use((req, res, next) => {
        
            // TODO: call await getSession() here
            req.uid = req.session.userId
            req.email = 
            req.name = '';
            req.image = ''; 

            // TODO if(!session) { next(); } -> ?? throw a 403?

            req.email = req.query.email || ''
            req.name = req.query.name || ''
            req.slug = req.query.slug || ''
            
            next(); 
    }); 
}
