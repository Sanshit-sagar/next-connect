import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'



function SuggestRandomSlug(saltLen?: number, numStrings?: number, manly: boolean = false) {

    if(!saltLen && !numString) return manly ? namor.generate({ subset: 'manly' }) : namor.generate();

}


