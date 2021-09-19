import React from 'react'

import { SearchAutocomplete } from '../../compositions/SearchField'
import { Item, Section } from '@react-stately/collections';
import { Label, Description } from '../../compositions/ListBox'

import { 
    sources, 
    mediums, 
    terms, 
    contents, 
    campaigns, 
    slugs 
} from './mocks'

type UrlParameterType = 'utm' | 'custom'
enum UrlParameterEnum {
    UTM = 'utm',
    CUSTOM = 'custom',
}; 
interface IUrlParameter {
    utm: { };
    custom: any;
}

type UtmCategoryType = []
const getUserData = () => {
   
    let utmParameters: Map<UtmCategoryType, string[]>() = new Map<UtmCategoryType, string[]>();

    utmCategories.map((utmCategory: string) => utmParameters.set(utmCategory, []))
    
    utmParameters.set('source', sources?.length ? [...sources] : [])
    utmParameters.set('medium', mediums?.length ? [...mediums] : []);
    utmParameters.set('term', terms?.length ? [...terms] : []);
    utmParameters.set('campaign', campaigns?.length ? [...campaigns] : []);
    utmParameters.set('content', contents?.length ? [...contents] : []);
        },
        custom: {} 
    }
    return urlParameters
}

const utmType = 'source' | 'medium' | 'term' | 'campaign' | 'content'

export const GlobalSearch = () => {
    const userUrlParameters: IUrlParameter = getUserData()
    const userUtms = userUrlParameters[UrlParameterEnum.UTM]
    const userCustomParameters = userUrlParameters[UrlParameterEnum.CUSTOM]
    const items = [userUtms, userCustomParameters]

    return (
        <SearchAutocomplete
            label='Search'
            placeholder='Looking for something?'
            allowsCustomValue
            // autoComplete='off'
            // type='search'
            // inputMode='text'
            
        >
            <Section title='Items'>
                {items.map((urlParameters: utmType, index: number) => (
                    <Item key={index} textValue={item}> 
                        <div>
                            <Label> {item} </Label>
                            <Description> description: {index} </Description>  
                        </div>
                    </Item>
                ))}
            </Section>
        </SearchAutocomplete>
    );
}