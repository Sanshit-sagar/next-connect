import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

import { getViewsForSlug } from '../../../lib/redis/slugs'
import { getViewsForUser } from '../../../lib/redis/users'
import { reject } from 'bluebird'

function getUserDetails(user: any) {
    return {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        image: user.imageUrl,
        lastUpdatedAt: user.lastUpdatedAt,
        accounts: [],
    }; 
}

const isSlugVisited = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        const views: number = await getViewsForSlug(slug)

        if(views > 0) {
            resolve(`${views} Views`)
        } else {
            reject('0 Views')
        }
    });
}

const isSlugOwnedByUser = async (slug: string, email: string) => {
    return new Promise(async (resolve, reject) => {
        const userSlugs: string[] = await getViewsForUser(email)

        let matchedChild = !userSlugs?.length ? [] : userSlugs.find(uSlug => uSlug.substring(1)===slug)

        if(matchedChild) {
            resolve(matchedChild)
        } else {
            reject(new Error(`invalid slug, user is not the owner`))
        }
    }); 
}

export default getHandler()
    .get('/api/info/slug/:slug', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let user = await users.getUser(req.session.userId)
        // let { email } = getUserDetails(user)
        let email = 'sanshit.sagar@gmail.com'
    
        let slug = req.params.slug
        
        if(slug?.length) {
            let promise = await isSlugVisited(slug)
            .then((response) => {
                res.status(200).json({ response })
            }).catch((error) => {
                res.status(500).json({ error: error.message }) 
            })
        } else {
            res.status(403).json({ error: 'missing_slug_parameter' })
        }
        
    })
    .get('/api/info/difference/:c', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = 'sanshit.sagar@gmail.com'
    
        let slug1 = req.params.slug
        
        if(slug1?.length) {
            const { views, minTimestamp, maxTimestamp } = await getDoubleEndedClickstream(0, -1, slug, 'slug', true);
    })